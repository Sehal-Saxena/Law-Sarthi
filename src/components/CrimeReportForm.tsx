import React, { useState } from 'react';
import { Camera, MapPin, AlertCircle } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';

interface ReportFormData {
  description: string;
  location: string;
  date: string;
  category: string;
  image?: File;
}

interface CrimeReportFormProps {
  onSubmit: (formData: ReportFormData) => void;
}

const CrimeReportForm: React.FC<CrimeReportFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<ReportFormData>({
    description: '',
    location: '',
    date: '',
    category: '',
  });
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      image: selectedImage || undefined
    });
    // Reset form
    setFormData({
      description: '',
      location: '',
      date: '',
      category: '',
    });
    setSelectedImage(null);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedImage(e.target.files[0]);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="category" className="block text-sm font-medium text-gray-700">
          Incident Category
        </label>
        <select
          id="category"
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          required
        >
          <option value="">Select a category</option>
          <option value="Theft">Theft</option>
          <option value="Harassment">Harassment</option>
          <option value="Vandalism">Vandalism</option>
          <option value="Assault">Assault</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Incident Description
        </label>
        <textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          rows={4}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          placeholder="Describe what happened..."
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="location" className="block text-sm font-medium text-gray-700">
            Location
          </label>
          <div className="mt-1 relative">
            <input
              type="text"
              id="location"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 pl-10"
              placeholder="Enter location"
              required
            />
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          </div>
        </div>

        <div>
          <label htmlFor="date" className="block text-sm font-medium text-gray-700">
            Date of Incident
          </label>
          <input
            type="date"
            id="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Evidence (Optional)
        </label>
        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
          <div className="space-y-1 text-center">
            <Camera className="mx-auto h-12 w-12 text-gray-400" />
            <div className="flex text-sm text-gray-600">
              <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                <span>Upload files</span>
                <input 
                  id="file-upload" 
                  name="file-upload" 
                  type="file" 
                  className="sr-only" 
                  accept="image/*" 
                  onChange={handleFileChange}
                />
              </label>
              <p className="pl-1">or drag and drop</p>
            </div>
            <p className="text-xs text-gray-500">
              {selectedImage ? `Selected: ${selectedImage.name}` : 'PNG, JPG, GIF up to 10MB'}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-yellow-50 p-4 rounded-md">
        <div className="flex">
          <AlertCircle className="h-5 w-5 text-yellow-400" />
          <div className="ml-3">
            <h3 className="text-sm font-medium text-yellow-800">Important Notice</h3>
            <div className="mt-2 text-sm text-yellow-700">
              <p>Your report will be anonymous. Do not include any personal identifying information unless absolutely necessary.</p>
            </div>
          </div>
        </div>
      </div>

      <div>
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Submit Report
        </button>
      </div>
    </form>
  );
};

export default CrimeReportForm;