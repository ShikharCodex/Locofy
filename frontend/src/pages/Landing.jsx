import { Link } from "react-router-dom";
import {
  Search,
  MapPin,
  ShieldAlert,
  Users,
  ArrowRight,
  BellRing,
  HeartHandshake,
  Clock,
} from "lucide-react";

const Landing = () => {
  return (
    <div className="bg-white text-slate-900 font-sans selection:bg-blue-100 selection:text-blue-900">
      {/* 1. Hero Section */}
      <div className="relative pt-24 pb-20 lg:pt-32 lg:pb-28 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[50rem] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-50 via-white to-white -z-10"></div>
        <div className="mx-auto max-w-5xl px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-700 text-sm font-semibold mb-8 ring-1 ring-blue-200/50">
            <BellRing className="w-4 h-4 text-blue-600" />
            Active Community Search Network
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 mb-8 leading-tight">
            Together, We Can Bring Every Missing<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              Persons Home.
            </span>
          </h1>

          <p className="mt-6 text-xl leading-relaxed text-slate-600 max-w-2xl mx-auto">
            A rapid-response platform dedicated to finding lost individuals.
            Alert the community instantly or browse our database to help reunite
            families when every second counts.
          </p>

          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/report"
              className="w-full sm:w-auto rounded-full bg-blue-600 px-8 py-4 text-base font-semibold text-white shadow-lg hover:bg-blue-700 hover:-translate-y-0.5 transition-all duration-300"
            >
              Report a Missing Person
            </Link>
            <Link
              to="/finder"
              className="group w-full sm:w-auto rounded-full bg-white px-8 py-4 text-base font-semibold text-slate-700 shadow-sm ring-1 ring-slate-200 hover:bg-slate-50 hover:ring-slate-300 transition-all duration-300 flex items-center justify-center gap-2"
            >
              Search Database{" "}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>

      {/* 2. Trust / Impact Banner */}
      <div className="border-y border-slate-100 bg-slate-50/50 py-12">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-slate-200">
            <div className="flex flex-col items-center">
              <Clock className="w-6 h-6 text-blue-600 mb-3" />
              <span className="font-bold text-slate-900 text-lg">Instant</span>
              <span className="text-sm text-slate-500">Email Alerts</span>
            </div>
            <div className="flex flex-col items-center">
              <Users className="w-6 h-6 text-blue-600 mb-3" />
              <span className="font-bold text-slate-900 text-lg">
                Community
              </span>
              <span className="text-sm text-slate-500">Driven Network</span>
            </div>
            <div className="flex flex-col items-center">
              <MapPin className="w-6 h-6 text-blue-600 mb-3" />
              <span className="font-bold text-slate-900 text-lg">Precise</span>
              <span className="text-sm text-slate-500">Location Tracking</span>
            </div>
            <div className="flex flex-col items-center">
              <HeartHandshake className="w-6 h-6 text-blue-600 mb-3" />
              <span className="font-bold text-slate-900 text-lg">Secure</span>
              <span className="text-sm text-slate-500">Direct Comms</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. How It Works Section */}
      <div className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-blue-600 font-semibold tracking-wide uppercase text-sm mb-3">
              The Process
            </h2>
            <h3 className="text-3xl md:text-4xl font-bold text-slate-900">
              How you can make a difference
            </h3>
          </div>

          <div className="grid md:grid-cols-3 gap-12 relative">
            {/* Connecting Line */}
            <div className="hidden md:block absolute top-12 left-1/6 right-1/6 h-0.5 bg-slate-100 -z-10"></div>

            <div className="text-center bg-white">
              <div className="w-24 h-24 mx-auto bg-blue-50 rounded-full flex items-center justify-center mb-6 ring-8 ring-white">
                <ShieldAlert className="w-10 h-10 text-blue-600" />
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-3">
                1. Submit a Report
              </h4>
              <p className="text-slate-600 leading-relaxed">
                Upload recent photos, physical descriptions, and the exact
                location they were last seen.
              </p>
            </div>

            <div className="text-center bg-white">
              <div className="w-24 h-24 mx-auto bg-blue-50 rounded-full flex items-center justify-center mb-6 ring-8 ring-white">
                <BellRing className="w-10 h-10 text-blue-600" />
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-3">
                2. Network Alerted
              </h4>
              <p className="text-slate-600 leading-relaxed">
                Our system immediately notifies local volunteers and users in
                the surrounding area.
              </p>
            </div>

            <div className="text-center bg-white">
              <div className="w-24 h-24 mx-auto bg-blue-50 rounded-full flex items-center justify-center mb-6 ring-8 ring-white">
                <HeartHandshake className="w-10 h-10 text-blue-600" />
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-3">
                3. Safe Reunion
              </h4>
              <p className="text-slate-600 leading-relaxed">
                Community members send leads directly to you, streamlining the
                search and recovery effort.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Core Benefits Section */}
      <div className="py-24 bg-slate-50 rounded-[3rem] mx-4 lg:mx-8 mb-8">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="max-w-2xl mb-16">
            <h2 className="text-blue-600 font-semibold tracking-wide uppercase text-sm mb-3">
              Platform Features
            </h2>
            <h3 className="text-3xl md:text-4xl font-bold text-slate-900">
              Equipped for rapid response
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
              <ShieldAlert className="h-8 w-8 text-blue-600 mb-6" />
              <h4 className="text-xl font-bold text-slate-900 mb-3">
                Instant Community Alerts
              </h4>
              <p className="text-slate-600 leading-relaxed">
                As soon as you report a missing person, our system automatically
                emails everyone in our network so they can keep an eye out
                immediately.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
              <Search className="h-8 w-8 text-blue-600 mb-6" />
              <h4 className="text-xl font-bold text-slate-900 mb-3">
                Advanced Image & Search
              </h4>
              <p className="text-slate-600 leading-relaxed">
                Upload high-quality images and allow the community to search by
                location, age, gender, and descriptions seamlessly.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
              <MapPin className="h-8 w-8 text-blue-600 mb-6" />
              <h4 className="text-xl font-bold text-slate-900 mb-3">
                Last Seen Tracking
              </h4>
              <p className="text-slate-600 leading-relaxed">
                Precise location and date markers help build a timeline for
                search parties in local areas.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
              <Users className="h-8 w-8 text-blue-600 mb-6" />
              <h4 className="text-xl font-bold text-slate-900 mb-3">
                Direct Communication
              </h4>
              <p className="text-slate-600 leading-relaxed">
                Send leads directly to the reporter via the provided contact
                information to streamline recovery efforts.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 5. Bottom CTA Section */}
      <div className="py-24 relative overflow-hidden">
        <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
            Ready to help the community?
          </h2>
          <p className="text-lg text-slate-600 mb-10 max-w-2xl mx-auto">
            Whether you need to report a missing loved one or want to assist in
            local searches, your participation matters.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/report"
              className="rounded-full bg-slate-900 px-8 py-4 text-base font-semibold text-white shadow-lg hover:bg-slate-800 transition-colors"
            >
              Submit a Report Now
            </Link>
            <Link
              to="/finder"
              className="rounded-full bg-blue-50 px-8 py-4 text-base font-semibold text-blue-700 hover:bg-blue-100 transition-colors"
            >
              View Active Cases
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
