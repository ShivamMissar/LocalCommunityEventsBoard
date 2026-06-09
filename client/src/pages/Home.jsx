import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function Home() {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchEvents() {
      try {
        const response = await axios.get("http://localhost:5000/events");
        setEvents(response.data);
      } catch (err) {
        console.error(err);
      }
    }
    fetchEvents();
  }, []);

  return (
    <div className="min-h-screen" style={{ background: "#fff5f7" }}>
      <Navbar />

      {/* Hero */}
      <div
        className="text-center py-28 px-6"
        style={{
          background:
            "linear-gradient(135deg, #f953c6 0%, #b91d73 50%, #f9a825 100%)",
        }}
      >
        <h1 className="text-6xl font-extrabold text-white mb-4 leading-tight">
          Your neighbourhood,<br />alive.
        </h1>
        <p className="text-white/80 text-xl mb-10 max-w-xl mx-auto">
          Discover, create and join events happening right on your doorstep.
        </p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={() => navigate("/register")}
            className="bg-white text-pink-600 font-bold px-8 py-3 rounded-full hover:opacity-90 transition-all shadow-lg"
          >
            Get Started Free
          </button>
          <button
            onClick={() => navigate("/events")}
            className="border-2 border-white text-white font-bold px-8 py-3 rounded-full hover:bg-white hover:text-pink-600 transition-all"
          >
            Browse Events
          </button>
        </div>
      </div>

      {/* Features */}
      <div className="max-w-6xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-extrabold text-gray-800 text-center mb-4">
          Everything you need to connect
        </h2>
        <p className="text-center text-gray-400 mb-12">
          EventBoard makes it easy to find and host local events
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              emoji: "🎉",
              title: "Discover Events",
              desc: "Browse local events by category and date. Find something happening near you every weekend.",
            },
            {
              emoji: "📅",
              title: "Create & Manage",
              desc: "Host your own events in minutes. Edit details, track RSVPs and manage everything from your dashboard.",
            },
            {
              emoji: "🤝",
              title: "Connect with People",
              desc: "Meet your neighbours and build your community. RSVP to events and show up to real life.",
            },
          ].map((feature) => (
            <div
              key={feature.title}
              className="bg-white rounded-2xl p-8 shadow-md border-t-4 border-pink-400 text-center"
            >
              <span className="text-5xl">{feature.emoji}</span>
              <h3 className="text-xl font-bold text-gray-800 mt-4 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-400 text-sm">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* How it works */}
      <div
        className="py-20 px-6"
        style={{ background: "linear-gradient(135deg, #fff0fb, #fff5f7)" }}
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-extrabold text-gray-800 text-center mb-4">
            How it works
          </h2>
          <p className="text-center text-gray-400 mb-16">
            Up and running in three simple steps
          </p>

          {/* Step 1 */}
          <div className="flex flex-col md:flex-row items-center gap-12 mb-20">
            <div className="flex-1">
              <span className="text-xs font-bold text-pink-500 uppercase tracking-widest">
                Step 1
              </span>
              <h3 className="text-2xl font-extrabold text-gray-800 mt-2 mb-4">
                Create your free account
              </h3>
              <p className="text-gray-400">
                Sign up in seconds with just your name, email and password. No
                credit card needed. Your community is waiting.
              </p>
            </div>
            {/* Fake browser mockup */}
            <div className="flex-1">
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
                <div className="bg-gray-100 px-4 py-3 flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                  <div className="w-3 h-3 rounded-full bg-green-400"></div>
                  <div className="flex-1 bg-white rounded-full px-3 py-1 text-xs text-gray-400 ml-2">
                    eventboard.com/register
                  </div>
                </div>
                <div className="p-6" style={{ background: "linear-gradient(135deg, #f953c6 0%, #b91d73 50%, #f9a825 100%)" }}>
                  <div className="bg-white rounded-2xl p-6 max-w-sm mx-auto">
                    <h4 className="font-extrabold text-gray-800 text-lg mb-4 text-center">Create Account</h4>
                    <div className="flex flex-col gap-3">
                      <div className="bg-gray-50 rounded-xl px-4 py-2 text-sm text-gray-400 border border-gray-200">John Smith</div>
                      <div className="bg-gray-50 rounded-xl px-4 py-2 text-sm text-gray-400 border border-gray-200">john@example.com</div>
                      <div className="bg-gray-50 rounded-xl px-4 py-2 text-sm text-gray-400 border border-gray-200">••••••••</div>
                      <div className="rounded-xl py-2 text-sm text-white font-bold text-center" style={{ background: "linear-gradient(135deg, #f953c6, #b91d73)" }}>
                        Create Account
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="flex flex-col md:flex-row-reverse items-center gap-12 mb-20">
            <div className="flex-1">
              <span className="text-xs font-bold text-pink-500 uppercase tracking-widest">
                Step 2
              </span>
              <h3 className="text-2xl font-extrabold text-gray-800 mt-2 mb-4">
                Browse or create events
              </h3>
              <p className="text-gray-400">
                Find events near you or host your own in minutes. Add a title,
                location, date and description and you're live.
              </p>
            </div>
            {/* Fake browser mockup */}
            <div className="flex-1">
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
                <div className="bg-gray-100 px-4 py-3 flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                  <div className="w-3 h-3 rounded-full bg-green-400"></div>
                  <div className="flex-1 bg-white rounded-full px-3 py-1 text-xs text-gray-400 ml-2">
                    eventboard.com
                  </div>
                </div>
                <div className="p-4 bg-gray-50">
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { title: "Summer BBQ", cat: "Food", loc: "Central Park" },
                      { title: "Charity Run", cat: "Sport", loc: "Riverside" },
                      { title: "Jazz Night", cat: "Music", loc: "City Hall" },
                      { title: "Art Fair", cat: "Culture", loc: "Old Market" },
                    ].map((e) => (
                      <div key={e.title} className="bg-white rounded-xl p-3 shadow-sm border-t-2 border-pink-300">
                        <span className="text-xs bg-pink-100 text-pink-600 px-2 py-0.5 rounded-full font-semibold">{e.cat}</span>
                        <p className="font-bold text-gray-800 text-sm mt-1">{e.title}</p>
                        <p className="text-gray-400 text-xs">📍 {e.loc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1">
              <span className="text-xs font-bold text-pink-500 uppercase tracking-widest">
                Step 3
              </span>
              <h3 className="text-2xl font-extrabold text-gray-800 mt-2 mb-4">
                RSVP and show up
              </h3>
              <p className="text-gray-400">
                Found something you like? Hit RSVP and go enjoy your community.
                It really is that simple.
              </p>
            </div>
            {/* Fake browser mockup */}
            <div className="flex-1">
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
                <div className="bg-gray-100 px-4 py-3 flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                  <div className="w-3 h-3 rounded-full bg-green-400"></div>
                  <div className="flex-1 bg-white rounded-full px-3 py-1 text-xs text-gray-400 ml-2">
                    eventboard.com/events/1
                  </div>
                </div>
                <div className="p-6 bg-gray-50">
                  <div className="bg-white rounded-xl p-5 shadow-sm border-t-4 border-pink-400">
                    <span className="text-xs bg-pink-100 text-pink-600 px-2 py-0.5 rounded-full font-semibold">Food</span>
                    <h4 className="font-extrabold text-gray-800 text-lg mt-2">Summer BBQ 🍔</h4>
                    <p className="text-gray-400 text-xs mt-1">📍 Central Park</p>
                    <p className="text-gray-400 text-xs">📅 15 July 2026</p>
                    <p className="text-gray-500 text-sm mt-3">A fun community BBQ in the park. Everyone welcome!</p>
                    <div className="mt-4 py-2 rounded-xl text-sm text-white font-bold text-center" style={{ background: "linear-gradient(135deg, #f953c6, #b91d73)" }}>
                      RSVP to this event 🎉
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div
        className="text-center py-20 px-6"
        style={{
          background:
            "linear-gradient(135deg, #f953c6 0%, #b91d73 50%, #f9a825 100%)",
        }}
      >
        <h2 className="text-4xl font-extrabold text-white mb-4">
          Ready to get involved?
        </h2>
        <p className="text-white/80 text-lg mb-8">
          Join thousands of people already connecting in their local community.
        </p>
        <button
          onClick={() => navigate("/register")}
          className="bg-white text-pink-600 font-bold px-10 py-4 rounded-full hover:opacity-90 transition-all shadow-lg text-lg"
        >
          Join EventBoard Free →
        </button>
      </div>

      {/* Upcoming Events */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Upcoming Events
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {events.map((event) => (
            <div
              key={event.id}
              className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition-all cursor-pointer border-t-4 border-pink-400"
              onClick={() => navigate(`/events/${event.id}`)}
            >
              <span className="text-xs font-semibold bg-pink-100 text-pink-600 px-3 py-1 rounded-full">
                {event.category}
              </span>
              <h2 className="text-lg font-bold text-gray-800 mt-3">
                {event.title}
              </h2>
              <p className="text-gray-400 text-sm mt-1">📍 {event.location}</p>
              <p className="text-gray-400 text-sm">
                📅{" "}
                {new Date(event.date).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>
              <p className="text-gray-600 text-sm mt-3 line-clamp-2">
                {event.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="text-center py-8 text-gray-400 text-sm border-t border-gray-100">
        © 2026 EventBoard — Built with ❤️ for local communities
      </div>
    </div>
  );
}

export default Home;