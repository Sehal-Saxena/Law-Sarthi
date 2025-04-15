import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing Supabase environment variables");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function uploadImage(
  file: File,
  userId: string
): Promise<string | null> {
  try {
    const fileExt = file.name.split(".").pop();
    const fileName = `${userId}/${Date.now()}.${fileExt}`;
    const { data, error } = await supabase.storage
      .from("report-images")
      .upload(fileName, file);

    if (error) throw error;

    const {
      data: { publicUrl },
    } = supabase.storage.from("report-images").getPublicUrl(fileName);

    return publicUrl;
  } catch (error) {
    console.error("Error uploading image:", error);
    return null;
  }
}

export interface Report {
  id: string;
  category: string;
  description: string;
  location: string;
  date: string;
  status: string;
  upvotes: number;
  image_url?: string;
  created_at: string;
  user_id: string | null;
}

export interface Comment {
  id: string;
  report_id: string;
  content: string;
  created_at: string;
  user_id: string;
}

export interface Like {
  report_id: string;
  user_id: string;
  created_at: string;
}

export async function createReport(
  reportData: Omit<Report, "id" | "created_at" | "upvotes" | "status">,
  image?: File
): Promise<Report | null> {
  try {
    let imageUrl = null;
    if (image) {
      const randomId = Math.random().toString(36).substring(7);
      imageUrl = await uploadImage(image, randomId);
    }

    const { data, error } = await supabase
      .from("reports")
      .insert([
        {
          category: reportData.category,
          description: reportData.description,
          location: reportData.location,
          date: reportData.date,
          image_url: imageUrl,
          status: "Under Review",
          upvotes: 0,
          user_id: null, // Always create anonymous reports
        },
      ])
      .select()
      .single();

    if (error) {
      console.error("Error creating report:", error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error("Error creating report:", error);
    return null;
  }
}

export async function getReports(): Promise<Report[]> {
  try {
    const { data: reports, error: reportsError } = await supabase
      .from("reports")
      .select("*")
      .order("created_at", { ascending: false });

    if (reportsError) {
      console.error("Error fetching reports:", reportsError);
      throw reportsError;
    }

    if (!reports || reports.length === 0) return [];

    // Get all likes and comments in parallel
    const [likesResult, commentsResult] = await Promise.all([
      supabase.from("likes").select("*"),
      supabase.from("comments").select("*"),
    ]);

    if (likesResult.error) throw likesResult.error;
    if (commentsResult.error) throw commentsResult.error;

    const likes = likesResult.data || [];
    const comments = commentsResult.data || [];
    const currentUserId = localStorage.getItem("userId");

    // Process reports with likes and comments
    const processedReports = reports.map((report) => {
      const reportLikes = likes.filter((l) => l.report_id === report.id);
      const reportComments = comments.filter((c) => c.report_id === report.id);

      return {
        ...report,
        upvotes: reportLikes.length,
        comments: reportComments.length,
        hasUserLiked: currentUserId
          ? reportLikes.some((like) => like.user_id === currentUserId)
          : false,
        commentsList: reportComments.map((c) => c.content),
      };
    });

    return processedReports;
  } catch (error) {
    console.error("Error in getReports:", error);
    return [];
  }
}

export async function getReportComments(reportId: string): Promise<Comment[]> {
  try {
    const { data, error } = await supabase
      .from("comments")
      .select("*")
      .eq("report_id", reportId)
      .order("created_at", { ascending: true });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error("Error fetching comments:", error);
    return [];
  }
}

export async function toggleLike(
  reportId: string,
  userId: string
): Promise<boolean> {
  try {
    // Check if the like already exists
    const { data: existingLike, error: checkError } = await supabase
      .from("likes")
      .select("*")
      .eq("report_id", reportId)
      .eq("user_id", userId)
      .single();

    if (checkError && checkError.code !== "PGRST116") {
      console.error("Error checking like:", checkError);
      throw checkError;
    }

    if (existingLike) {
      // Delete the like if it exists
      const { error: deleteError } = await supabase
        .from("likes")
        .delete()
        .eq("report_id", reportId)
        .eq("user_id", userId);

      if (deleteError) {
        console.error("Error deleting like:", deleteError);
        throw deleteError;
      }
    } else {
      // Add the like if it doesn't exist
      const { error: insertError } = await supabase
        .from("likes")
        .insert([{ report_id: reportId, user_id: userId }]);

      if (insertError) {
        console.error("Error inserting like:", insertError);
        throw insertError;
      }
    }

    return true;
  } catch (error) {
    console.error("Error toggling like:", error);
    return false;
  }
}

export async function addComment(
  reportId: string,
  content: string,
  userId: string
): Promise<Comment | null> {
  try {
    const { data, error } = await supabase
      .from("comments")
      .insert([
        {
          report_id: reportId,
          content: content.trim(),
          user_id: userId,
        },
      ])
      .select()
      .single();

    if (error) {
      console.error("Error adding comment:", error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error("Error adding comment:", error);
    return null;
  }
}

export async function getUserLikes(userId: string): Promise<string[]> {
  try {
    const { data, error } = await supabase
      .from("likes")
      .select("report_id")
      .eq("user_id", userId);

    if (error) throw error;
    return (data || []).map((like) => like.report_id);
  } catch (error) {
    console.error("Error fetching user likes:", error);
    return [];
  }
}
