import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import {
  Search,
  MapPin,
  Calendar,
  Image as ImageIcon,
  UserSearch,
  ArrowRight,
  Clock,
  ChevronRight,
} from "lucide-react";
import { format } from "date-fns";

const Finder = () => {
  const [persons, setPersons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [locationTerm, setLocationTerm] = useState("");

  const fetchPersons = async () => {
    setLoading(true);
    try {
      const { data } = await api.get(
        `/persons?search=${searchTerm}&location=${locationTerm}`,
      );
      setPersons(data);
    } catch (error) {
      console.error("Error fetching persons:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPersons();
    // eslint-disable-next-line
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchPersons();
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans selection:bg-blue-100 selection:text-blue-900 pb-24">
      {/* Hero Header Section */}
      <div className="bg-slate-950 pt-20 pb-36 relative overflow-hidden">
        {/* Subtle animated background mesh */}
        <div className="absolute inset-0 z-0 opacity-40">
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-600/30 rounded-full blur-[100px]"></div>
          <div className="absolute top-1/2 right-0 w-96 h-96 bg-indigo-500/20 rounded-full blur-[100px]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center text-center">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-6 backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            Live Community Database
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight mb-6">
            Help Bring Them Home
          </h1>
          <p className="text-slate-400 max-w-2xl text-lg md:text-xl leading-relaxed">
            Search our active database of missing persons. Every piece of
            information, no matter how small, can help reunite a family.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-20">
        {/* Unified Command Search Bar */}
        <div className="bg-white p-2.5 rounded-3xl shadow-2xl shadow-slate-200/50 border border-slate-100 mb-16 max-w-5xl mx-auto">
          <form
            onSubmit={handleSearch}
            className="flex flex-col md:flex-row gap-2"
          >
            <div className="flex-1 relative flex items-center bg-slate-50 hover:bg-slate-100/50 rounded-2xl px-5 py-2 transition-colors focus-within:bg-white focus-within:ring-2 focus-within:ring-blue-100">
              <Search className="h-5 w-5 text-slate-400 flex-shrink-0" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by name, age, or appearance..."
                className="block w-full border-0 bg-transparent py-3 pl-3 text-slate-900 placeholder:text-slate-400 focus:ring-0 sm:text-base font-medium"
              />
            </div>

            <div className="hidden md:block w-px bg-slate-200 my-3"></div>

            <div className="flex-1 relative flex items-center bg-slate-50 hover:bg-slate-100/50 rounded-2xl px-5 py-2 transition-colors focus-within:bg-white focus-within:ring-2 focus-within:ring-blue-100">
              <MapPin className="h-5 w-5 text-slate-400 flex-shrink-0" />
              <input
                type="text"
                value={locationTerm}
                onChange={(e) => setLocationTerm(e.target.value)}
                placeholder="City, state, or zip code..."
                className="block w-full border-0 bg-transparent py-3 pl-3 text-slate-900 placeholder:text-slate-400 focus:ring-0 sm:text-base font-medium"
              />
            </div>

            <button
              type="submit"
              className="mt-2 md:mt-0 w-full md:w-auto inline-flex justify-center items-center gap-2 rounded-2xl bg-slate-900 px-10 py-4 text-base font-semibold text-white shadow-lg shadow-slate-900/20 hover:bg-blue-600 hover:shadow-blue-600/25 hover:-translate-y-0.5 transition-all duration-300"
            >
              Search
              <ArrowRight className="w-5 h-5" />
            </button>
          </form>
        </div>

        {/* Results Area */}
        {loading ? (
          // Glassmorphism Skeleton Loader
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div
                key={i}
                className="rounded-[2rem] bg-white p-3 shadow-sm border border-slate-100"
              >
                <div className="w-full aspect-[4/5] bg-slate-100 rounded-[1.5rem] mb-5 animate-pulse"></div>
                <div className="px-3 pb-3 space-y-4">
                  <div className="h-5 bg-slate-100 rounded-full w-2/3 animate-pulse"></div>
                  <div className="space-y-2">
                    <div className="h-3 bg-slate-50 rounded-full w-full animate-pulse"></div>
                    <div className="h-3 bg-slate-50 rounded-full w-4/5 animate-pulse"></div>
                  </div>
                  <div className="pt-2 flex justify-between">
                    <div className="h-4 bg-slate-100 rounded-full w-1/3 animate-pulse"></div>
                    <div className="h-4 bg-slate-100 rounded-full w-1/4 animate-pulse"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : persons.length === 0 ? (
          // Empathetic Empty State
          <div className="text-center py-20 bg-white rounded-[3rem] border border-slate-100 shadow-sm max-w-3xl mx-auto">
            <div className="mx-auto w-24 h-24 bg-slate-50 rounded-3xl flex items-center justify-center mb-6 ring-1 ring-slate-100">
              <UserSearch className="h-10 w-10 text-slate-400" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-3">
              No matching records
            </h3>
            <p className="text-slate-500 max-w-md mx-auto text-base leading-relaxed">
              We couldn't find anyone matching your current search criteria. Try
              adjusting your filters or search terms to broaden the results.
            </p>
            <button
              onClick={() => {
                setSearchTerm("");
                setLocationTerm("");
                fetchPersons();
              }}
              className="mt-8 inline-flex items-center gap-2 text-slate-900 font-semibold bg-slate-100 hover:bg-slate-200 px-6 py-3 rounded-full transition-colors"
            >
              Clear all filters
            </button>
          </div>
        ) : (
          // Premium Case Cards Grid
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {persons.map((person) => (
              <Link
                key={person._id}
                to={`/person/${person._id}`}
                className="group flex flex-col rounded-[2.5rem] bg-white p-3 shadow-sm border border-slate-100 hover:shadow-2xl hover:shadow-slate-200/50 hover:border-blue-100 transition-all duration-500 hover:-translate-y-1.5"
              >
                {/* Image Container with Cinematic Gradient */}
                <div className="relative w-full aspect-[4/5] rounded-[2rem] overflow-hidden bg-slate-50 mb-5">
                  {person.imageUrl ? (
                    <img
                      src={person.imageUrl}
                      alt={person.name}
                      className="absolute inset-0 h-full w-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-slate-100">
                      <ImageIcon className="h-12 w-12 text-slate-300" />
                    </div>
                  )}

                  {/* Heavy Bottom Gradient for Text Contrast */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent opacity-80"></div>

                  {/* Floating Status Badge */}
                  <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-full flex items-center gap-2 shadow-sm">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                    </span>
                    <span className="text-xs font-bold text-slate-900 uppercase tracking-widest">
                      Missing
                    </span>
                  </div>

                  {/* Overlaid Basic Info */}
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <h3 className="text-2xl font-bold leading-tight mb-1 group-hover:text-blue-300 transition-colors">
                      {person.name}
                      {person.age ? `, ${person.age}` : ""}
                    </h3>
                    <div className="flex items-center gap-1.5 text-sm font-medium text-slate-300">
                      <MapPin className="h-4 w-4" />
                      <span className="truncate">
                        {person.lastSeenLocation}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Lower Card Information */}
                <div className="px-4 pb-4 flex-1 flex flex-col">
                  <p className="text-sm text-slate-600 line-clamp-2 mb-5 flex-1 leading-relaxed">
                    {person.additionalNotes ||
                      person.clothingDescription ||
                      "No additional descriptive details provided for this case."}
                  </p>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 bg-slate-50 px-3 py-1.5 rounded-lg">
                      <Clock className="h-3.5 w-3.5 text-blue-500" />
                      {format(new Date(person.lastSeenDate), "MMM d, yyyy")}
                    </div>

                    <div className="text-blue-600 text-sm font-bold flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -translate-x-2 group-hover:translate-x-0 transform">
                      View File <ChevronRight className="h-4 w-4" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Finder;
