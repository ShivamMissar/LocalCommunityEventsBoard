import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function getCategoryGradient(category) {
  if (category === '#Food' || category === 'Food') return 'linear-gradient(135deg, #f953c6, #b91d73)';
  if (category === '#Sport' || category === 'Sport') return 'linear-gradient(135deg, #4facfe, #00f2fe)';
  if (category === '#Music' || category === 'Music') return 'linear-gradient(135deg, #43e97b, #38f9d7)';
  if (category === '#Charity' || category === 'Charity') return 'linear-gradient(135deg, #fa709a, #fee140)';
  return 'linear-gradient(135deg, #f953c6, #f9a825)';
}



export default function Home() {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchEvents() {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/events`);
        setEvents(response.data);
      } catch (err) {
        console.error(err);
      }
    }
    fetchEvents();

    const style = document.createElement('style');
    style.textContent = `
      @keyframes float {
        0%, 100% { transform: translateY(0px) rotate(0deg); }
        50% { transform: translateY(-20px) rotate(10deg); }
      }
      @keyframes float2 {
        0%, 100% { transform: translateY(0px) rotate(0deg); }
        50% { transform: translateY(-15px) rotate(-8deg); }
      }
      @keyframes fadeInUp {
        from { opacity: 0; transform: translateY(30px); }
        to { opacity: 1; transform: translateY(0); }
      }
      @keyframes gradientShift {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
      }
      .float-1 { animation: float 6s ease-in-out infinite; }
      .float-2 { animation: float2 8s ease-in-out infinite; }
      .float-3 { animation: float 5s ease-in-out infinite 1s; }
      .fade-in-up { animation: fadeInUp 0.8s ease forwards; }
      .fade-in-up-delay { animation: fadeInUp 0.8s ease 0.2s forwards; opacity: 0; }
      .fade-in-up-delay-2 { animation: fadeInUp 0.8s ease 0.4s forwards; opacity: 0; }
      .animated-gradient {
        background: linear-gradient(270deg, #f953c6, #b91d73, #f9a825, #f953c6);
        background-size: 400% 400%;
        animation: gradientShift 8s ease infinite;
      }
      .card-hover {
        transition: transform 0.3s ease, box-shadow 0.3s ease;
      }
      .card-hover:hover {
        transform: translateY(-6px);
        box-shadow: 0 20px 40px rgba(249, 83, 198, 0.15);
      }
      .feature-card:hover .feature-icon {
        transform: scale(1.15) rotate(5deg);
      }
      .feature-icon {
        transition: transform 0.3s ease;
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  const upcomingEvents = events.filter(event => new Date(event.date) > new Date());
  return (
    <div className="min-h-screen" style={{ background: "#fff5f7" }}>
      <Navbar />

      {/* Hero */}
      <div className="relative overflow-hidden animated-gradient" style={{ minHeight: '600px' }}>
        <div className="absolute top-10 left-10 text-5xl float-1 opacity-30 select-none">🎉</div>
        <div className="absolute top-20 right-16 text-4xl float-2 opacity-25 select-none">🎵</div>
        <div className="absolute bottom-16 left-20 text-4xl float-3 opacity-20 select-none">🤝</div>
        <div className="absolute top-32 left-1/3 text-3xl float-2 opacity-20 select-none">📅</div>
        <div className="absolute bottom-10 right-24 text-5xl float-1 opacity-25 select-none">🍔</div>
        <div className="absolute top-12 right-1/3 text-3xl float-3 opacity-20 select-none">⚽</div>

        <div className="relative text-center py-32 px-6 flex flex-col items-center justify-center">
          <div className="inline-block bg-white/20 backdrop-blur-sm text-white text-xs font-bold px-4 py-2 rounded-full mb-6 fade-in-up">
            🌍 Connecting communities everywhere
          </div>
          <h1 className="text-6xl md:text-7xl font-extrabold text-white mb-6 leading-tight fade-in-up" style={{ textShadow: '0 2px 20px rgba(0,0,0,0.1)' }}>
            Your neighbourhood,<br />
            <span className="text-yellow-300">alive.</span>
          </h1>
          <p className="text-white/85 text-xl mb-10 max-w-xl mx-auto fade-in-up-delay">
            Discover, create and join events happening right on your doorstep.
          </p>
          <div className="flex gap-4 justify-center flex-wrap fade-in-up-delay-2">
            <button
              onClick={() => navigate("/register")}
              className="bg-white text-pink-600 font-bold px-10 py-4 rounded-full hover:opacity-90 transition-all shadow-xl text-lg"
            >
              Get Started Free ✨
            </button>
            <button
              onClick={() => { const el = document.getElementById('events'); el?.scrollIntoView({ behavior: 'smooth' }); }}
              className="border-2 border-white text-white font-bold px-10 py-4 rounded-full hover:bg-white hover:text-pink-600 transition-all text-lg"
            >
              Browse Events ↓
            </button>
          </div>

          <div className="mt-16 flex gap-12 justify-center flex-wrap">
            {[
              { number: `${events.length}+`, label: 'Events Listed' },
              { number: '100%', label: 'Free to Join' },
              { number: '24/7', label: 'Always Live' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-3xl font-extrabold text-white">{stat.number}</p>
                <p className="text-white/70 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="max-w-6xl mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <span className="text-xs font-bold text-pink-500 uppercase tracking-widest">Why Locana</span>
          <h2 className="text-4xl font-extrabold text-gray-800 mt-2 mb-4">Everything you need to connect</h2>
          <p className="text-gray-400 max-w-lg mx-auto">Locana makes it effortless to find and host local events that bring people together</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { emoji: "🎉", title: "Discover Events", desc: "Browse local events by category and date. Find something happening near you every weekend.", color: '#f953c6' },
            { emoji: "📅", title: "Create & Manage", desc: "Host your own events in minutes. Edit details, track RSVPs and manage everything from your dashboard.", color: '#4facfe' },
            { emoji: "🤝", title: "Connect with People", desc: "Meet your neighbours and build your community. RSVP to events and show up to real life.", color: '#43e97b' },
          ].map((feature) => (
            <div key={feature.title} className="feature-card bg-white rounded-3xl p-8 shadow-lg text-center cursor-default card-hover">
              <div className="feature-icon w-20 h-20 rounded-2xl flex items-center justify-center text-4xl mx-auto mb-6"
                style={{ background: `${feature.color}20`, border: `2px solid ${feature.color}30` }}
              >
                {feature.emoji}
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">{feature.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* How it works */}
      <div className="py-24 px-6" style={{ background: 'linear-gradient(135deg, #fff0fb, #fff5f7)' }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs font-bold text-pink-500 uppercase tracking-widest">Simple process</span>
            <h2 className="text-4xl font-extrabold text-gray-800 mt-2 mb-4">How it works</h2>
            <p className="text-gray-400">Up and running in three simple steps</p>
          </div>

          {[
            {
              step: '01',
              title: 'Create your free account',
              desc: 'Sign up in seconds with just your name, email and password. No credit card needed. Your community is waiting.',
              url: 'locana.app/register',
              bgStyle: { background: 'linear-gradient(135deg, #f953c6 0%, #b91d73 50%, #f9a825 100%)' },
              mockup: (
                <div className="bg-white rounded-2xl p-6 max-w-sm mx-auto">
                  <h4 className="font-extrabold text-gray-800 text-lg mb-4 text-center">Create Account</h4>
                  <div className="flex flex-col gap-3">
                    <div className="bg-gray-50 rounded-xl px-4 py-2 text-sm text-gray-400 border border-gray-200">John Smith</div>
                    <div className="bg-gray-50 rounded-xl px-4 py-2 text-sm text-gray-400 border border-gray-200">john@example.com</div>
                    <div className="bg-gray-50 rounded-xl px-4 py-2 text-sm text-gray-400 border border-gray-200">••••••••</div>
                    <div className="rounded-xl py-2 text-sm text-white font-bold text-center animated-gradient">Create Account</div>
                  </div>
                </div>
              ),
              reverse: false,
            },
            {
              step: '02',
              title: 'Browse or create events',
              desc: "Find events near you or host your own in minutes. Add a title, location, date and description and you're live.",
              url: 'locana.app',
              bgStyle: { background: '#f9fafb' },
              mockup: (
                <div className="p-2">
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { title: "Summer BBQ", cat: "Food", loc: "Central Park", grad: 'linear-gradient(135deg, #f953c6, #b91d73)' },
                      { title: "Charity Run", cat: "Sport", loc: "Riverside", grad: 'linear-gradient(135deg, #4facfe, #00f2fe)' },
                      { title: "Jazz Night", cat: "Music", loc: "City Hall", grad: 'linear-gradient(135deg, #43e97b, #38f9d7)' },
                      { title: "Art Fair", cat: "Culture", loc: "Old Market", grad: 'linear-gradient(135deg, #fa709a, #fee140)' },
                    ].map((e) => (
                      <div key={e.title} className="bg-white rounded-xl overflow-hidden shadow-sm">
                        <div className="h-8" style={{ background: e.grad }}></div>
                        <div className="p-2">
                          <p className="font-bold text-gray-800 text-xs">{e.title}</p>
                          <p className="text-gray-400 text-xs">📍 {e.loc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ),
              reverse: true,
            },
            {
              step: '03',
              title: 'RSVP and show up',
              desc: "Found something you like? Hit RSVP and go enjoy your community. It really is that simple.",
              url: 'locana.app/events/1',
              bgStyle: { background: '#f9fafb' },
              mockup: (
                <div className="bg-white rounded-xl p-5 shadow-sm border-t-4 border-pink-400">
                  <span className="text-xs bg-pink-100 text-pink-600 px-2 py-0.5 rounded-full font-semibold">Food</span>
                  <h4 className="font-extrabold text-gray-800 text-lg mt-2">Summer BBQ 🍔</h4>
                  <p className="text-gray-400 text-xs mt-1">📍 Central Park</p>
                  <p className="text-gray-400 text-xs">📅 15 July 2026</p>
                  <p className="text-pink-500 text-xs font-semibold mt-1">🎟️ 12 going</p>
                  <p className="text-gray-500 text-sm mt-3">A fun community BBQ in the park. Everyone welcome!</p>
                  <div className="mt-4 py-2 rounded-xl text-sm text-white font-bold text-center animated-gradient">RSVP to this event 🎉</div>
                </div>
              ),
              reverse: false,
            },
          ].map(({ step, title, desc, url, bgStyle, mockup, reverse }) => (
            <div key={step} className={`flex flex-col ${reverse ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-12 mb-24 last:mb-0`}>
              <div className="flex-1">
                <span className="text-7xl font-extrabold text-pink-100">{step}</span>
                <h3 className="text-2xl font-extrabold text-gray-800 mt-0 mb-4">{title}</h3>
                <p className="text-gray-400 leading-relaxed">{desc}</p>
              </div>
              <div className="flex-1">
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 card-hover">
                  <div className="bg-gray-100 px-4 py-3 flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-400"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                    <div className="w-3 h-3 rounded-full bg-green-400"></div>
                    <div className="flex-1 bg-white rounded-full px-3 py-1 text-xs text-gray-400 ml-2">{url}</div>
                  </div>
                  <div className="p-6" style={bgStyle}>{mockup}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="relative overflow-hidden animated-gradient text-center py-24 px-6">
        <div className="absolute top-8 left-12 text-4xl float-1 opacity-20 select-none">🎉</div>
        <div className="absolute bottom-8 right-12 text-4xl float-2 opacity-20 select-none">🤝</div>
        <div className="relative">
          <h2 className="text-5xl font-extrabold text-white mb-4">Ready to get involved?</h2>
          <p className="text-white/80 text-lg mb-10 max-w-lg mx-auto">
            Join your local community today. It's free, it's fun, and your neighbours are already waiting.
          </p>
          <button
            onClick={() => navigate("/register")}
            className="bg-white text-pink-600 font-bold px-12 py-4 rounded-full hover:opacity-90 transition-all shadow-xl text-lg"
          >
            Join Locana for Free →
          </button>
        </div>
      </div>

      {/* Upcoming Events */}
      <div id="events" className="max-w-6xl mx-auto px-6 py-20">
        <div className="flex justify-between items-center mb-10">
          <div>
            <span className="text-xs font-bold text-pink-500 uppercase tracking-widest">Live now</span>
            <h2 className="text-3xl font-extrabold text-gray-800 mt-1">Upcoming Events</h2>
          </div>
        </div>

        {events.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <p className="text-5xl mb-4">📅</p>
            <p className="text-lg font-semibold">No events yet</p>
            <p className="text-sm mt-2">Be the first to create one!</p>
            <button onClick={() => navigate('/create')} className="mt-6 bg-pink-500 text-white px-6 py-3 rounded-full font-semibold hover:opacity-90 transition-all">
              Create an Event
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {upcomingEvents.map((event) => (
              <div
                key={event.id}
                className="bg-white rounded-3xl shadow-md overflow-hidden cursor-pointer card-hover"
                onClick={() => navigate(`/events/${event.id}`)}
              >
                <div className="h-24 flex items-center justify-center relative"
                  style={{ background: getCategoryGradient(event.category) }}
                >
                  <span className="absolute top-3 right-3 text-xs font-semibold bg-white/20 text-white px-3 py-1 rounded-full">
                    {event.category}
                  </span>
                </div>
                <div className="p-6">
                  <h2 className="text-lg font-bold text-gray-800 mb-2">{event.title}</h2>
                  <p className="text-gray-400 text-sm">📍 {event.location}</p>
                  <p className="text-gray-400 text-sm mt-1">
                    📅 {new Date(event.date).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
                  </p>
                  <p className="text-gray-500 text-sm mt-3 line-clamp-2">{event.description}</p>
                  <div className="flex items-center justify-between mt-4">
                    <p className="text-pink-500 text-sm font-semibold">🎟️ {event.rsvp_count} going</p>
                    <span className="text-xs text-pink-500 font-semibold">View event →</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="text-center py-10 text-gray-400 text-sm border-t border-gray-100">
        <p className="font-bold text-gray-600 mb-1">Locana</p>
        <p>© 2026 Locana</p>
      </div>
    </div>
  );
}