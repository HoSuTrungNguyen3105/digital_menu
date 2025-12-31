import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";
import {
  UtensilsCrossed,
  ScanLine,
  Smartphone,
  ChefHat,
  ArrowRight,
} from "lucide-react";

const FEATURES = [
  {
    title: "Instant Table Ordering",
    desc: "No need to wait for a waiter. Just scan the QR code, browse the visual menu, and order instantly.",
    icon: "⚡",
    gradient: "from-orange-500/10 to-red-500/10",
  },
  {
    title: "Contactless & Safe",
    desc: "Minimize physical contact. View menus and order directly from your personal smartphone.",
    icon: "📱",
    gradient: "from-amber-500/10 to-orange-500/10",
  },
  {
    title: "Real-Time Updates",
    desc: "Restaurants update menus instantly. Sold out items disappear, and new specials appear in seconds.",
    icon: "🔄",
    gradient: "from-red-500/10 to-rose-500/10",
  },
  {
    title: "Multi-Language",
    desc: "Automatically translate your menu into multiple languages to welcome tourists and international guests.",
    icon: "🌐",
    gradient: "from-blue-500/10 to-indigo-500/10",
  },
  {
    title: "Smart Analytics",
    desc: "Track which items are popular, peak ordering times, and customer preferences to optimize your menu.",
    icon: "📊",
    gradient: "from-green-500/10 to-emerald-500/10",
  },
  {
    title: "Easy Payment",
    desc: "Integrate with popular payment gateways to allow customers to pay directly from their phone.",
    icon: "💳",
    gradient: "from-purple-500/10 to-pink-500/10",
  },
];

const STEPS = [
  {
    id: "01",
    title: "Sit & Scan",
    desc: "Guests sit at their table and scan the QR code with their phone camera.",
    color: "text-orange-600",
  },
  {
    id: "02",
    title: "Browse Menu",
    desc: "They view your beautiful digital menu with photos, descriptions, and prices.",
    color: "text-amber-600",
  },
  {
    id: "03",
    title: "Order Instantly",
    desc: "Guests select items and send the order directly to the kitchen.",
    color: "text-red-600",
  },
  {
    id: "04",
    title: "Enjoy Meal",
    desc: "Food is served fresh. No waiting for menus or bills.",
    color: "text-rose-600",
  },
];

const STATS = [
  { value: "< 1s", label: "Scan Speed", icon: "⚡" },
  { value: "100%", label: "Mobile Ready", icon: "📱" },
  { value: "30%", label: "Order Increase", icon: "📈" },
  { value: "Zero", label: "App Download", icon: "✨" },
];

const FAQS = [
  {
    question: "Do I need to download an app?",
    answer:
      "No! Simply open your camera or use the 'Scan QR' button on this website to view the menu instantly.",
  },
  {
    question: "Is it secure?",
    answer:
      "Yes. Our platform uses standard web security to ensure your browsing and ordering experience is safe.",
  },
  {
    question: "I own a restaurant. How do I join?",
    answer:
      "Click 'Partner Login' or 'Register' to create your account and start generating your own QR menus in minutes.",
  },
  {
    question: "Can I manage multiple tables?",
    answer:
      "Absolutely. You can generate unique QR codes for each table (Table 1, Table 2, etc.) to track exactly where orders are coming from.",
  },
];

export default function Home() {
  const navigate = useNavigate();
  const demoTableId = "T-01";

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans selection:bg-orange-500 selection:text-white">
      {/* NAVBAR */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-orange-100">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 text-white flex items-center justify-center font-bold rounded-xl shadow-lg shadow-orange-500/20 group-hover:rotate-12 transition-transform">
              <span className="text-xl">Q</span>
            </div>
            <span className="font-bold tracking-tight text-xl">QR Menu</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
            <a
              href="#how-it-works"
              className="hover:text-orange-600 transition-colors"
            >
              How it Works
            </a>
            <a
              href="#features"
              className="hover:text-orange-600 transition-colors"
            >
              Features
            </a>
            <a href="#demo" className="hover:text-orange-600 transition-colors">
              Demo
            </a>
          </nav>

          <div className="flex items-center gap-4 text-sm font-medium">
            <Link
              to="/login"
              className="hidden sm:block text-gray-600 hover:text-orange-600 transition"
            >
              Partner Login
            </Link>
          </div>
        </div>
      </header>

      <main>
        {/* HERO SECTION */}
        <section className="relative pt-24 pb-20 px-6 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-white to-red-50 -z-10" />

          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-2 mb-8 px-5 py-2 bg-orange-100 rounded-full text-sm font-bold text-orange-700 border border-orange-200"
            >
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-orange-500"></span>
              </span>
              The Best Way to Dine In
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 leading-[1.1] text-gray-900"
            >
              Hungry? <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-600">
                Just Scan & Order.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="max-w-2xl mx-auto text-xl text-gray-500 leading-relaxed mb-12"
            >
              Skip the wait. Use your phone to scan the table code, browse our
              visual menu, and order your favorites instantly.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-col sm:flex-row justify-center gap-4"
            >
              <button
                onClick={() => navigate("/checkin/table")}
                className="group bg-gray-900 text-white px-8 py-4 rounded-xl font-bold text-lg hover:scale-105 transition-all shadow-xl shadow-gray-900/20 flex items-center justify-center gap-3"
              >
                <ScanLine className="w-5 h-5 group-hover:text-orange-400 transition-colors" />
                Scan Table QR
              </button>

              <button
                // onClick={() => navigate(`/FoodMenu/${demoTableId}`)}
                onClick={() => navigate(`/FoodMenu`)}
                className="bg-white text-orange-600 border-2 border-orange-100 px-8 py-4 rounded-xl font-bold text-lg hover:bg-orange-50 transition-colors flex items-center justify-center gap-2"
              >
                View Menu <ArrowRight className="w-5 h-5" />
              </button>
            </motion.div>

            <div className="mt-8 text-sm text-gray-400">
              Restaurant owner?{" "}
              <Link
                to="/register"
                className="text-orange-600 font-bold hover:underline"
              >
                Register here
              </Link>
            </div>
          </div>
        </section>

        {/* HOW IT WORKS SECTION */}
        <section
          id="how-it-works"
          className="py-20 bg-white border-b border-gray-50"
        >
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight mb-4 text-gray-900">
                Dining Made Simple
              </h2>
              <p className="text-gray-500">Four steps to a delicious meal</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {STEPS.map((step, i) => (
                <div key={i} className="relative group text-center">
                  <div
                    className={`text-5xl font-black ${step.color} mb-4 opacity-20 group-hover:opacity-100 transition-opacity`}
                  >
                    {step.id}
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-gray-900">
                    {step.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FEATURES SECTION */}
        <section id="features" className="py-24 bg-gray-50">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight mb-4 text-gray-900">
                Why Use QR Menu?
              </h2>
              <p className="text-gray-500">
                Better for guests, better for restaurants.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {FEATURES.map((feature, i) => (
                <FeatureCard key={i} {...feature} index={i} />
              ))}
            </div>
          </div>
        </section>

        {/* STATS */}
        <section className="py-12 bg-white border-y border-orange-50">
          <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {STATS.map((stat, i) => (
              <div key={i}>
                <div className="text-3xl mb-2">{stat.icon}</div>
                <div className="font-black text-2xl md:text-3xl text-gray-900">
                  {stat.value}
                </div>
                <div className="text-xs uppercase tracking-wider text-gray-500 font-bold mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ SECTION */}
        <section className="py-24 bg-white">
          <div className="max-w-3xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
              Common Questions
            </h2>
            <div className="space-y-4">
              {FAQS.map((faq, i) => (
                <FAQItem key={i} {...faq} />
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-gradient-to-r from-gray-900 to-gray-800 text-white text-center">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-4xl font-bold mb-6">
              Ready to upgrade your dining experience?
            </h2>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
              Join thousands of restaurants giving their customers the safe,
              fast, and modern way to order.
            </p>
            <Link
              to="/register"
              className="inline-block bg-orange-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-orange-700 transition-colors shadow-lg shadow-orange-900/50"
            >
              Get Started for Free
            </Link>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="bg-white border-t border-gray-100 py-12 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-orange-600 rounded-lg flex items-center justify-center text-white font-bold">
              Q
            </div>
            <span className="font-bold text-gray-900">QR Menu</span>
          </div>
          <p className="text-sm text-gray-400">
            © 2024 Digital Menu. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm font-medium text-gray-500">
            <Link to="/login" className="hover:text-orange-600">
              Admin Login
            </Link>
            <Link to="/register" className="hover:text-orange-600">
              Register Restaurant
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

// --- SUB COMPONENTS ---

function FeatureCard({ title, desc, icon, gradient, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className={`p-6 rounded-2xl border border-gray-100 hover:border-orange-200 hover:shadow-lg transition-all bg-white`}
    >
      <div
        className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center text-2xl mb-4`}
      >
        {icon}
      </div>
      <h3 className="font-bold text-lg mb-2 text-gray-900">{title}</h3>
      <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
    </motion.div>
  );
}

function FAQItem({ question, answer }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div
      className="bg-gray-50 rounded-2xl p-6 hover:bg-orange-50 transition-colors cursor-pointer border border-transparent hover:border-orange-100"
      onClick={() => setIsOpen(!isOpen)}
    >
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-lg text-gray-900">{question}</h3>
        <span
          className={`text-gray-400 transition-transform ${
            isOpen ? "rotate-180 text-orange-500" : ""
          }`}
        >
          ▼
        </span>
      </div>
      {isOpen && (
        <p className="mt-3 text-gray-600 leading-relaxed text-sm animate-fade-in">
          {answer}
        </p>
      )}
    </div>
  );
}
