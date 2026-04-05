import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import { format } from "date-fns";
import {
  Trash2,
  Eye,
  Plus,
  Inbox,
  MapPin,
  Calendar,
  Activity,
  FileText,
  AlertCircle,
} from "lucide-react";

const Dashboard = () => {
  const [persons, setPersons] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUserPersons = async () => {
    try {
      const { data } = await api.get("/persons/user");
      setPersons(data);
    } catch (error) {
      console.error("Error fetching dashboard records:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserPersons();
  }, []);

  const handleDelete = async (id) => {
    if (
      window.confirm(
        "Are you sure you want to delete this report? This action cannot be undone.",
      )
    ) {
      try {
        await api.delete(`/persons/${id}`);
        setPersons(persons.filter((p) => p._id !== id));
      } catch (error) {
        console.error("Failed to delete person:", error);
      }
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] bg-slate-50/50 py-8 lg:py-12 font-sans selection:bg-blue-100 selection:text-blue-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Dashboard Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-10">
          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Command Center
            </h1>
            <p className="mt-2 text-base text-slate-500 max-w-xl">
              Manage your submitted missing person reports, track community
              engagement, and update statuses in real-time.
            </p>
          </div>
          <Link
            to="/report"
            className="group inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-slate-200 hover:bg-blue-600 hover:shadow-blue-200 transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900"
          >
            <Plus className="h-5 w-5 group-hover:rotate-90 transition-transform duration-300" />
            Submit New Report
          </Link>
        </div>

        {/* Analytics Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
          <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
              <FileText className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">
                Total Reports
              </p>
              <p className="text-2xl font-bold text-slate-900">
                {loading ? "-" : persons.length}
              </p>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-amber-50 flex items-center justify-center text-amber-600">
              <Activity className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">
                Active Searches
              </p>
              <p className="text-2xl font-bold text-slate-900">
                {loading ? "-" : persons.length}
              </p>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600">
              <AlertCircle className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">
                Network Status
              </p>
              <p className="text-lg font-bold text-emerald-600">
                Online & Alert
              </p>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
          {/* Section Header */}
          <div className="border-b border-slate-100 px-6 py-5 bg-slate-50/50 flex justify-between items-center">
            <h2 className="text-lg font-semibold text-slate-800">
              Active Case Files
            </h2>
          </div>

          {loading ? (
            // Premium Skeleton Loader
            <div className="p-6 space-y-4">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 p-4 rounded-2xl border border-slate-100 animate-pulse"
                >
                  <div className="h-16 w-16 bg-slate-200 rounded-xl"></div>
                  <div className="flex-1 space-y-3">
                    <div className="h-4 bg-slate-200 rounded w-1/4"></div>
                    <div className="h-3 bg-slate-100 rounded w-1/3"></div>
                  </div>
                  <div className="h-8 w-24 bg-slate-100 rounded-lg"></div>
                </div>
              ))}
            </div>
          ) : persons.length === 0 ? (
            // Beautiful Empty State
            <div className="flex flex-col items-center justify-center p-20 text-center">
              <div className="relative mb-6">
                <div className="absolute inset-0 bg-blue-100 blur-xl rounded-full opacity-50"></div>
                <div className="relative h-24 w-24 bg-white rounded-full flex items-center justify-center shadow-sm border border-slate-100">
                  <Inbox className="h-10 w-10 text-blue-500" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                No active reports
              </h3>
              <p className="text-slate-500 max-w-sm mx-auto mb-8 leading-relaxed">
                You haven't submitted any missing person cases. The community is
                ready to help when you need it.
              </p>
              <Link
                to="/report"
                className="inline-flex items-center gap-2 rounded-xl bg-blue-50 px-6 py-3 text-sm font-semibold text-blue-700 hover:bg-blue-100 transition-colors"
              >
                Create your first report
              </Link>
            </div>
          ) : (
            // Modern Data Cards (Replaces traditional table)
            <div className="p-4 sm:p-6 grid gap-4">
              {persons.map((person) => (
                <div
                  key={person._id}
                  className="group flex flex-col sm:flex-row sm:items-center justify-between gap-6 p-5 rounded-2xl border border-slate-100 hover:border-blue-200 hover:shadow-md hover:shadow-blue-50 transition-all duration-300 bg-white"
                >
                  {/* Profile Info */}
                  <div className="flex items-center gap-5">
                    <div className="relative">
                      {person.imageUrl ? (
                        <img
                          className="h-16 w-16 rounded-2xl object-cover shadow-sm ring-1 ring-slate-900/5"
                          src={person.imageUrl}
                          alt={person.name}
                        />
                      ) : (
                        <div className="h-16 w-16 rounded-2xl bg-slate-100 flex items-center justify-center border border-slate-200">
                          <span className="text-xs font-medium text-slate-400">
                            No Img
                          </span>
                        </div>
                      )}
                      <div
                        className="absolute -bottom-1 -right-1 h-4 w-4 bg-amber-500 rounded-full border-2 border-white"
                        title="Active Search"
                      ></div>
                    </div>

                    <div>
                      <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                        {person.name}
                      </h3>
                      <div className="flex flex-wrap items-center gap-3 mt-1.5 text-sm text-slate-500">
                        <span className="flex items-center gap-1.5">
                          <MapPin className="h-4 w-4 text-slate-400" />
                          {person.lastSeenLocation}
                        </span>
                        <span className="hidden sm:inline text-slate-300">
                          •
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Calendar className="h-4 w-4 text-slate-400" />
                          {format(new Date(person.createdAt), "MMM d, yyyy")}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-3 sm:pl-4 sm:border-l border-slate-100 pt-4 sm:pt-0 border-t sm:border-t-0">
                    <Link
                      to={`/person/${person._id}`}
                      className="flex-1 sm:flex-none inline-flex justify-center items-center gap-2 px-4 py-2 text-sm font-semibold text-slate-700 bg-slate-50 hover:bg-blue-50 hover:text-blue-700 rounded-xl transition-colors border border-slate-200 hover:border-blue-200"
                    >
                      <Eye className="h-4 w-4" />
                      View File
                    </Link>
                    <button
                      onClick={() => handleDelete(person._id)}
                      className="inline-flex justify-center items-center p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors border border-transparent hover:border-red-100"
                      title="Delete Report"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
