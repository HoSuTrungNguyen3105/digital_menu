import {
    Box,
    Card,
    CardContent,
    Typography,
    Button,
    TextField,
    MenuItem,
    IconButton,
    Chip,
    InputAdornment,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import {
    Search,
    Grid as GridIcon,
    List as ListIcon,
    SlidersHorizontal,
    Download,
    LayoutGrid,
} from 'lucide-react';
import RangePagination from './RangePagination';

interface FiltersProps {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    showFilters: boolean;
    setShowFilters: (show: boolean) => void;
    viewMode: 'grid' | 'list' | 'floor';
    setViewMode: (mode: 'grid' | 'list' | 'floor') => void;
    sortBy: string;
    setSortBy: (sort: string) => void;
    activeCategory: string;
    setActiveCategory: (category: string) => void;
    activeBrand: string;
    setActiveBrand: (brand: string) => void;
    activePriceRange: string;
    setActivePriceRange: (range: string) => void;
    categories: string[];
    brands: string[];
    priceRanges: string[];
    // Pagination Props
    fromRecord: number;
    toRecord: number;
    totalItems: number;
    onRangeChange: (from: number, to: number, reset: boolean) => void;
    onPrevPage: () => void;
    onNextPage: () => void;
}

const FiltersLayout = ({
    searchQuery,
    setSearchQuery,
    showFilters,
    setShowFilters,
    viewMode,
    setViewMode,
    sortBy,
    setSortBy,
    activeCategory,
    setActiveCategory,
    activeBrand,
    setActiveBrand,
    activePriceRange,
    setActivePriceRange,
    categories,
    brands,
    priceRanges,
    fromRecord,
    toRecord,
    totalItems,
    onRangeChange,
    onPrevPage,
    onNextPage,
}: FiltersProps) => {
    return (
        <Card sx={{
            background: 'rgba(255, 255, 255, 0.02)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: 4
        }}>
            <CardContent sx={{ p: 3 }}>
                <Box display="flex" flexDirection={{ xs: 'column', lg: 'row' }} gap={3} alignItems={{ xs: 'stretch', lg: 'center' }} justifyContent="space-between">
                    {/* Left: Search & Toggle */}
                    <Box display="flex" gap={2} flex={1} maxWidth={{ lg: 500 }}>
                        <TextField
                            fullWidth
                            size="small"
                            placeholder="Search products, brands, SKU..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Search size={18} className="text-slate-400" />
                                    </InputAdornment>
                                ),
                                sx: {
                                    borderRadius: 3,
                                    bgcolor: 'rgba(255,255,255,0.05)',
                                    '& fieldset': { borderColor: 'rgba(255,255,255,0.1)' }
                                }
                            }}
                        />
                        <Button
                            variant={showFilters ? 'contained' : 'outlined'}
                            onClick={() => setShowFilters(!showFilters)}
                            startIcon={<SlidersHorizontal size={18} />}
                            sx={{
                                borderRadius: 3,
                                textTransform: 'none',
                                whiteSpace: 'nowrap',
                                bgcolor: showFilters ? 'primary.main' : 'transparent'
                            }}
                        >
                            Filters
                        </Button>
                    </Box>

                    {/* Right: View Controls */}
                    <Box display="flex" alignItems="center" gap={2}>
                        <Box sx={{ bgcolor: 'rgba(255,255,255,0.05)', p: 0.5, borderRadius: 2, display: 'flex' }}>
                            <IconButton
                                size="small"
                                onClick={() => setViewMode('grid')}
                                sx={{
                                    bgcolor: viewMode === 'grid' ? 'rgba(255,255,255,0.1)' : 'transparent',
                                    color: viewMode === 'grid' ? '#fff' : 'text.secondary',
                                    borderRadius: 1.5
                                }}
                            >
                                <GridIcon size={18} />
                            </IconButton>
                            <IconButton
                                size="small"
                                onClick={() => setViewMode('list')}
                                sx={{
                                    bgcolor: viewMode === 'list' ? 'rgba(255,255,255,0.1)' : 'transparent',
                                    color: viewMode === 'list' ? '#fff' : 'text.secondary',
                                    borderRadius: 1.5
                                }}
                            >
                                <ListIcon size={18} />
                            </IconButton>
                            <IconButton
                                size="small"
                                onClick={() => setViewMode('floor')}
                                sx={{
                                    bgcolor: viewMode === 'floor' ? 'rgba(255,255,255,0.1)' : 'transparent',
                                    color: viewMode === 'floor' ? '#fff' : 'text.secondary',
                                    borderRadius: 1.5
                                }}
                            >
                                <LayoutGrid size={18} />
                            </IconButton>
                        </Box>

                        <TextField
                            select
                            size="small"
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            sx={{
                                minWidth: 160,
                                '& .MuiOutlinedInput-root': { borderRadius: 3, bgcolor: 'rgba(255,255,255,0.05)' }
                            }}
                        >
                            <MenuItem value="popularity">Most Popular</MenuItem>
                            <MenuItem value="price-low">Price: Low to High</MenuItem>
                            <MenuItem value="price-high">Price: High to Low</MenuItem>
                            <MenuItem value="rating">Highest Rated</MenuItem>
                            <MenuItem value="newest">Newest</MenuItem>
                        </TextField>

                        <RangePagination
                            fromRecord={fromRecord}
                            toRecord={toRecord}
                            totalItems={totalItems}
                            onRangeChange={onRangeChange}
                            onPrevPage={onPrevPage}
                            onNextPage={onNextPage}
                        />

                        <Button variant="outlined" sx={{ borderRadius: 3, minWidth: 40, p: 1 }}>
                            <Download size={18} />
                        </Button>
                    </Box>
                </Box>

                {/* Expandable Filters */}
                {showFilters && (
                    <Box sx={{ mt: 3, pt: 3, borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                        <Grid container spacing={4}>
                            {/* Categories Chips */}
                            <Grid size={{ xs: 12, md: 6 }}>
                                <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 700, color: 'text.secondary' }}>CATEGORIES</Typography>
                                <Box display="flex" flexWrap="wrap" gap={1}>
                                    {categories.map(cat => (
                                        <Chip
                                            key={cat}
                                            label={cat}
                                            onClick={() => setActiveCategory(cat)}
                                            variant={activeCategory === cat ? 'filled' : 'outlined'}
                                            sx={{
                                                borderRadius: 2,
                                                fontWeight: 600,
                                                background: activeCategory === cat ? 'linear-gradient(135deg, #d946ef, #7c3aed)' : 'transparent',
                                                borderColor: activeCategory === cat ? 'transparent' : 'rgba(255,255,255,0.2)',
                                                '&:hover': { bgcolor: activeCategory === cat ? undefined : 'rgba(255,255,255,0.05)' }
                                            }}
                                        />
                                    ))}
                                </Box>
                            </Grid>

                            {/* Brands Select */}
                            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                                <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 700, color: 'text.secondary' }}>BRAND</Typography>
                                <TextField
                                    select
                                    fullWidth
                                    size="small"
                                    value={activeBrand}
                                    onChange={(e) => setActiveBrand(e.target.value)}
                                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }}
                                >
                                    {brands.map(brand => <MenuItem key={brand} value={brand}>{brand}</MenuItem>)}
                                </TextField>
                            </Grid>

                            {/* Price Ranges Select */}
                            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                                <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 700, color: 'text.secondary' }}>PRICE RANGE</Typography>
                                <TextField
                                    select
                                    fullWidth
                                    size="small"
                                    value={activePriceRange}
                                    onChange={(e) => setActivePriceRange(e.target.value)}
                                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }}
                                >
                                    {priceRanges.map(range => <MenuItem key={range} value={range}>{range}</MenuItem>)}
                                </TextField>
                            </Grid>
                        </Grid>
                    </Box>
                )}
            </CardContent>
        </Card>
    );
};

export default FiltersLayout;
