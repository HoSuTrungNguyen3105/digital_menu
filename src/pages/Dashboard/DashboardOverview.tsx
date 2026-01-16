import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Chip,
  Button,
  Stack,
  IconButton,
  Paper,
  Badge,
} from "@mui/material";
import {
  TrendingUp,
  Users,
  DollarSign,
  Package,
  ArrowUpRight,
  ArrowDownRight,
  ChevronRight,
  TrendingDown,
  Clock,
  Calendar,
} from "lucide-react";
import theme from "../../theme/theme";

export default function DashboardOverview() {
  const navigate = useNavigate();

  const [owner, setOwner] = useState(null);
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      // const [meRes, restRes] = await Promise.all([getMe(), getRestaurants()]);

      // setOwner(meRes?.data?.data || null);

      // const list = restRes?.data?.data?.restaurant || [];
      // setRestaurants(Array.isArray(list) ? list.filter(Boolean) : []);
    } catch (err) {
      console.error("Dashboard error:", err);
      // if (err?.response?.status === 401) {
      //   navigate("/login");
      // } else {
      //   setError("Failed to load dashboard");
      // }
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        Loading overview...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-12">
        <p className="text-red-500 mb-4">{error}</p>
        <button onClick={fetchData} className="underline text-gray-600">
          Try again
        </button>
      </div>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <div className="max-w-7xl mx-auto">
      {/* HEADER - Simplified since Sidebar handles nav */}
      <header className="mb-10">
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome back,{" "}
          {/* <span className="text-orange-600">{owner?.ownername}</span> */}
        </h1>
        <p className="text-gray-500 mt-1">
          Here's what's happening with your restaurants today.
        </p>
      </header>

      {/* STATS CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {[
          {
            label: "Total Revenue",
            value: "24.5Mđ",
            icon: DollarSign,
            trend: "+12.5%",
            positive: true,
            color: "bg-blue-500",
          },
          {
            label: "Active Orders",
            value: "12",
            icon: Package,
            trend: "+4",
            positive: true,
            color: "bg-orange-500",
          },
          {
            label: "Total Visitors",
            value: "842",
            icon: Users,
            trend: "-2.4%",
            positive: false,
            color: "bg-green-500",
          },
          {
            label: "Avg. Bill",
            value: "185kđ",
            icon: TrendingUp,
            trend: "+5.2%",
            positive: true,
            color: "bg-red-500",
          },
        ].map((stat, i) => (
          <div
            key={i}
            className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 group hover:border-orange-200 transition-all"
          >
            <div
              className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center shadow-lg shadow-gray-200`}
            >
              <stat.icon className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <p className="text-gray-400 text-xs font-bold uppercase tracking-wider">
                {stat.label}
              </p>
              <div className="flex items-end gap-2">
                <h3 className="text-2xl font-black text-gray-900 leading-tight">
                  {stat.value}
                </h3>
                <span
                  className={`text-[10px] font-bold flex items-center mb-1 ${stat.positive ? "text-green-500" : "text-red-500"
                    }`}
                >
                  {stat.positive ? (
                    <ArrowUpRight className="w-3 h-3" />
                  ) : (
                    <ArrowDownRight className="w-3 h-3" />
                  )}
                  {stat.trend}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* BEST SELLING DISHES */}
      <Box sx={{ mb: 6 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 700, color: "text.primary" }}>
            Best Selling Dishes
          </Typography>
          <Button
            endIcon={<ChevronRight className="w-4 h-4" />}
            sx={{ textTransform: "none", color: "text.secondary" }}
          >
            See All
          </Button>
        </Stack>

        <Stack direction="row" spacing={2} sx={{ overflowX: "auto", pb: 2 }}>
          {[
            {
              name: "Wagyu Gold Burger",
              price: 450,
              oldPrice: 520,
              sales: "450 Sold",
              image: "https://images.unsplash.com/photo-1740838535478-8f67b29f1c00?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHw0fHxHb3VybWV0JTIwYnVyZ2VyJTIwd2l0aCUyMGJlZWYlMjBwYXR0eSUyQyUyMGNoZWVzZSUyQyUyMGxldHR1Y2UlMkMlMjB0b21hdG8lMjBvbiUyMHdvb2RlbiUyMGJvYXJkJTIwYnVyZ2VyJTIwaGFtYnVyZ2VyJTIwZm9vZCUyMGdvdXJtZXR8ZW58MHwwfHx8MTc2ODU0NDYzNnww&ixlib=rb-4.1.0&q=85&w=400",
              badge: "$5 off",
              trending: true,
              attribution: "Liana S on Unsplash",
            },
            {
              name: "Black Truffle Pasta",
              price: 382,
              oldPrice: 420,
              sales: "382 Sold",
              image: "https://images.pexels.com/photos/2773940/pexels-photo-2773940.jpeg?auto=compress&cs=tinysrgb&w=400",
              badge: "$2 off",
              trending: true,
              attribution: "Pixelme Stock Photography on Pexels",
            },
            {
              name: "Spicy Miso Ramen",
              price: 320,
              oldPrice: 350,
              sales: "320 Sold",
              image: "https://images.pexels.com/photos/19205273/pexels-photo-19205273.jpeg?auto=compress&cs=tinysrgb&w=400",
              badge: "$1.5 off",
              trending: false,
              attribution: "Nadin Sh on Pexels",
            },
          ].map((dish, index) => (
            <Card
              key={index}
              sx={{
                minWidth: 280,
                maxWidth: 280,
                borderRadius: 3,
                boxShadow: 1,
                transition: "all 0.3s",
                "&:hover": {
                  boxShadow: 4,
                  transform: "translateY(-4px)",
                },
              }}
            >
              <Box sx={{ position: "relative" }}>
                <CardMedia
                  component="img"
                  height="160"
                  image={dish.image}
                  alt={`${dish.name} - Photo by ${dish.attribution}`}
                  sx={{ objectFit: "cover" }}
                />
                <Chip
                  label={dish.badge}
                  size="small"
                  sx={{
                    position: "absolute",
                    top: 12,
                    right: 12,
                    bgcolor: "error.main",
                    color: "error.contrastText",
                    fontWeight: 700,
                    fontSize: "0.75rem",
                  }}
                />
              </Box>
              <CardContent sx={{ p: 2.5 }}>
                <Typography
                  variant="subtitle1"
                  sx={{ fontWeight: 700, mb: 0.5, color: "text.primary" }}
                >
                  {dish.name}
                </Typography>
                <Typography variant="caption" sx={{ color: "text.secondary", display: "block", mb: 1.5 }}>
                  {dish.sales}
                </Typography>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Box>
                    <Typography
                      variant="h6"
                      component="span"
                      sx={{ fontWeight: 800, color: "text.primary" }}
                    >
                      ${dish.price}
                    </Typography>
                    <Typography
                      variant="body2"
                      component="span"
                      sx={{
                        textDecoration: "line-through",
                        color: "text.secondary",
                        ml: 1,
                        fontSize: "0.875rem",
                      }}
                    >
                      ${dish.oldPrice}
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                    {dish.trending ? (
                      <TrendingUp className="w-4 h-4" style={{ color: theme.palette.success.main }} />
                    ) : (
                      <TrendingDown className="w-4 h-4" style={{ color: theme.palette.error.main }} />
                    )}
                    <svg width="40" height="20" viewBox="0 0 40 20">
                      <polyline
                        points={dish.trending ? "0,15 10,10 20,12 30,5 40,8" : "0,5 10,8 20,12 30,10 40,15"}
                        fill="none"
                        stroke={dish.trending ? theme.palette.success.main : theme.palette.error.main}
                        strokeWidth="2"
                      />
                    </svg>
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          ))}
        </Stack>
      </Box>

      {/* ACTION NEEDED & ACTIVE PROMOTIONS */}
      <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" }, gap: 3, mb: 6 }}>
        {/* Action Needed */}
        <Paper elevation={0} sx={{ p: 3, borderRadius: 3, border: 1, borderColor: "divider" }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2.5 }}>
            <Typography variant="h6" sx={{ fontWeight: 700, color: "text.primary" }}>
              ⚡ Action Needed
            </Typography>
          </Stack>
          <Stack spacing={2}>
            {[
              {
                task: "Kale & Quinoa Bowl",
                status: "LOW COMMISSION",
                time: "140 Views | 2 Orders (3.57%)",
                date: null,
              },
              {
                task: "Grilled Sea Bass",
                status: "HIGH BOUNCE",
                time: "80 Views | 2 Orders (2.8%)",
                date: null,
              },
            ].map((item, index) => (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  p: 2,
                  bgcolor: "grey.50",
                  borderRadius: 2,
                  transition: "all 0.2s",
                  "&:hover": {
                    bgcolor: "primary.50",
                  },
                }}
              >
                <Box sx={{ flex: 1 }}>
                  <Typography variant="body1" sx={{ fontWeight: 600, mb: 0.5 }}>
                    {item.task}
                  </Typography>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Chip
                      label={item.status}
                      size="small"
                      sx={{
                        bgcolor: "warning.main",
                        color: "warning.contrastText",
                        fontWeight: 700,
                        fontSize: "0.65rem",
                        height: 20,
                      }}
                    />
                    <Typography variant="caption" sx={{ color: "text.secondary" }}>
                      {item.time}
                    </Typography>
                  </Stack>
                </Box>
                <Button
                  variant="contained"
                  size="small"
                  sx={{
                    textTransform: "none",
                    fontWeight: 700,
                    bgcolor: "primary.main",
                    px: 2.5,
                    boxShadow: 2,
                  }}
                >
                  Promote
                </Button>
              </Box>
            ))}
          </Stack>
        </Paper>

        {/* Active Promotions */}
        <Paper elevation={0} sx={{ p: 3, borderRadius: 3, border: 1, borderColor: "divider" }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2.5 }}>
            <Typography variant="h6" sx={{ fontWeight: 700, color: "text.primary" }}>
              🔥 Active Promotions
            </Typography>
            <Button
              endIcon={<ChevronRight className="w-4 h-4" />}
              sx={{ textTransform: "none", color: "primary.main", fontWeight: 600 }}
            >
              Refer Out
            </Button>
          </Stack>
          <Stack spacing={2.5}>
            <Box
              sx={{
                p: 2.5,
                bgcolor: "success.50",
                borderRadius: 2,
                border: 1,
                borderColor: "success.200",
              }}
            >
              <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ mb: 1.5 }}>
                <Typography variant="body1" sx={{ fontWeight: 700, color: "text.primary" }}>
                  Happy Hour - 20% Off Drinks
                </Typography>
                <Chip
                  label="ACTIVE"
                  size="small"
                  sx={{
                    bgcolor: "success.main",
                    color: "success.contrastText",
                    fontWeight: 800,
                    fontSize: "0.65rem",
                    height: 22,
                  }}
                />
              </Stack>
              <Stack direction="row" spacing={2} sx={{ color: "text.secondary" }}>
                <Stack direction="row" spacing={0.5} alignItems="center">
                  <Clock className="w-4 h-4" />
                  <Typography variant="caption" sx={{ fontWeight: 600 }}>
                    Ends in 06 days
                  </Typography>
                </Stack>
              </Stack>
            </Box>
          </Stack>
        </Paper>
      </Box>

      {restaurants.length === 0 ? (
        <div className="bg-white p-12 rounded-3xl text-center border border-gray-100 shadow-sm">
          <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-3xl">🍽️</span>
          </div>
          <h2 className="text-2xl font-bold mb-2 text-gray-900">
            No restaurants yet
          </h2>
          <p className="text-gray-500 mb-8 max-w-md mx-auto">
            Get started by creating your first restaurant profile to generate QR
            menus.
          </p>
          <button
            onClick={() => navigate("/create-restaurant")}
            className="bg-black text-white px-8 py-3 rounded-xl font-bold hover:bg-gray-800 transition-colors"
          >
            Create First Restaurant
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-800">
              Your Restaurants
            </h2>
            <button
              onClick={() => navigate("/create-restaurant")}
              className="text-sm font-medium text-orange-600 hover:text-orange-700"
            >
              + Add New
            </button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {restaurants.map((r) => ([]
              // <RestaurantCard key={r._id} restaurant={r} />
            ))}
          </div>
        </div>
      )}
      </div>
    </ThemeProvider>
  );
}
