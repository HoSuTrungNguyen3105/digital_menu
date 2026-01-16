import React, { useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Tabs,
  Tab,
  TextField,
  InputAdornment,
  Chip,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
  Button,
  Stack,
  Menu,
  MenuItem,
  Paper,
  Tooltip,
  Badge,
} from "@mui/material";
import {
  ArrowLeft,
  CircleHelp,
  Search,
  SlidersHorizontal,
  X,
  ChevronDown,
  Shield,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import theme from "../../../theme/theme";

// Permission categories and items
const PERMISSION_CATEGORIES = [
  {
    id: "employee-records",
    name: "EMPLOYEE RECORDS",
    permissions: [
      { id: "view-salaries", name: "View Salaries" },
      { id: "edit-profile", name: "Edit Profile" },
    ],
  },
  {
    id: "recruitment",
    name: "RECRUITMENT",
    permissions: [
      { id: "post-jobs", name: "Post Jobs" },
      { id: "delete-applicants", name: "Delete Applicants" },
    ],
  },
  {
    id: "system-settings",
    name: "SYSTEM SETTINGS",
    permissions: [{ id: "audit-logs", name: "Audit Logs" }],
  },
];

// Role columns
const ROLES = [
  { id: "admin", name: "ADMIN" },
  { id: "manager", name: "MANAGER" },
  { id: "staff", name: "STAFF" },
];

// Filter options
const DEPARTMENTS = ["HR Dept", "Engineering", "Sales", "Marketing", "Finance"];
const LOCATIONS = ["All Locations", "New York", "London", "Tokyo", "Singapore"];

export default function AccessControl() {
  const [currentTab, setCurrentTab] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilters, setSelectedFilters] = useState<string[]>(["Engineering"]);

  // Dropdown menu states
  const [deptAnchorEl, setDeptAnchorEl] = useState<null | HTMLElement>(null);
  const [locationAnchorEl, setLocationAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedDept, setSelectedDept] = useState("HR Dept");
  const [selectedLocation, setSelectedLocation] = useState("All Locations");

  // Permission matrix state (roleId -> permissionId -> boolean)
  const [permissions, setPermissions] = useState<Record<string, Record<string, boolean>>>({
    admin: {
      "view-salaries": true,
      "edit-profile": true,
      "post-jobs": true,
      "delete-applicants": true,
      "audit-logs": true,
    },
    manager: {
      "view-salaries": false,
      "edit-profile": true,
      "post-jobs": true,
      "delete-applicants": false,
      "audit-logs": false,
    },
    staff: {
      "view-salaries": false,
      "edit-profile": false,
      "post-jobs": false,
      "delete-applicants": false,
      "audit-logs": false,
    },
  });

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
  };

  const handlePermissionToggle = (roleId: string, permissionId: string) => {
    setPermissions((prev) => ({
      ...prev,
      [roleId]: {
        ...prev[roleId],
        [permissionId]: !prev[roleId]?.[permissionId],
      },
    }));
  };

  const handleRemoveFilter = (filter: string) => {
    setSelectedFilters((prev) => prev.filter((f) => f !== filter));
  };

  const handleDeptMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setDeptAnchorEl(event.currentTarget);
  };

  const handleLocationMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setLocationAnchorEl(event.currentTarget);
  };

  const handleDeptMenuClose = (dept?: string) => {
    if (dept) setSelectedDept(dept);
    setDeptAnchorEl(null);
  };

  const handleLocationMenuClose = (location?: string) => {
    if (location) setSelectedLocation(location);
    setLocationAnchorEl(null);
  };

  const handleDiscard = () => {
    // Reset to default permissions
    console.log("Discarding changes");
  };

  const handleSave = () => {
    // Save permission changes
    console.log("Saving changes", permissions);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh", bgcolor: "background.default" }}>
        {/* Header */}
        <AppBar position="static" elevation={0} sx={{ bgcolor: "background.paper", borderBottom: 1, borderColor: "divider" }}>
          <Toolbar sx={{ justifyContent: "space-between", px: 3 }}>
            <Stack direction="row" spacing={2} alignItems="center">
              <Tooltip title="Go back">
                <IconButton edge="start" sx={{ color: "text.primary" }}>
                  <ArrowLeft className="w-5 h-5" />
                </IconButton>
              </Tooltip>
              <Stack direction="row" spacing={1.5} alignItems="center">
                <Box
                  sx={{
                    bgcolor: "primary.main",
                    color: "primary.contrastText",
                    p: 1,
                    borderRadius: 1.5,
                    display: "flex",
                  }}
                >
                  <Shield className="w-5 h-5" />
                </Box>
                <Box>
                  <Typography variant="h6" sx={{ color: "text.primary", fontWeight: 600 }}>
                    Access Control
                  </Typography>
                  <Typography variant="caption" sx={{ color: "text.secondary" }}>
                    Manage role-based permissions
                  </Typography>
                </Box>
              </Stack>
            </Stack>
            <Tooltip title="Help & Documentation">
              <IconButton sx={{ color: "text.secondary" }}>
                <CircleHelp className="w-5 h-5" />
              </IconButton>
            </Tooltip>
          </Toolbar>

          {/* Tabs */}
          <Tabs
            value={currentTab}
            onChange={handleTabChange}
            sx={{ px: 3 }}
            TabIndicatorProps={{
              sx: { height: 3, borderRadius: "3px 3px 0 0" },
            }}
          >
            <Tab
              label="Permission Matrix"
              sx={{
                textTransform: "none",
                fontWeight: 600,
                fontSize: "0.875rem",
                minHeight: 48,
              }}
            />
            <Tab
              label="Audit History"
              sx={{
                textTransform: "none",
                fontWeight: 600,
                fontSize: "0.875rem",
                minHeight: 48,
              }}
            />
          </Tabs>
        </AppBar>

        {/* Search and Filters */}
        <Paper elevation={0} sx={{ borderBottom: 1, borderColor: "divider", px: 3, py: 2.5 }}>
          <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
            <TextField
              placeholder="Search permissions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              fullWidth
              size="small"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search className="w-4 h-4" style={{ color: theme.palette.text.secondary }} />
                  </InputAdornment>
                ),
                sx: {
                  bgcolor: "grey.50",
                  borderRadius: 2,
                  "& .MuiOutlinedInput-notchedOutline": { border: "none" },
                  "&:hover": {
                    bgcolor: "background.paper",
                    boxShadow: 1,
                  },
                  transition: "all 0.2s",
                },
              }}
            />
            <Tooltip title="Advanced Filters">
              <IconButton
                sx={{
                  bgcolor: "grey.100",
                  "&:hover": { bgcolor: "primary.main", color: "primary.contrastText" },
                  transition: "all 0.2s",
                }}
              >
                <SlidersHorizontal className="w-5 h-5" />
              </IconButton>
            </Tooltip>
          </Stack>

          {/* Filter Chips */}
          <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap", gap: 1 }}>
            {selectedFilters.map((filter) => (
              <Chip
                key={filter}
                label={filter}
                onDelete={() => handleRemoveFilter(filter)}
                deleteIcon={<X className="w-3.5 h-3.5" />}
                color="primary"
                sx={{
                  fontWeight: 600,
                  "& .MuiChip-deleteIcon": {
                    color: "primary.contrastText",
                    "&:hover": { opacity: 0.8 },
                  },
                }}
              />
            ))}

            <Chip
              label={selectedDept}
              onClick={handleDeptMenuClick}
              deleteIcon={<ChevronDown className="w-3.5 h-3.5" />}
              onDelete={handleDeptMenuClick}
              variant="outlined"
              sx={{
                fontWeight: 500,
                borderColor: "grey.300",
                "&:hover": { borderColor: "primary.main", bgcolor: "primary.50" },
              }}
            />
          <Menu
            anchorEl={deptAnchorEl}
            open={Boolean(deptAnchorEl)}
            onClose={() => handleDeptMenuClose()}
          >
            {DEPARTMENTS.map((dept) => (
              <MenuItem key={dept} onClick={() => handleDeptMenuClose(dept)}>
                {dept}
              </MenuItem>
            ))}
          </Menu>

            <Chip
              label={selectedLocation}
              onClick={handleLocationMenuClick}
              deleteIcon={<ChevronDown className="w-3.5 h-3.5" />}
              onDelete={handleLocationMenuClick}
              variant="outlined"
              sx={{
                fontWeight: 500,
                borderColor: "grey.300",
                "&:hover": { borderColor: "primary.main", bgcolor: "primary.50" },
              }}
            />
          <Menu
            anchorEl={locationAnchorEl}
            open={Boolean(locationAnchorEl)}
            onClose={() => handleLocationMenuClose()}
          >
            {LOCATIONS.map((location) => (
              <MenuItem key={location} onClick={() => handleLocationMenuClose(location)}>
                {location}
              </MenuItem>
            ))}
          </Menu>
          </Stack>
        </Paper>

        {/* Permission Matrix Table */}
        <Box sx={{ flex: 1, overflow: "auto", p: 3 }}>
          <TableContainer
            component={Paper}
            elevation={0}
            sx={{
              border: 1,
              borderColor: "divider",
              borderRadius: 2,
              overflow: "hidden",
            }}
          >
            <Table>
              <TableHead>
                <TableRow sx={{ bgcolor: "grey.50" }}>
                  <TableCell
                    sx={{
                      fontWeight: 600,
                      fontSize: "0.75rem",
                      color: "text.secondary",
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                      py: 2,
                    }}
                  >
                    Permission
                  </TableCell>
                  {ROLES.map((role) => (
                    <TableCell
                      key={role.id}
                      align="center"
                      sx={{
                        fontWeight: 600,
                        fontSize: "0.75rem",
                        color: "text.secondary",
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                        py: 2,
                      }}
                    >
                      <Stack direction="row" spacing={0.5} alignItems="center" justifyContent="center">
                        <span>{role.name}</span>
                        {role.id === "admin" && (
                          <Tooltip title="Full access role">
                            <Badge
                              badgeContent={<CheckCircle2 className="w-3 h-3" />}
                              sx={{
                                "& .MuiBadge-badge": {
                                  bgcolor: "success.main",
                                  color: "success.contrastText",
                                  right: -8,
                                  top: 2,
                                },
                              }}
                            />
                          </Tooltip>
                        )}
                      </Stack>
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {PERMISSION_CATEGORIES.map((category, catIndex) => (
                  <React.Fragment key={category.id}>
                    {/* Category Header */}
                    <TableRow>
                      <TableCell
                        colSpan={4}
                        sx={{
                          bgcolor: "primary.50",
                          fontWeight: 700,
                          fontSize: "0.75rem",
                          color: "primary.main",
                          textTransform: "uppercase",
                          letterSpacing: "0.05em",
                          py: 1.5,
                          borderTop: catIndex > 0 ? 1 : 0,
                          borderColor: "divider",
                        }}
                      >
                        <Stack direction="row" spacing={1} alignItems="center">
                          <AlertCircle className="w-4 h-4" />
                          <span>{category.name}</span>
                        </Stack>
                      </TableCell>
                    </TableRow>
                    {/* Permission Rows */}
                    {category.permissions.map((permission) => (
                      <TableRow
                        key={permission.id}
                        hover
                        sx={{
                          "&:hover": {
                            bgcolor: "grey.50",
                          },
                          transition: "background-color 0.2s",
                        }}
                      >
                        <TableCell
                          sx={{
                            fontSize: "0.875rem",
                            color: "text.primary",
                            fontWeight: 500,
                            py: 2,
                          }}
                        >
                          {permission.name}
                        </TableCell>
                        {ROLES.map((role) => (
                          <TableCell key={role.id} align="center" sx={{ py: 1.5 }}>
                            <Tooltip
                              title={
                                permissions[role.id]?.[permission.id]
                                  ? `${role.name} has access`
                                  : `${role.name} has no access`
                              }
                            >
                              <Checkbox
                                checked={permissions[role.id]?.[permission.id] || false}
                                onChange={() => handlePermissionToggle(role.id, permission.id)}
                                sx={{
                                  color: "grey.300",
                                  "&.Mui-checked": {
                                    color: "primary.main",
                                  },
                                  "&:hover": {
                                    bgcolor: "primary.50",
                                  },
                                  transition: "all 0.2s",
                                }}
                              />
                            </Tooltip>
                          </TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </React.Fragment>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>

        {/* Action Buttons */}
        <Paper
          elevation={3}
          sx={{
            borderTop: 1,
            borderColor: "divider",
            p: 2.5,
            position: "sticky",
            bottom: 0,
            bgcolor: "background.paper",
            zIndex: 10,
          }}
        >
          <Stack direction="row" spacing={2} justifyContent="flex-end">
            <Button
              variant="outlined"
              onClick={handleDiscard}
              sx={{
                textTransform: "none",
                fontWeight: 600,
                px: 4,
                borderColor: "grey.300",
                color: "text.secondary",
                "&:hover": {
                  borderColor: "error.main",
                  color: "error.main",
                  bgcolor: "error.50",
                },
              }}
            >
              Discard Changes
            </Button>
            <Button
              variant="contained"
              onClick={handleSave}
              sx={{
                textTransform: "none",
                fontWeight: 600,
                px: 4,
                boxShadow: 2,
                "&:hover": {
                  boxShadow: 4,
                },
              }}
              startIcon={<CheckCircle2 className="w-4 h-4" />}
            >
              Save Matrix Changes
            </Button>
          </Stack>
        </Paper>
      </Box>
    </ThemeProvider>
  );
}