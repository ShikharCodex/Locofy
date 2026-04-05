import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import {
  Camera,
  UploadCloud,
  User,
  MapPin,
  FileText,
  Phone,
  AlertCircle,
  Send,
  ArrowLeft,
} from "lucide-react";

const ReportForm = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    age: "",
    height: "",
    weight: "",
    gender: "Male",
    lastSeenLocation: "",
    lastSeenDate: "",
    clothingDescription: "",
    additionalNotes: "",
    contactPhone: "",
    contactEmail: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, image: file }));
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const submitData = new FormData();
    for (const key in formData) {
      if (formData[key] !== null) {
        submitData.append(key, formData[key]);
      }
    }

    try {
      await api.post("/persons", submitData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to submit report");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-24 selection:bg-blue-100 selection:text-blue-900">
      {/* Hero Header */}
      <div className="bg-slate-950 pt-16 pb-32 relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-30">
          <div className="absolute -top-32 -right-32 w-[500px] h-[500px] bg-blue-600/40 rounded-full blur-[120px]"></div>
          <div className="absolute top-1/2 -left-32 w-[400px] h-[400px] bg-indigo-500/30 rounded-full blur-[100px]"></div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <button
            onClick={() => navigate(-1)}
            type="button"
            className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-8 text-sm font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to previous page
          </button>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
            Report a Missing Person
          </h1>
          <p className="text-slate-400 max-w-2xl text-lg leading-relaxed">
            Please provide as much accurate detail as possible. The information
            you submit will instantly alert our community network to begin the
            search.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-20">
        {error && (
          <div className="mb-8 rounded-2xl bg-red-50 p-5 border border-red-100 flex items-start shadow-sm animate-in fade-in slide-in-from-bottom-2">
            <AlertCircle className="h-6 w-6 text-red-600 mt-0.5 flex-shrink-0" />
            <div className="ml-4">
              <h3 className="text-sm font-bold text-red-900">
                Submission Error
              </h3>
              <p className="text-sm text-red-700 mt-1">{error}</p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Section 1: Photograph */}
          <div className="bg-white rounded-[2rem] p-6 sm:p-10 shadow-sm border border-slate-100">
            <div className="flex items-center gap-4 mb-6">
              <div className="h-12 w-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 border border-blue-100">
                <Camera className="h-6 w-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  Recent Photograph
                </h2>
                <p className="text-sm text-slate-500">
                  A clear, recent photo is the most crucial piece of
                  information.
                </p>
              </div>
            </div>

            {/* Fully clickable upload area wrapped in a label */}
            <label className="mt-4 group relative flex w-full cursor-pointer flex-col items-center justify-center rounded-[1.5rem] border-2 border-dashed border-slate-200 px-6 py-12 hover:border-blue-400 hover:bg-blue-50/50 transition-all duration-300 bg-slate-50 overflow-hidden">
              <input
                type="file"
                name="image"
                className="sr-only"
                accept="image/*"
                onChange={handleImageChange}
              />

              {imagePreview ? (
                <div className="text-center relative z-10 flex flex-col items-center pointer-events-none">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="h-56 w-56 object-cover rounded-2xl shadow-lg border-4 border-white mb-6"
                  />
                  <div className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-bold text-slate-700 shadow-sm ring-1 ring-slate-200 group-hover:bg-slate-50 group-hover:text-blue-600 transition-colors">
                    <Camera className="w-4 h-4" />
                    <span>Change Photograph</span>
                  </div>
                </div>
              ) : (
                <div className="text-center relative z-10 pointer-events-none">
                  <div className="mx-auto h-16 w-16 bg-white rounded-full flex items-center justify-center shadow-sm mb-4 group-hover:scale-110 transition-transform duration-300">
                    <UploadCloud className="h-8 w-8 text-blue-500" />
                  </div>
                  <div className="mt-4 flex text-sm leading-6 text-slate-600 justify-center">
                    <span className="font-bold text-blue-600 group-hover:text-blue-700">
                      Click to upload a file 
                    </span>
                    <p className="pl-1 text-red-600 font-bold" aria-hidden="true"> or</p>
                    <p className="pl-1 text-blue-600 font-bold">Easily drag and drop</p>
                  </div>
                  <p className="text-xs leading-5 text-slate-500 mt-2 font-medium">
                    PNG, JPG, JPEG up to 10MB
                  </p>
                </div>
              )}
            </label>
          </div>

          {/* Section 2: Basic Demographics */}
          <div className="bg-white rounded-[2rem] p-6 sm:p-10 shadow-sm border border-slate-100">
            <div className="flex items-center gap-4 mb-8">
              <div className="h-12 w-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 border border-indigo-100">
                <User className="h-6 w-6" />
              </div>
              <h2 className="text-xl font-bold text-slate-900">
                Basic Information
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label className="block text-sm font-bold text-slate-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="block w-full rounded-xl border border-slate-200 py-3.5 px-4 text-slate-900 shadow-sm placeholder:text-slate-400 focus:ring-2 focus:ring-indigo-600 focus:border-transparent bg-slate-50 focus:bg-white transition-all sm:text-sm font-medium"
                  placeholder="First and Last Name"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">
                  Age
                </label>
                <input
                  type="number"
                  name="age"
                  required
                  value={formData.age}
                  onChange={handleChange}
                  className="block w-full rounded-xl border border-slate-200 py-3.5 px-4 text-slate-900 shadow-sm placeholder:text-slate-400 focus:ring-2 focus:ring-indigo-600 focus:border-transparent bg-slate-50 focus:bg-white transition-all sm:text-sm font-medium"
                  placeholder="Current age"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">
                  Gender
                </label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="block w-full rounded-xl border border-slate-200 py-3.5 px-4 text-slate-900 shadow-sm focus:ring-2 focus:ring-indigo-600 focus:border-transparent bg-slate-50 focus:bg-white transition-all sm:text-sm font-medium cursor-pointer"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">
                  Height
                </label>
                <input
                  type="text"
                  name="height"
                  value={formData.height}
                  onChange={handleChange}
                  className="block w-full rounded-xl border border-slate-200 py-3.5 px-4 text-slate-900 shadow-sm placeholder:text-slate-400 focus:ring-2 focus:ring-indigo-600 focus:border-transparent bg-slate-50 focus:bg-white transition-all sm:text-sm font-medium"
                  placeholder="e.g., 5'9&quot; or 175cm"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">
                  Weight
                </label>
                <input
                  type="text"
                  name="weight"
                  value={formData.weight}
                  onChange={handleChange}
                  className="block w-full rounded-xl border border-slate-200 py-3.5 px-4 text-slate-900 shadow-sm placeholder:text-slate-400 focus:ring-2 focus:ring-indigo-600 focus:border-transparent bg-slate-50 focus:bg-white transition-all sm:text-sm font-medium"
                  placeholder="e.g., 160 lbs or 72kg"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Last Seen Details */}
          <div className="bg-white rounded-[2rem] p-6 sm:p-10 shadow-sm border border-slate-100">
            <div className="flex items-center gap-4 mb-8">
              <div className="h-12 w-12 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-600 border border-amber-100">
                <MapPin className="h-6 w-6" />
              </div>
              <h2 className="text-xl font-bold text-slate-900">
                Last Seen Details
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label className="block text-sm font-bold text-slate-700 mb-2">
                  Last Known Location
                </label>
                <input
                  type="text"
                  name="lastSeenLocation"
                  required
                  value={formData.lastSeenLocation}
                  onChange={handleChange}
                  className="block w-full rounded-xl border border-slate-200 py-3.5 px-4 text-slate-900 shadow-sm placeholder:text-slate-400 focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-slate-50 focus:bg-white transition-all sm:text-sm font-medium"
                  placeholder="Exact address, cross streets, or landmark"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-sm font-bold text-slate-700 mb-2">
                  Date Last Seen
                </label>
                <input
                  type="date"
                  name="lastSeenDate"
                  required
                  value={formData.lastSeenDate}
                  onChange={handleChange}
                  className="block w-full rounded-xl border border-slate-200 py-3.5 px-4 text-slate-900 shadow-sm focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-slate-50 focus:bg-white transition-all sm:text-sm font-medium"
                />
              </div>
            </div>
          </div>

          {/* Section 4: Descriptions */}
          <div className="bg-white rounded-[2rem] p-6 sm:p-10 shadow-sm border border-slate-100">
            <div className="flex items-center gap-4 mb-8">
              <div className="h-12 w-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600 border border-emerald-100">
                <FileText className="h-6 w-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  Physical Descriptions
                </h2>
                <p className="text-sm text-slate-500">
                  Distinctive features help searchers identify individuals
                  quickly.
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">
                  Clothing & Accessories
                </label>
                <textarea
                  name="clothingDescription"
                  rows={3}
                  value={formData.clothingDescription}
                  onChange={handleChange}
                  className="block w-full rounded-xl border border-slate-200 py-3.5 px-4 text-slate-900 shadow-sm placeholder:text-slate-400 focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-slate-50 focus:bg-white transition-all sm:text-sm font-medium resize-none"
                  placeholder="Shirt color, jacket, shoes, backpack, glasses..."
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">
                  Additional Notes / Medical Info
                </label>
                <textarea
                  name="additionalNotes"
                  rows={4}
                  value={formData.additionalNotes}
                  onChange={handleChange}
                  className="block w-full rounded-xl border border-slate-200 py-3.5 px-4 text-slate-900 shadow-sm placeholder:text-slate-400 focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-slate-50 focus:bg-white transition-all sm:text-sm font-medium resize-none"
                  placeholder="Tattoos, scars, vehicle description, mental or physical medical conditions..."
                />
              </div>
            </div>
          </div>

          {/* Section 5: Contact Info */}
          <div className="bg-white rounded-[2rem] p-6 sm:p-10 shadow-sm border border-slate-100">
            <div className="flex items-center gap-4 mb-8">
              <div className="h-12 w-12 rounded-2xl bg-rose-50 flex items-center justify-center text-rose-600 border border-rose-100">
                <Phone className="h-6 w-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  Your Contact Details
                </h2>
                <p className="text-sm text-slate-500">
                  How can the community or authorities reach you with leads?
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">
                  Contact Phone
                </label>
                <input
                  type="tel"
                  name="contactPhone"
                  required
                  value={formData.contactPhone}
                  onChange={handleChange}
                  className="block w-full rounded-xl border border-slate-200 py-3.5 px-4 text-slate-900 shadow-sm placeholder:text-slate-400 focus:ring-2 focus:ring-rose-500 focus:border-transparent bg-slate-50 focus:bg-white transition-all sm:text-sm font-medium"
                  placeholder="(555) 000-0000"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">
                  Contact Email
                </label>
                <input
                  type="email"
                  name="contactEmail"
                  required
                  value={formData.contactEmail}
                  onChange={handleChange}
                  className="block w-full rounded-xl border border-slate-200 py-3.5 px-4 text-slate-900 shadow-sm placeholder:text-slate-400 focus:ring-2 focus:ring-rose-500 focus:border-transparent bg-slate-50 focus:bg-white transition-all sm:text-sm font-medium"
                  placeholder="you@example.com"
                />
              </div>
            </div>
          </div>

          {/* Submit Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-end gap-4 pt-6">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="w-full sm:w-auto px-8 py-4 text-sm font-bold text-slate-600 hover:text-slate-900 hover:bg-slate-200/50 rounded-2xl transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="w-full sm:w-auto inline-flex justify-center items-center gap-2 rounded-2xl bg-blue-600 px-10 py-4 text-base font-bold text-white shadow-lg shadow-blue-600/30 hover:bg-blue-700 hover:shadow-blue-600/40 hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none transition-all duration-300"
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Publishing Alert...
                </>
              ) : (
                <>
                  Publish Alert to Network
                  <Send className="h-5 w-5 ml-1" />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReportForm;
