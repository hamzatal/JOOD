import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function useHomeLogic({
    auth,
    initialFavorites,
    offers,
    destinations,
    heroSections,
    packages,
    translations,
}) {
    const searchRef = useRef(null);

    const [isDarkMode, setIsDarkMode] = useState(() => {
        const saved = localStorage.getItem("darkMode");
        return saved !== null
            ? saved === "true"
            : window.matchMedia("(prefers-color-scheme: dark)").matches;
    });

    const [currentSlide, setCurrentSlide] = useState(0);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [suggestions, setSuggestions] = useState([]);
    const [offerPage, setOfferPage] = useState(1);
    const [destinationPage, setDestinationPage] = useState(1);

    const [favorites, setFavorites] = useState(() => {
        const init = {};
        initialFavorites.forEach((fav) => {
            const key = `${fav.favoritable_type.toLowerCase()}_${
                fav.favoritable_id
            }`;
            init[key] = { is_favorite: true, favorite_id: fav.id };
        });
        [...offers, ...destinations].forEach((item) => {
            const type = item.offer_id ? "offer" : "destination";
            const key = `${type}_${item.id}`;
            if (!init[key]) {
                init[key] = {
                    is_favorite: item.is_favorite || false,
                    favorite_id: item.favorite_id || null,
                };
            }
        });
        return init;
    });

    const [loadingFavorite, setLoadingFavorite] = useState({});

    const itemsPerPage = 4;

    useEffect(() => {
        localStorage.setItem("darkMode", isDarkMode);
        document.documentElement.classList.toggle("dark", isDarkMode);
    }, [isDarkMode]);

    useEffect(() => {
        if (heroSections?.length > 1) {
            const timer = setInterval(() => {
                setCurrentSlide((prev) => (prev + 1) % heroSections.length);
            }, 5000);
            return () => clearInterval(timer);
        }
    }, [heroSections]);

    const toggleFavorite = useCallback(
        async (itemId, itemType) => {
            if (!auth?.user) {
                toast.error("Please log in to add to favorites");
                return;
            }
            const key = `${itemType}_${itemId}`;
            const prev = favorites[key] || { is_favorite: false };
            setFavorites((p) => ({
                ...p,
                [key]: { ...p[key], is_favorite: !prev.is_favorite },
            }));
            setLoadingFavorite((p) => ({ ...p, [key]: true }));

            try {
                const res = await axios.post("/favorites", {
                    [itemType]: itemId,
                });
                setFavorites((p) => ({
                    ...p,
                    [key]: {
                        is_favorite: res.data.is_favorite,
                        favorite_id: res.data.favorite_id,
                    },
                }));
                toast.success(res.data.message);
            } catch (err) {
                toast.error(err.response?.data?.message || "Failed");
                setFavorites((p) => ({ ...p, [key]: prev }));
            } finally {
                setLoadingFavorite((p) => ({ ...p, [key]: false }));
            }
        },
        [auth, favorites]
    );

    useEffect(() => {
        const timer = setTimeout(() => {
            const q = searchQuery.toLowerCase();
            const items = [
                ...destinations.map((d) => ({
                    ...d,
                    type: "destination",
                    name: d.title,
                    location: d.location,
                })),
                ...offers.map((o) => ({
                    ...o,
                    type: "offer",
                    name: o.title,
                    location: o.destination_location,
                })),
                ...packages.map((p) => ({
                    ...p,
                    type: "package",
                    name: p.title,
                    location: p.destination_location,
                })),
            ];

            const filtered = items
                .filter(
                    (i) =>
                        (i.name?.toLowerCase().includes(q) ||
                            i.location?.toLowerCase().includes(q)) &&
                        (selectedCategory === "all" ||
                            i.category?.toLowerCase() === selectedCategory)
                )
                .slice(0, 3);
            setSuggestions(filtered);
        }, 300);
        return () => clearTimeout(timer);
    }, [searchQuery, selectedCategory, destinations, offers, packages]);

    const calculateDiscount = useCallback((p, dp) => {
        if (!dp || p <= dp) return null;
        return Math.round(((p - dp) / p) * 100);
    }, []);

    const handleSurpriseMe = useCallback(() => {
        const all = [...destinations, ...offers, ...packages];
        const shuffled = all.sort(() => Math.random() - 0.5).slice(0, 3);
        setSuggestions(shuffled);
    }, [destinations, offers, packages]);

    const paginatedOffers = useMemo(
        () =>
            offers.slice(
                (offerPage - 1) * itemsPerPage,
                offerPage * itemsPerPage
            ),
        [offers, offerPage]
    );

    const paginatedDestinations = useMemo(
        () =>
            destinations.slice(
                (destinationPage - 1) * itemsPerPage,
                destinationPage * itemsPerPage
            ),
        [destinations, destinationPage]
    );

    const totalOfferPages = Math.ceil(offers.length / itemsPerPage);
    const totalDestinationPages = Math.ceil(destinations.length / itemsPerPage);

    return {
        isDarkMode,
        setIsDarkMode,
        currentSlide,
        setCurrentSlide,
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        suggestions,
        offerPage,
        setOfferPage,
        destinationPage,
        setDestinationPage,
        favorites,
        toggleFavorite,
        loadingFavorite,
        searchRef,
        calculateDiscount,
        paginatedOffers,
        paginatedDestinations,
        totalOfferPages,
        totalDestinationPages,
        translations,
        handleSurpriseMe,
    };
}
