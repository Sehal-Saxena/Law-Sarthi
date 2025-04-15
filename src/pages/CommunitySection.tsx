import React, { useState, useEffect } from "react";
import { Shield, ThumbsUp, MessageSquare } from "lucide-react";
import CrimeReportForm from "../components/CrimeReportForm";
import ReportFeed from "../components/ReportFeed";
import SafetyTips from "../components/SafetyTips";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import {
  createReport,
  getReports,
  getUserUpvotes,
  getReportComments,
  Report,
} from "../lib/supabase";

interface ReportWithUI extends Report {
  hasUserLiked?: boolean;
  commentsList: string[];
  comments: number;
}

function CommunitySection() {
  const [reports, setReports] = useState<ReportWithUI[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitStatus, setSubmitStatus] = useState<{
    success: boolean;
    message: string;
  } | null>(null);
  const [userId, setUserId] = useState<string>("");
  const navigate = useNavigate();

  const fetchReports = async () => {
    try {
      setLoading(true);
      const fetchedReports = await getReports();
      setReports(fetchedReports);
    } catch (error) {
      console.error("Error fetching reports:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Generate or retrieve user ID
    let storedUserId = localStorage.getItem("userId");
    if (!storedUserId) {
      storedUserId = uuidv4();
      localStorage.setItem("userId", storedUserId);
    }
    setUserId(storedUserId);

    // Initial fetch
    fetchReports();

    // Set up interval to refresh reports every 30 seconds
    const intervalId = setInterval(fetchReports, 30000);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  const handleNewReport = async (formData: any) => {
    try {
      const report = await createReport(formData);
      if (report) {
        // Refresh reports to get the latest data
        await fetchReports();
        setSubmitStatus({
          success: true,
          message: "Report submitted successfully!",
        });
      } else {
        throw new Error("Failed to create report");
      }
    } catch (error) {
      setSubmitStatus({
        success: false,
        message: "Failed to submit report. Please try again.",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-[#FF9933]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div
              className="flex items-center space-x-3 cursor-pointer"
              onClick={() => navigate("/")}
            >
              <Shield className="w-8 h-8 text-white" />
              <h1 className="text-2xl font-bold text-white">LawSarthi</h1>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a
                href="#report"
                className="text-white hover:text-[#f4f4f4] transition"
              >
                Report Crime
              </a>
              <a
                href="#feed"
                className="text-white hover:text-[#f4f4f4] transition"
              >
                Community Feed
              </a>
              <a
                href="#safety"
                className="text-white hover:text-[#f4f4f4] transition"
              >
                Safety Tips
              </a>
            </nav>
          </div>
          <p className="mt-4 text-white max-w-3xl">
            Your trusted platform for anonymous crime reporting and community
            safety
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-8">
            <section
              id="report"
              className="bg-white rounded-lg shadow-md p-6 border-t-4 border-[#FF9933]"
            >
              <h2 className="text-xl font-semibold mb-4 flex items-center text-[#138808]">
                <MessageSquare className="w-5 h-5 mr-2 text-[#FF9933]" />
                Report an Incident
              </h2>

              {submitStatus && (
                <div
                  className={`mb-4 p-3 rounded-md ${
                    submitStatus.success
                      ? "bg-green-50 text-green-800"
                      : "bg-red-50 text-red-800"
                  }`}
                >
                  {submitStatus.message}
                </div>
              )}

              <CrimeReportForm onSubmit={handleNewReport} />
            </section>

            <section
              id="feed"
              className="bg-white rounded-lg shadow-md p-6 border-t-4 border-[#138808]"
            >
              <h2 className="text-xl font-semibold mb-4 flex items-center text-[#138808]">
                <MessageSquare className="w-5 h-5 mr-2 text-[#FF9933]" />
                Community Reports
              </h2>
              {loading ? (
                <div className="text-center py-8">
                  <p className="text-gray-500">Loading reports...</p>
                </div>
              ) : (
                <ReportFeed
                  reports={reports}
                  setReports={setReports}
                  userId={userId}
                />
              )}
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            <SafetyTips />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#138808] text-white mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Emergency Contacts</h3>
              <ul className="space-y-2">
                <li>Police: 100</li>
                <li>Women Helpline: 1091</li>
                <li>Child Helpline: 1098</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="hover:text-[#f4f4f4] transition">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-[#f4f4f4] transition">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-[#f4f4f4] transition">
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Legal Resources</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="hover:text-[#f4f4f4] transition">
                    IPC Sections
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-[#f4f4f4] transition">
                    Legal Aid Centers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-[#f4f4f4] transition">
                    File an FIR
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-[#f4f4f4] text-center">
            <p>&copy; 2025 LawSarthi. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default CommunitySection;
