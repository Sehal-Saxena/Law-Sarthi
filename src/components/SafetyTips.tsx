import React from 'react';
import { Shield, Phone, AlertTriangle } from 'lucide-react';

const SafetyTips: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Emergency Contacts */}
      <div className="bg-red-50 p-4 rounded-lg">
        <h3 className="text-lg font-medium text-red-800 flex items-center">
          <Phone className="h-5 w-5 mr-2" />
          Emergency Numbers
        </h3>
        <ul className="mt-3 text-sm text-red-700 space-y-2">
          <li>Police: 100</li>
          <li>Women Helpline: 1091</li>
          <li>Child Helpline: 1098</li>
          <li>Anti-Ragging: 1800-180-5522</li>
        </ul>
      </div>

      {/* Safety Tips */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 flex items-center">
          <Shield className="h-5 w-5 mr-2" />
          Safety Guidelines
        </h3>
        <ul className="mt-3 space-y-3">
          <li className="flex items-start">
            <AlertTriangle className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0" />
            <span className="text-sm text-gray-600">Stay aware of your surroundings, especially in unfamiliar areas</span>
          </li>
          <li className="flex items-start">
            <AlertTriangle className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0" />
            <span className="text-sm text-gray-600">Keep emergency numbers saved on speed dial</span>
          </li>
          <li className="flex items-start">
            <AlertTriangle className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0" />
            <span className="text-sm text-gray-600">Share your location with trusted contacts when traveling</span>
          </li>
          <li className="flex items-start">
            <AlertTriangle className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0" />
            <span className="text-sm text-gray-600">Document any incidents with photos or videos when safe to do so</span>
          </li>
        </ul>
      </div>

      {/* Legal Resources */}
      <div className="bg-blue-50 p-4 rounded-lg">
        <h3 className="text-lg font-medium text-blue-800">Legal Resources</h3>
        <ul className="mt-3 space-y-2">
          <li>
            <a href="#" className="text-sm text-blue-600 hover:text-blue-800 flex items-center">
              <span className="mr-2">→</span>
              Find Nearest Police Station
            </a>
          </li>
          <li>
            <a href="#" className="text-sm text-blue-600 hover:text-blue-800 flex items-center">
              <span className="mr-2">→</span>
              Legal Aid Services
            </a>
          </li>
          <li>
            <a href="#" className="text-sm text-blue-600 hover:text-blue-800 flex items-center">
              <span className="mr-2">→</span>
              Victim Support Services
            </a>
          </li>
        </ul>
      </div>

      {/* Community Guidelines */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="text-lg font-medium text-gray-900">Community Guidelines</h3>
        <ul className="mt-3 space-y-2 text-sm text-gray-600">
          <li>• Respect anonymity of all reports</li>
          <li>• Verify information before sharing</li>
          <li>• Report responsibly and truthfully</li>
          <li>• Support fellow community members</li>
        </ul>
      </div>
    </div>
  );
};

export default SafetyTips;