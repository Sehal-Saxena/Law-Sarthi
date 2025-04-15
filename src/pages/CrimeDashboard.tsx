import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, BarChart3, PieChart, Map, Filter, Download } from 'lucide-react';

const CrimeDashboard = () => {
  const navigate = useNavigate();
  const [selectedState, setSelectedState] = useState('all');
  const [selectedYear, setSelectedYear] = useState('2024');
  const [selectedCrimeType, setSelectedCrimeType] = useState('all');

  // Mock data for the dashboard
  const stateOptions = [
    { value: 'all', label: 'All States' },
    { value: 'delhi', label: 'Delhi' },
    { value: 'maharashtra', label: 'Maharashtra' },
    { value: 'karnataka', label: 'Karnataka' },
    { value: 'tamilnadu', label: 'Tamil Nadu' },
    { value: 'up', label: 'Uttar Pradesh' }
  ];

  const yearOptions = [
    { value: '2024', label: '2024' },
    { value: '2023', label: '2023' },
    { value: '2022', label: '2022' },
    { value: '2021', label: '2021' },
    { value: '2020', label: '2020' }
  ];

  const crimeTypeOptions = [
    { value: 'all', label: 'All Crimes' },
    { value: 'theft', label: 'Theft' },
    { value: 'assault', label: 'Assault' },
    { value: 'cybercrime', label: 'Cybercrime' },
    { value: 'harassment', label: 'Harassment' },
    { value: 'fraud', label: 'Fraud' }
  ];

  // Mock statistics
  const statistics = [
    { label: 'Total Reported Crimes', value: '12,458', change: '+3.2%', color: 'bg-red-100 text-red-800' },
    { label: 'Solved Cases', value: '8,932', change: '+5.7%', color: 'bg-green-100 text-green-800' },
    { label: 'Pending Investigation', value: '3,526', change: '-2.1%', color: 'bg-yellow-100 text-yellow-800' },
    { label: 'Conviction Rate', value: '68.4%', change: '+1.5%', color: 'bg-blue-100 text-blue-800' }
  ];

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
            Comprehensive crime statistics and data visualization across India
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8 border-t-4 border-[#FF9933]">
          <div className="flex items-center mb-4">
            <Filter className="w-5 h-5 text-[#FF9933] mr-2" />
            <h2 className="text-xl font-semibold text-gray-900">Filter Data</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                State/UT
              </label>
              <select
                id="state"
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              >
                {stateOptions.map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label htmlFor="year" className="block text-sm font-medium text-gray-700 mb-1">
                Year
              </label>
              <select
                id="year"
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              >
                {yearOptions.map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label htmlFor="crimeType" className="block text-sm font-medium text-gray-700 mb-1">
                Crime Type
              </label>
              <select
                id="crimeType"
                value={selectedCrimeType}
                onChange={(e) => setSelectedCrimeType(e.target.value)}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              >
                {crimeTypeOptions.map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="mt-4 flex justify-end">
            <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#138808] hover:bg-[#0f6606]">
              Apply Filters
            </button>
          </div>
        </div>
        
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statistics.map((stat, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6 border-t-4 border-[#138808]">
              <h3 className="text-lg font-medium text-gray-900 mb-2">{stat.label}</h3>
              <div className="flex items-end justify-between">
                <span className="text-3xl font-bold text-gray-900">{stat.value}</span>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${stat.color}`}>
                  {stat.change}
                </span>
              </div>
            </div>
          ))}
        </div>
        
        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Crime by Type Chart */}
          <div className="bg-white rounded-lg shadow-md p-6 border-t-4 border-[#FF9933]">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-medium text-gray-900 flex items-center">
                <PieChart className="w-5 h-5 text-[#FF9933] mr-2" />
                Crime by Type
              </h3>
              <button className="text-sm text-[#138808] hover:text-[#0f6606] flex items-center">
                <Download className="w-4 h-4 mr-1" />
                Export
              </button>
            </div>
            
            <div className="h-64 flex items-center justify-center bg-gray-50 rounded-md">
              {/* This would be a real chart in a production app */}
              <div className="text-center">
                <PieChart className="w-16 h-16 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500">Crime distribution by type visualization</p>
              </div>
            </div>
            
            <div className="mt-4 grid grid-cols-2 gap-2">
              <div className="flex items-center">
                <span className="w-3 h-3 bg-blue-500 rounded-full mr-2"></span>
                <span className="text-sm text-gray-600">Theft (32%)</span>
              </div>
              <div className="flex items-center">
                <span className="w-3 h-3 bg-red-500 rounded-full mr-2"></span>
                <span className="text-sm text-gray-600">Assault (18%)</span>
              </div>
              <div className="flex items-center">
                <span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
                <span className="text-sm text-gray-600">Cybercrime (24%)</span>
              </div>
              <div className="flex items-center">
                <span className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></span>
                <span className="text-sm text-gray-600">Others (26%)</span>
              </div>
            </div>
          </div>
          
          {/* Crime Trend Chart */}
          <div className="bg-white rounded-lg shadow-md p-6 border-t-4 border-[#138808]">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-medium text-gray-900 flex items-center">
                <BarChart3 className="w-5 h-5 text-[#138808] mr-2" />
                Crime Trends (Monthly)
              </h3>
              <button className="text-sm text-[#138808] hover:text-[#0f6606] flex items-center">
                <Download className="w-4 h-4 mr-1" />
                Export
              </button>
            </div>
            
            <div className="h-64 flex items-center justify-center bg-gray-50 rounded-md">
              {/* This would be a real chart in a production app */}
              <div className="text-center">
                <BarChart3 className="w-16 h-16 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500">Monthly crime trend visualization</p>
              </div>
            </div>
            
            <div className="mt-4">
              <p className="text-sm text-gray-600">
                <span className="font-medium text-[#FF9933]">Key Insight:</span> Crime rates show a 12% decrease in the last quarter compared to the same period last year.
              </p>
            </div>
          </div>
        </div>
        
        {/* Map Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8 border-t-4 border-[#FF9933]">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-medium text-gray-900 flex items-center">
              <Map className="w-5 h-5 text-[#FF9933] mr-2" />
              Crime Heatmap by Region
            </h3>
            <button className="text-sm text-[#138808] hover:text-[#0f6606] flex items-center">
              <Download className="w-4 h-4 mr-1" />
              Export
            </button>
          </div>
          
          <div className="h-96 flex items-center justify-center bg-gray-50 rounded-md">
            {/* This would be a real map in a production app */}
            <div className="text-center">
              <Map className="w-16 h-16 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-500">Interactive crime heatmap of India</p>
              <p className="text-xs text-gray-400 mt-2">Click on any state to view detailed statistics</p>
            </div>
          </div>
          
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gray-50 p-4 rounded-md">
              <h4 className="text-sm font-medium text-gray-900 mb-1">Highest Crime Rate</h4>
              <p className="text-lg font-bold text-[#FF9933]">Delhi</p>
              <p className="text-xs text-gray-500">143 incidents per 100,000 population</p>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-md">
              <h4 className="text-sm font-medium text-gray-900 mb-1">Lowest Crime Rate</h4>
              <p className="text-lg font-bold text-[#138808]">Sikkim</p>
              <p className="text-xs text-gray-500">28 incidents per 100,000 population</p>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-md">
              <h4 className="text-sm font-medium text-gray-900 mb-1">Most Improved</h4>
              <p className="text-lg font-bold text-blue-600">Gujarat</p>
              <p className="text-xs text-gray-500">18% reduction in crime rate year-over-year</p>
            </div>
          </div>
        </div>
        
        {/* Data Table */}
        <div className="bg-white rounded-lg shadow-md p-6 border-t-4 border-[#138808]">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-medium text-gray-900">Detailed Crime Statistics</h3>
            <button className="text-sm text-[#138808] hover:text-[#0f6606] flex items-center">
              <Download className="w-4 h-4 mr-1" />
              Download CSV
            </button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    State/UT
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total Crimes
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Theft
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Assault
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Cybercrime
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    YoY Change
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Delhi</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2,458</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">842</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">356</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">512</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600">+4.2%</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Maharashtra</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">3,124</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">1,024</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">428</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">687</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">-2.1%</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Karnataka</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">1,876</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">623</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">245</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">542</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">-1.8%</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Tamil Nadu</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">1,542</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">487</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">213</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">412</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">-3.5%</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Uttar Pradesh</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">3,458</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">1,245</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">587</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">324</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600">+1.2%</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <div className="mt-4 flex justify-between items-center">
            <div className="text-sm text-gray-500">
              Showing 5 of 36 states/UTs
            </div>
            <div className="flex space-x-2">
              <button className="px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-700">Previous</button>
              <button className="px-3 py-1 bg-[#138808] text-white rounded-md text-sm">Next</button>
            </div>
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

export default CrimeDashboard;