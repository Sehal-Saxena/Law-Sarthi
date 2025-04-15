import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Shield, 
  FileText, 
  BarChart3, 
  MessageSquare, 
  Users,
  Scale,
  ChevronRight
} from 'lucide-react';

interface FeatureButton {
  icon: React.ReactNode;
  label: string;
  description: string;
  path: string;
  color: string;
  bgColor: string;
}

const HomePage = () => {
  const navigate = useNavigate();

  const features: FeatureButton[] = [
    {
      icon: <Scale className="w-6 h-6" />,
      label: "Analyze Crime & Get IPC Sections",
      description: "Get instant IPC section suggestions based on crime description",
      path: "/crime-analysis",
      color: "text-white",
      bgColor: "bg-[#FF9933]"
    },
    {
      icon: <FileText className="w-6 h-6" />,
      label: "File an FIR Online",
      description: "Step-by-step guidance for FIR registration",
      path: "/fir-registration",
      color: "text-white",
      bgColor: "bg-[#138808]"
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      label: "View Crime Stats",
      description: "State-wise crime data visualization and analysis",
      path: "/crime-dashboard",
      color: "text-white",
      bgColor: "bg-[#FF9933]"
    },
    {
      icon: <MessageSquare className="w-6 h-6" />,
      label: "Ask Legal Questions",
      description: "Get instant answers to your legal queries",
      path: "/legal-chatbot",
      color: "text-white",
      bgColor: "bg-[#138808]"
    },
    {
      icon: <Users className="w-6 h-6" />,
      label: "Report Crime Anonymously",
      description: "Join our community to report and track incidents",
      path: "/community-section",
      color: "text-white",
      bgColor: "bg-[#FF9933]"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-[#FF9933] to-[#138808] pt-16 pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center mb-8">
            <Shield className="w-16 h-16 text-white" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            LawSarthi
          </h1>
          <p className="text-xl md:text-2xl text-white mb-8">
            Your AI Guide to Justice!
          </p>
          <p className="text-lg text-white/90 max-w-2xl mx-auto">
            Empowering citizens with AI-powered legal assistance, simplified FIR filing, 
            and community-driven safety initiatives.
          </p>
        </div>
      </div>

      {/* Features Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <button
              key={index}
              onClick={() => navigate(feature.path)}
              className={`${feature.bgColor} hover:opacity-90 transform hover:scale-105 transition-all duration-300 rounded-xl shadow-xl overflow-hidden text-left`}
            >
              <div className="p-6 text-white h-full flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  {feature.icon}
                  <ChevronRight className="w-5 h-5 opacity-75" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.label}</h3>
                <p className="text-white/90 text-sm flex-grow">
                  {feature.description}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Additional Info Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="p-6 bg-white rounded-lg shadow-md border-t-4 border-[#FF9933]">
            <div className="text-4xl font-bold text-[#FF9933] mb-2">24/7</div>
            <p className="text-gray-600">Available Support</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-md border-t-4 border-[#138808]">
            <div className="text-4xl font-bold text-[#138808] mb-2">100%</div>
            <p className="text-gray-600">Anonymous Reporting</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-md border-t-4 border-[#FF9933]">
            <div className="text-4xl font-bold text-[#FF9933] mb-2">Pan India</div>
            <p className="text-gray-600">Coverage</p>
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">How LawSarthi Works</h2>
            <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
              Our platform combines AI technology with legal expertise to provide accessible justice solutions for all citizens
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-[#FF9933] rounded-full flex items-center justify-center text-white font-bold text-xl mb-4">1</div>
              <h3 className="text-xl font-semibold mb-2">Report Incidents</h3>
              <p className="text-gray-600">
                Anonymously report crimes or incidents through our secure platform. Attach evidence and provide details for better assistance.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-[#138808] rounded-full flex items-center justify-center text-white font-bold text-xl mb-4">2</div>
              <h3 className="text-xl font-semibold mb-2">Get Legal Guidance</h3>
              <p className="text-gray-600">
                Our AI analyzes your case and provides relevant IPC sections, legal advice, and next steps tailored to your situation.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-[#FF9933] rounded-full flex items-center justify-center text-white font-bold text-xl mb-4">3</div>
              <h3 className="text-xl font-semibold mb-2">Take Action</h3>
              <p className="text-gray-600">
                File FIRs online, connect with legal resources, and track your case progress all through one integrated platform.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#138808] text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
                <li><a href="#" className="hover:text-[#f4f4f4] transition">About Us</a></li>
                <li><a href="#" className="hover:text-[#f4f4f4] transition">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-[#f4f4f4] transition">Terms of Service</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Legal Resources</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-[#f4f4f4] transition">IPC Sections</a></li>
                <li><a href="#" className="hover:text-[#f4f4f4] transition">Legal Aid Centers</a></li>
                <li><a href="#" className="hover:text-[#f4f4f4] transition">File an FIR</a></li>
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
};

export default HomePage;