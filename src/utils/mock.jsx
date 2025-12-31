import {
  ScanLineIcon,
  Smartphone,
  ArrowBigDown,
  GlobeLock,
  ChartBarIcon,
} from "lucide-react";

export const FEATURES = [
  {
    title: "Instant Table Ordering",
    desc: "No need to wait for a waiter. Just scan the QR code, browse the visual menu, and order instantly.",
    icon: <ScanLineIcon />,
    gradient: "from-orange-500/10 to-red-500/10",
  },
  {
    title: "Contactless & Safe",
    desc: "Minimize physical contact. View menus and order directly from your personal smartphone.",
    icon: <Smartphone />,
    gradient: "from-amber-500/10 to-orange-500/10",
  },
  {
    title: "Real-Time Updates",
    desc: "Restaurants update menus instantly. Sold out items disappear, and new specials appear in seconds.",
    icon: <ArrowBigDown />,
    gradient: "from-red-500/10 to-rose-500/10",
  },
  {
    title: "Multi-Language",
    desc: "Automatically translate your menu into multiple languages to welcome tourists and international guests.",
    icon: <GlobeLock />,
    gradient: "from-blue-500/10 to-indigo-500/10",
  },
  {
    title: "Smart Analytics",
    desc: "Track which items are popular, peak ordering times, and customer preferences to optimize your menu.",
    icon: <ChartBarIcon />,
    gradient: "from-green-500/10 to-emerald-500/10",
  },
  {
    title: "Easy Payment",
    desc: "Integrate with popular payment gateways to allow customers to pay directly from their phone.",
    icon: "💳",
    gradient: "from-purple-500/10 to-pink-500/10",
  },
];

export const STEPS = [
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

export const STATS = [
  { value: "< 1s", label: "Scan Speed", icon: "⚡" },
  { value: "100%", label: "Mobile Ready", icon: "📱" },
  { value: "30%", label: "Order Increase", icon: "📈" },
  { value: "Zero", label: "App Download", icon: "✨" },
];

export const FAQS = [
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
