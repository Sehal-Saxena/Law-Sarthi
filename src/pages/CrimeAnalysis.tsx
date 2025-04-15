import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Scale, BookOpen, AlertTriangle, FileText, MessageSquare } from 'lucide-react';

const CrimeAnalysis = () => {
  const navigate = useNavigate();
  const [description, setDescription] = useState('');
  const [result, setResult] = useState<null | {
    sections: { number: string; description: string }[];
    severity: string;
    nextSteps: string[];
  }>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      // Mock response based on keywords in the description
      const mockResponse = {
        sections: [
          { 
            number: "IPC 379", 
            description: "Punishment for theft - Whoever commits theft shall be punished with imprisonment of either description for a term which may extend to three years, or with fine, or with both." 
          }
        ],
        severity: "Medium",
        nextSteps: [
          "File an FIR at the nearest police station",
          "Collect and preserve any evidence related to the incident",
          "Consult with a legal professional for further guidance"
        ]
      };
      
      if (description.toLowerCase().includes('assault')) {
        mockResponse.sections = [
          { 
            number: "IPC 351", 
            description: "Assault - Whoever makes any gesture, or any preparation intending or knowing it to be likely that such gesture or preparation will cause any person present to apprehend that he who makes that gesture or preparation is about to use criminal force to that person, is said to commit an assault." 
          },
          { 
            number: "IPC 352", 
            description: "Punishment for assault or criminal force otherwise than on grave provocation - Whoever assaults or uses criminal force to any person otherwise than on grave and sudden provocation given by that person, shall be punished with imprisonment of either description for a term which may extend to three months, or with fine which may extend to five hundred rupees, or with both." 
          }
        ];
        mockResponse.severity = "High";
      } else if (description.toLowerCase().includes('harassment')) {
        mockResponse.sections = [
          { 
            number: "IPC 354A", 
            description: "Sexual harassment and punishment for sexual harassment - A man committing any of the following acts: physical contact and advances involving unwelcome and explicit sexual overtures; or a demand or request for sexual favours; or showing pornography against the will of a woman; or making sexually coloured remarks, shall be guilty of the offence of sexual harassment." 
          }
        ];
        mockResponse.severity = "High";
      } else if (description.toLowerCase().includes('theft') || description.toLowerCase().includes('stolen')) {
        mockResponse.sections = [
          { 
            number: "IPC 379", 
            description: "Punishment for theft - Whoever commits theft shall be punished with imprisonment of either description for a term which may extend to three years, or with fine, or with both." 
          }
        ];
        mockResponse.severity = "Medium";
      } else if (description.toLowerCase().includes('damage') || description.toLowerCase().includes('property')) {
        mockResponse.sections = [
          { 
            number: "IPC 425", 
            description: "Mischief - Whoever with intent to cause, or knowing that he is likely to cause, wrongful loss or damage to the public or to any person, causes the destruction of any property, or any such change in any property or in the situation thereof as destroys or diminishes its value or utility, or affects it injuriously, commits mischief." 
          },
          { 
            number: "IPC 426", 
            description: "Punishment for mischief - Whoever commits mischief shall be punished with imprisonment of either description for a term which may extend to three months, or with fine, or with both." 
          }
        ];
        mockResponse.severity = "Low";
      }
      
      setResult(mockResponse);
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-[#FF9933]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 cursor-pointer" onClick={() => navigate('/')}>
              <Shield className="w-8 h-8 text-white" />
              <h1 className="text-2xl font-bold text-white">LawSarthi</h1>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="#" onClick={() => navigate('/')} className="text-white hover:text-[#f4f4f4] transition">Home</a>
              <a href="#" onClick={() => navigate('/community-section')} className="text-white hover:text-[#f4f4f4] transition">Community</a>
            </nav>
          </div>
          <p className="mt-4 text-white max-w-3xl">
            Get instant analysis of crime incidents and relevant IPC sections
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-8">
            <section className="bg-white rounded-lg shadow-md p-6 border-t-4 border-[#FF9933]">
              <h2 className="text-xl font-semibold mb-4 flex items-center text-[#138808]">
                <Scale className="w-5 h-5 mr-2 text-[#FF9933]" />
                Crime Analysis & IPC Section Finder
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                    Describe the incident in detail
                  </label>
                  <textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={6}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    placeholder="Provide details about what happened, when, where, and who was involved..."
                    required
                  />
                </div>

                <div className="bg-yellow-50 p-4 rounded-md">
                  <div className="flex">
                    <AlertTriangle className="h-5 w-5 text-yellow-400" />
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-yellow-800">Important Notice</h3>
                      <div className="mt-2 text-sm text-yellow-700">
                        <p>This analysis is for informational purposes only and should not be considered legal advice. Please consult with a qualified legal professional for specific guidance.</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#138808] hover:bg-[#0f6606] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#138808]"
                  >
                    {loading ? 'Analyzing...' : 'Analyze Crime'}
                  </button>
                </div>
              </form>
            </section>

            {result && (
              <section className="bg-white rounded-lg shadow-md p-6 border-t-4 border-[#138808]">
                <h2 className="text-xl font-semibold mb-4 flex items-center text-[#138808]">
                  <BookOpen className="w-5 h-5 mr-2 text-[#FF9933]" />
                  Analysis Results
                </h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">Relevant IPC Sections</h3>
                    <div className="mt-3 space-y-4">
                      {result.sections.map((section, index) => (
                        <div key={index} className="bg-gray-50 p-4 rounded-md">
                          <h4 className="text-md font-semibold text-[#FF9933]">{section.number}</h4>
                          <p className="text-sm text-gray-600 mt-1">{section.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">Case Severity</h3>
                    <div className="mt-2 inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
                      {result.severity}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">Recommended Next Steps</h3>
                    <ul className="mt-3 space-y-2">
                      {result.nextSteps.map((step, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-[#138808] mr-2">•</span>
                          <span className="text-sm text-gray-600">{step}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="pt-4 border-t border-gray-200">
                    <button
                      onClick={() => navigate('/fir-registration')}
                      className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#FF9933] hover:bg-[#e88a2a] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF9933]"
                    >
                      <FileText className="w-4 h-4 mr-2" />
                      Proceed to FIR Registration
                    </button>
                  </div>
                </div>
              </section>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <section className="bg-white rounded-lg shadow-md p-6 sticky top-4 border-t-4 border-[#FF9933]">
              <h2 className="text-xl font-semibold mb-4 flex items-center text-[#138808]">
                <BookOpen className="w-5 h-5 mr-2 text-[#FF9933]" />
                Common IPC Sections
              </h2>
              
              <div className="space-y-4">
                <div className="border-b border-gray-200 pb-3">
                  <h3 className="text-md font-medium text-[#FF9933]">IPC 302</h3>
                  <p className="text-sm text-gray-600">Punishment for murder</p>
                </div>
                
                <div className="border-b border-gray-200 pb-3">
                  <h3 className="text-md font-medium text-[#FF9933]">IPC 354</h3>
                  <p className="text-sm text-gray-600">Assault or criminal force to woman with intent to outrage her modesty</p>
                </div>
                
                <div className="border-b border-gray-200 pb-3">
                  <h3 className="text-md font-medium text-[#FF9933]">IPC 376</h3>
                  <p className="text-sm text-gray-600">Punishment for rape</p>
                </div>
                
                <div className="border-b border-gray-200 pb-3">
                  <h3 className="text-md font-medium text-[#FF9933]">IPC 379</h3>
                  <p className="text-sm text-gray-600">Punishment for theft</p>
                </div>
                
                <div className="border-b border-gray-200 pb-3">
                  <h3 className="text-md font-medium text-[#FF9933]">IPC 420</h3>
                  <p className="text-sm text-gray-600">Cheating and dishonestly inducing delivery of property</p>
                </div>
                
                <div>
                  <h3 className="text-md font-medium text-[#FF9933]">IPC 498A</h3>
                  <p className="text-sm text-gray-600">Husband or relative of husband of a woman subjecting her to cruelty</p>
                </div>
              </div>
              
              <div className="mt-6 bg-gray-50 p-4 rounded-md">
                <h3 className="text-md font-medium text-gray-900">Need Legal Help?</h3>
                <p className="text-sm text-gray-600 mt-2">
                  Contact our legal experts for personalized assistance with your case.
                </p>
                <button
                  onClick={() => navigate('/legal-chatbot')}
                  className="mt-3 w-full inline-flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#138808] hover:bg-[#0f6606]"
                >
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Chat with Legal Expert
                </button>
              </div>
            </section>
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

export default CrimeAnalysis;