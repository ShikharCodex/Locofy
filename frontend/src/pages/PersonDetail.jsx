import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../services/api";
import { format } from "date-fns";
import {
  Mail,
  Phone,
  MapPin,
  Calendar,
  Activity,
  AlertCircle,
  ArrowLeft,
  User,
  Ruler,
  Scale,
  FileText,
  Clock,
  Printer,
} from "lucide-react";

const PersonDetail = () => {
  const { id } = useParams();
  const [person, setPerson] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPerson = async () => {
      try {
        const { data } = await api.get(`/persons/${id}`);
        setPerson(data);
      } catch (error) {
        console.error("Error fetching person detail:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPerson();
  }, [id]);

  // Handle the print action
  const handlePrint = () => {
    window.print();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse flex items-center gap-2 mb-8 w-40 h-10 bg-slate-200 rounded-full"></div>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-5 h-[600px] sm:h-[700px] bg-slate-200 rounded-[2.5rem] animate-pulse"></div>
            <div className="lg:col-span-7 space-y-8 mt-4">
              <div className="h-14 bg-slate-200 w-3/4 rounded-2xl animate-pulse"></div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="h-28 bg-slate-200 rounded-2xl animate-pulse"
                  ></div>
                ))}
              </div>
              <div className="h-48 bg-slate-200 rounded-[2rem] animate-pulse"></div>
              <div className="h-64 bg-slate-200 rounded-[2rem] animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!person) {
    return (
      <div className="min-h-[calc(100vh-80px)] bg-slate-50 flex items-center justify-center p-6">
        <div className="text-center bg-white p-10 sm:p-12 rounded-[3rem] shadow-sm border border-slate-100 max-w-lg w-full">
          <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 ring-1 ring-slate-100">
            <AlertCircle className="h-12 w-12 text-slate-400" />
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900 mb-3">
            Record Not Found
          </h2>
          <p className="text-slate-500 mb-8 leading-relaxed">
            The case file you are looking for may have been removed, resolved,
            or the URL is incorrect.
          </p>
          <Link
            to="/finder"
            className="inline-flex items-center justify-center px-8 py-4 text-sm font-bold text-white bg-slate-900 hover:bg-blue-600 rounded-2xl transition-colors shadow-lg w-full sm:w-auto"
          >
            Return to Active Database
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] print:bg-white font-sans selection:bg-blue-100 selection:text-blue-900 pb-24 print:pb-0">
      {/* PRINT ONLY HEADER 
        This transforms the page into a "MISSING" poster when printed 
      */}
      <div className="hidden print:block text-center pt-8 mb-8">
        <h1 className="text-7xl font-black uppercase text-black tracking-widest border-b-8 border-black pb-6">
          Missing Person
        </h1>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12 print:p-0 print:m-0 print:max-w-none">
        {/* Screen Navigation & Actions (Hidden on Print) */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 print:hidden">
          <Link
            to="/finder"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors bg-white hover:bg-slate-50 px-5 py-2.5 rounded-full shadow-sm border border-slate-200"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Database
          </Link>

          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 px-5 py-2.5 rounded-full transition-colors focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            <Printer className="h-4 w-4" />
            Print Flyer
          </button>
        </div>

        {/* Main Grid: Split on screen, single column flow on print */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 print:block">
          {/* Left Column: Sticky Image Container */}
          <div className="lg:col-span-5 relative print:mb-10">
            <div className="sticky top-28 print:static">
              {/* Image Box */}
              <div className="relative w-full aspect-[3/4] sm:aspect-square lg:aspect-[3/4] rounded-[2.5rem] overflow-hidden bg-slate-100 shadow-2xl shadow-slate-200/60 border border-slate-100 print:shadow-none print:border-8 print:border-black print:rounded-none print:aspect-auto print:flex print:justify-center">
                {person.imageUrl ? (
                  <img
                    className="h-full w-full object-cover print:h-auto print:max-h-[600px] print:object-contain print:w-auto"
                    src={person.imageUrl}
                    alt={`Photograph of ${person.name}`}
                    crossOrigin="anonymous"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-slate-400 bg-slate-50 py-32 print:py-20">
                    <User className="h-20 w-20 mb-4 opacity-30 print:opacity-100 print:text-black" />
                    <span className="font-semibold print:text-black">
                      No photograph provided
                    </span>
                  </div>
                )}

                {/* Cinematic Overlays (Hidden on Print) */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-slate-900/10 to-transparent pointer-events-none print:hidden"></div>
                <div className="absolute top-6 left-6 bg-white/95 backdrop-blur-md px-4 py-2 rounded-full flex items-center gap-2.5 shadow-lg border border-white/20 print:hidden">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
                  </span>
                  <span className="text-sm font-black text-slate-900 uppercase tracking-widest">
                    Active Case
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Case Information */}
          <div className="lg:col-span-7 print:block">
            {/* Subject Header */}
            <div className="mb-8 lg:mb-10 pt-4 print:text-center print:pt-0">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight mb-4 leading-tight print:text-6xl print:text-black print:uppercase">
                {person.name}
              </h1>
              <div className="flex flex-wrap items-center gap-3 text-sm font-semibold text-slate-500 bg-white px-4 py-2 w-max rounded-xl border border-slate-200 shadow-sm print:hidden">
                <Clock className="w-4 h-4 text-blue-500" />
                Report logged on{" "}
                {format(new Date(person.createdAt), "MMMM d, yyyy")}
              </div>
            </div>

            {/* Vitals Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8 lg:mb-10 print:grid-cols-4 print:gap-2 print:border-y-8 print:border-black print:py-6 print:mb-8">
              <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm print:shadow-none print:border-0 print:p-2 print:text-center">
                <div className="text-blue-500 mb-2 bg-blue-50 w-max p-2 rounded-xl print:hidden">
                  <Activity className="w-5 h-5" />
                </div>
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-0.5 print:text-black print:text-lg">
                  Age
                </div>
                <div className="text-xl font-black text-slate-900 print:text-black print:text-2xl">
                  {person.age}
                </div>
              </div>
              <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm print:shadow-none print:border-0 print:p-2 print:text-center">
                <div className="text-indigo-500 mb-2 bg-indigo-50 w-max p-2 rounded-xl print:hidden">
                  <User className="w-5 h-5" />
                </div>
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-0.5 print:text-black print:text-lg">
                  Gender
                </div>
                <div className="text-xl font-black text-slate-900 print:text-black print:text-2xl">
                  {person.gender}
                </div>
              </div>
              <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm print:shadow-none print:border-0 print:p-2 print:text-center">
                <div className="text-emerald-500 mb-2 bg-emerald-50 w-max p-2 rounded-xl print:hidden">
                  <Ruler className="w-5 h-5" />
                </div>
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-0.5 print:text-black print:text-lg">
                  Height
                </div>
                <div className="text-xl font-black text-slate-900 print:text-black print:text-2xl">
                  {person.height || "N/A"}
                </div>
              </div>
              <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm print:shadow-none print:border-0 print:p-2 print:text-center">
                <div className="text-rose-500 mb-2 bg-rose-50 w-max p-2 rounded-xl print:hidden">
                  <Scale className="w-5 h-5" />
                </div>
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-0.5 print:text-black print:text-lg">
                  Weight
                </div>
                <div className="text-xl font-black text-slate-900 print:text-black print:text-2xl">
                  {person.weight || "N/A"}
                </div>
              </div>
            </div>

            {/* Last Known Whereabouts */}
            <div className="bg-amber-50/80 border border-amber-200 p-6 sm:p-8 rounded-[2rem] mb-8 relative overflow-hidden print:bg-white print:border-4 print:border-black print:rounded-none print:p-6 print:mb-8">
              <div className="absolute -right-6 -top-6 text-amber-500/10 print:hidden">
                <MapPin className="w-48 h-48" />
              </div>
              <div className="relative z-10">
                <h2 className="text-xl font-black text-amber-900 mb-6 flex items-center gap-3 print:text-black print:text-2xl print:mb-4">
                  <MapPin className="w-6 h-6 text-amber-600 print:hidden" />
                  LAST KNOWN WHEREABOUTS
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
                  <div>
                    <div className="text-sm font-bold text-amber-700/70 mb-2 uppercase tracking-wide print:text-black print:text-base">
                      Location
                    </div>
                    <div className="text-lg font-bold text-amber-950 leading-relaxed print:text-black print:text-xl">
                      {person.lastSeenLocation}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm font-bold text-amber-700/70 mb-2 uppercase tracking-wide print:text-black print:text-base">
                      Date
                    </div>
                    <div className="text-lg font-bold text-amber-950 flex items-center gap-2 print:text-black print:text-xl">
                      <Calendar className="w-5 h-5 text-amber-600 print:hidden" />
                      {format(new Date(person.lastSeenDate), "PPPP")}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Descriptions & Notes */}
            <div className="bg-white border border-slate-100 p-6 sm:p-8 rounded-[2rem] shadow-sm mb-10 print:border-4 print:border-black print:rounded-none print:shadow-none print:p-6 print:mb-8">
              <h2 className="text-xl font-black text-slate-900 mb-6 sm:mb-8 flex items-center gap-3 print:text-black print:text-2xl print:mb-4 uppercase">
                <FileText className="w-6 h-6 text-slate-400 print:hidden" />
                Physical Description & Notes
              </h2>
              <div className="space-y-6 sm:space-y-8">
                <div>
                  <h3 className="text-sm font-bold text-slate-900 mb-3 uppercase tracking-wide print:text-black print:text-base">
                    Clothing & Accessories
                  </h3>
                  {person.clothingDescription ? (
                    <p className="text-slate-700 leading-relaxed bg-slate-50 p-4 sm:p-5 rounded-2xl border border-slate-100 text-base print:bg-white print:border-0 print:p-0 print:text-black print:text-lg">
                      {person.clothingDescription}
                    </p>
                  ) : (
                    <p className="text-slate-400 italic print:text-black">
                      No clothing description provided.
                    </p>
                  )}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 mb-3 uppercase tracking-wide print:text-black print:text-base">
                    Additional / Medical Notes
                  </h3>
                  {person.additionalNotes ? (
                    <p className="text-slate-700 leading-relaxed bg-slate-50 p-4 sm:p-5 rounded-2xl border border-slate-100 text-base print:bg-white print:border-0 print:p-0 print:text-black print:text-lg">
                      {person.additionalNotes}
                    </p>
                  ) : (
                    <p className="text-slate-400 italic print:text-black">
                      No additional identifying features were provided.
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Dark CTA Action Block (Screen Only) */}
            <div className="bg-slate-950 rounded-[2.5rem] p-6 sm:p-10 shadow-2xl shadow-slate-900/20 relative overflow-hidden print:hidden">
              <div className="absolute top-0 right-0 w-80 h-80 bg-blue-600/20 rounded-full blur-[100px] pointer-events-none"></div>

              <div className="relative z-10">
                <h2 className="text-2xl sm:text-3xl font-black text-white flex items-center gap-3 mb-4">
                  <AlertCircle className="h-7 w-7 sm:h-8 sm:w-8 text-blue-500" />
                  Have you seen them?
                </h2>
                <p className="text-slate-300 mb-8 max-w-xl text-base sm:text-lg leading-relaxed">
                  If you have any information regarding {person.name}'s
                  whereabouts, please contact the reporter directly. Every
                  second counts.
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href={`tel:${person.contactPhone}`}
                    className="flex-1 inline-flex justify-center items-center gap-3 rounded-2xl bg-blue-600 px-6 py-4 sm:py-5 text-base sm:text-lg font-bold text-white shadow-lg hover:bg-blue-500 hover:-translate-y-1 transition-all duration-300"
                  >
                    <Phone className="h-5 w-5 sm:h-6 sm:w-6" />
                    {person.contactPhone}
                  </a>
                  <a
                    href={`mailto:${person.contactEmail}`}
                    className="flex-1 inline-flex justify-center items-center gap-3 rounded-2xl bg-white/5 hover:bg-white/10 px-6 py-4 sm:py-5 text-base sm:text-lg font-bold text-white backdrop-blur-sm border border-white/10 transition-all duration-300 break-all"
                  >
                    <Mail className="h-5 w-5 sm:h-6 sm:w-6 flex-shrink-0" />
                    <span className="truncate">Email Reporter</span>
                  </a>
                </div>

                <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <p className="text-sm font-medium text-slate-400">
                    Reported by:{" "}
                    <span className="text-white font-bold">
                      {person.reporterId?.name || "Anonymous User"}
                    </span>
                  </p>
                  <p className="text-sm font-medium text-slate-500 truncate">
                    ID: {person._id}
                  </p>
                </div>
              </div>
            </div>

            {/* Print Only Action Block (Replaces the Dark CTA when printing) */}
            <div className="hidden print:block border-8 border-black p-8 text-center mt-8">
              <h2 className="text-4xl font-black uppercase tracking-widest mb-6">
                If You Have Information
              </h2>
              <div className="text-3xl font-bold mb-4 flex items-center justify-center gap-4">
                <span>Call:</span>
                <span className="underline">{person.contactPhone}</span>
              </div>
              <div className="text-2xl font-bold flex items-center justify-center gap-4">
                <span>Email:</span>
                <span className="underline">{person.contactEmail}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonDetail;
