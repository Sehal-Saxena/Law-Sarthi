import React, { useState } from "react";
import {
  ThumbsUp,
  MessageSquare,
  AlertTriangle,
  Share2,
  MapPin,
} from "lucide-react";
import { Report, Comment, toggleLike, addComment } from "../lib/supabase";

interface ReportWithUI extends Report {
  hasUserLiked?: boolean;
  commentsList: string[];
  comments: number;
}

interface ReportFeedProps {
  reports: ReportWithUI[];
  setReports: React.Dispatch<React.SetStateAction<ReportWithUI[]>>;
  userId: string;
}

const ReportFeed: React.FC<ReportFeedProps> = ({
  reports,
  setReports,
  userId,
}) => {
  const [commentInputs, setCommentInputs] = useState<{ [key: string]: string }>(
    {}
  );
  const [showComments, setShowComments] = useState<{ [key: string]: boolean }>(
    {}
  );

  const handleLike = async (reportId: string) => {
    const success = await toggleLike(reportId, userId);
    if (success) {
      setReports((prevReports) =>
        prevReports.map((report) => {
          if (report.id === reportId) {
            const newLikeStatus = !report.hasUserLiked;
            return {
              ...report,
              hasUserLiked: newLikeStatus,
              upvotes: newLikeStatus ? report.upvotes + 1 : report.upvotes - 1,
            };
          }
          return report;
        })
      );
    }
  };

  const handleComment = async (reportId: string) => {
    const content = commentInputs[reportId];
    if (!content?.trim()) return;

    const comment = await addComment(reportId, content, userId);
    if (comment) {
      setReports((prevReports) =>
        prevReports.map((report) => {
          if (report.id === reportId) {
            return {
              ...report,
              comments: report.comments + 1,
              commentsList: [...report.commentsList, content],
            };
          }
          return report;
        })
      );
      setCommentInputs((prev) => ({ ...prev, [reportId]: "" }));
    }
  };

  const toggleComments = (reportId: string) => {
    setShowComments((prev) => ({
      ...prev,
      [reportId]: !prev[reportId],
    }));
  };

  return (
    <div className="space-y-6">
      {reports.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">
            No reports yet. Be the first to report an incident!
          </p>
        </div>
      ) : (
        reports.map((report) => (
          <div
            key={report.id}
            className="bg-white rounded-lg shadow-md p-6 border-t-4 border-[#FF9933]"
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-semibold text-[#138808]">
                  {report.category}
                </h3>
                <p className="mt-2 text-gray-600">{report.description}</p>
                <div className="mt-4 flex items-center text-sm text-gray-500">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span>{report.location}</span>
                  <span className="mx-2">•</span>
                  <span>{new Date(report.date).toLocaleDateString()}</span>
                </div>
              </div>
              {report.image_url && (
                <img
                  src={report.image_url}
                  alt="Report evidence"
                  className="w-24 h-24 object-cover rounded-md"
                />
              )}
            </div>

            <div className="mt-4 flex items-center space-x-4">
              <button
                onClick={() => handleLike(report.id)}
                className={`flex items-center space-x-1 px-3 py-1 rounded-md ${
                  report.hasUserLiked
                    ? "bg-[#FF9933] text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                <ThumbsUp className="w-4 h-4" />
                <span>{report.upvotes}</span>
              </button>

              <button
                onClick={() => toggleComments(report.id)}
                className="flex items-center space-x-1 px-3 py-1 rounded-md bg-gray-100 text-gray-600 hover:bg-gray-200"
              >
                <MessageSquare className="w-4 h-4" />
                <span>{report.comments}</span>
              </button>

              <button className="flex items-center space-x-1 px-3 py-1 rounded-md bg-gray-100 text-gray-600 hover:bg-gray-200">
                <Share2 className="w-4 h-4" />
                <span>Share</span>
              </button>
            </div>

            {showComments[report.id] && (
              <div className="mt-4 space-y-4">
                <div className="space-y-2">
                  {report.commentsList.map((comment, index) => (
                    <div key={index} className="bg-gray-50 p-3 rounded-md">
                      <p className="text-sm text-gray-600">{comment}</p>
                    </div>
                  ))}
                </div>

                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={commentInputs[report.id] || ""}
                    onChange={(e) =>
                      setCommentInputs((prev) => ({
                        ...prev,
                        [report.id]: e.target.value,
                      }))
                    }
                    placeholder="Add a comment..."
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF9933]"
                  />
                  <button
                    onClick={() => handleComment(report.id)}
                    className="px-4 py-2 bg-[#FF9933] text-white rounded-md hover:bg-[#e68a2e]"
                  >
                    Post
                  </button>
                </div>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default ReportFeed;
