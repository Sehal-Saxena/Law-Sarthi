import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, FileText, CheckCircle, AlertTriangle, MapPin, Calendar, User, Phone } from 'lucide-react';

const FIRRegistration = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    address: '',
    incidentDate: '',
    incidentTime: '',
    incidentLocation: '',
    incidentDescription: '',
    suspectInfo: '',
    witnessInfo: '',
    evidenceDescription: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const nextStep = () => {
    setStep(prev => prev + 1);
    window.scrollTo(0, 0);
  };

  const prevStep = () => {
    setStep(prev => prev - 1);
    window.scrollTo(0, 0);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would submit the data to your backend here
    setSubmitted(true);
    window.scrollTo(0, 0);
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
            Step-by-step guidance for filing a First Information Report (FIR)
          </p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {submitted ? (
          <div className="bg-white rounded-lg shadow-md p-8 border-t-4 border-[#138808]">
            <div className="text-center">
              <CheckCircle className="w-16 h-16 text-[#138808] mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">FIR Registration Submitted</h2>
              <p className="text-gray-600 mb-6">
                Your FIR registration request has been successfully submitted. You will receive a confirmation with your FIR number shortly.
              </p>
              <div className="bg-gray-50 p-6 rounded-md mb-6">
                <h3 className="text-lg font-medium text-gray-900 mb-2">Next Steps</h3>
                <ol className="list-decimal list-inside text-left space-y-2 text-gray-600">
                  <li>You will receive an SMS with your FIR reference number</li>
                  <li>Visit the police station mentioned in the SMS with your ID proof</li>
                  <li>Sign the physical copy of the FIR</li>
                  <li>Collect your copy of the FIR</li>
                </ol>
              </div>
              <button
                onClick={() => navigate('/')}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#FF9933] hover:bg-[#e88a2a]"
              >
                Return to Home
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-6 border-t-4 border-[#FF9933]">
            <h2 className="text-xl font-semibold mb-6 flex items-center text-[#138808]">
              <FileText className="w-5 h-5 mr-2 text-[#FF9933]" />
              FIR Registration Form
            </h2>

            {/* Progress Steps */}
            <div className="mb-8">
              <div className="flex items-center justify-between">
                <div className={`flex flex-col items-center ${step >= 1 ? 'text-[#138808]' : 'text-gray-400'}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-[#138808] text-white' : 'bg-gray-200 text-gray-600'}`}>
                    1
                  </div>
                  <span className="text-xs mt-1">Personal Info</span>
                </div>
                <div className={`flex-1 h-1 mx-2 ${step >= 2 ? 'bg-[#138808]' : 'bg-gray-200'}`}></div>
                <div className={`flex flex-col items-center ${step >= 2 ? 'text-[#138808]' : 'text-gray-400'}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-[#138808] text-white' : 'bg-gray-200 text-gray-600'}`}>
                    2
                  </div>
                  <span className="text-xs mt-1">Incident Details</span>
                </div>
                <div className={`flex-1 h-1 mx-2 ${step >= 3 ? 'bg-[#138808]' : 'bg-gray-200'}`}></div>
                <div className={`flex flex-col items-center ${step >= 3 ? 'text-[#138808]' : 'text-gray-400'}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 3 ? 'bg-[#138808] text-white' : 'bg-gray-200 text-gray-600'}`}>
                    3
                  </div>
                  <span className="text-xs mt-1">Additional Info</span>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              {step === 1 && (
                <div className="space-y-6">
                  <h3 className="text-lg font-medium text-gray-900">Personal Information</h3>
                  
                  <div>
                    <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                      Full Name
                    </label>
                    <div className="mt-1 relative">
                      <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 pl-10"
                        required
                      />
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                        Phone Number
                      </label>
                      <div className="mt-1 relative">
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 pl-10"
                          required
                        />
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                      Residential Address
                    </label>
                    <textarea
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      rows={3}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      required
                    />
                  </div>
                  
                  <div className="bg-yellow-50 p-4 rounded-md">
                    <div className="flex">
                      <AlertTriangle className="h-5 w-5 text-yellow-400" />
                      <div className="ml-3">
                        <h3 className="text-sm font-medium text-yellow-800">Privacy Notice</h3>
                        <div className="mt-2 text-sm text-yellow-700">
                          <p>Your personal information is protected and will only be used for official purposes related to your FIR.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={nextStep}
                      className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#138808] hover:bg-[#0f6606]"
                    >
                      Next Step
                    </button>
                  </div>
                </div>
              )}
              
              {step === 2 && (
                <div className="space-y-6">
                  <h3 className="text-lg font-medium text-gray-900">Incident Details</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="incidentDate" className="block text-sm font-medium text-gray-700">
                        Date of Incident
                      </label>
                      <div className="mt-1 relative">
                        <input
                          type="date"
                          id="incidentDate"
                          name="incidentDate"
                          value={formData.incidentDate}
                          onChange={handleChange}
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 pl-10"
                          required
                        />
                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="incidentTime" className="block text-sm font-medium text-gray-700">
                        Time of Incident
                      </label>
                      <input
                        type="time"
                        id="incidentTime"
                        name="incidentTime"
                        value={formData.incidentTime}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="incidentLocation" className="block text-sm font-medium text-gray-700">
                      Location of Incident
                    </label>
                    <div className="mt-1 relative">
                      <input
                        type="text"
                        id="incidentLocation"
                        name="incidentLocation"
                        value={formData.incidentLocation}
                        onChange={handleChange}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 pl-10"
                        placeholder="Enter detailed location"
                        required
                      />
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="incidentDescription" className="block text-sm font-medium text-gray-700">
                      Detailed Description of the Incident
                    </label>
                    <textarea
                      id="incidentDescription"
                      name="incidentDescription"
                      value={formData.incidentDescription}
                      onChange={handleChange}
                      rows={5}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      placeholder="Describe what happened in detail..."
                      required
                    />
                  </div>
                  
                  <div className="flex justify-between">
                    <button
                      type="button"
                      onClick={prevStep}
                      className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                    >
                      Previous Step
                    </button>
                    <button
                      type="button"
                      onClick={nextStep}
                      className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#138808] hover:bg-[#0f6606]"
                    >
                      Next Step
                    </button>
                  </div>
                </div>
              )}
              
              {step === 3 && (
                <div className="space-y-6">
                  <h3 className="text-lg font-medium text-gray-900">Additional Information</h3>
                  
                  <div>
                    <label htmlFor="suspectInfo" className="block text-sm font-medium text-gray-700">
                      Suspect Information (if known)
                    </label>
                    <textarea
                      id="suspectInfo"
                      name="suspectInfo"
                      value={formData.suspectInfo}
                      onChange={handleChange}
                      rows={3}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      placeholder="Provide any details about the suspect(s)..."
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="witnessInfo" className="block text-sm font-medium text-gray-700">
                      Witness Information (if any)
                    </label>
                    <textarea
                      id="witnessInfo"
                      name="witnessInfo"
                      value={formData.witnessInfo}
                      onChange={handleChange}
                      rows={3}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      placeholder="Provide details of any witnesses..."
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="evidenceDescription" className="block text-sm font-medium text-gray-700">
                      Evidence Description
                    </label>
                    <textarea
                      id="evidenceDescription"
                      name="evidenceDescription"
                      value={formData.evidenceDescription}
                      onChange={handleChange}
                      rows={3}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      placeholder="Describe any evidence related to the incident..."
                    />
                  </div>
                  
                  <div className="bg-blue-50 p-4 rounded-md">
                    <div className="flex">
                      <AlertTriangle className="h-5 w-5 text-blue-400" />
                      <div className="ml-3">
                        <h3 className="text-sm font-medium text-blue-800">Declaration</h3>
                        <div className="mt-2 text-sm text-blue-700">
                          <p>I hereby declare that the information provided above is true to the best of my knowledge and belief. I understand that providing false information is punishable under the law.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between">
                    <button
                      type="button"
                      onClick={prevStep}
                      className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                    >
                      Previous Step
                    </button>
                    <button
                      type="submit"
                      className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#FF9933] hover:bg-[#e88a2a]"
                    >
                      Submit FIR
                    </button>
                  </div>
                </div>
              )}
            </form>
          </div>
        )}
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

export default FIRRegistration;