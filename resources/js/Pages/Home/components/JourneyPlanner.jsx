import { Search, X, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import SearchSuggestions from "./SearchSuggestions";

export default function JourneyPlanner({
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    suggestions,
    calculateDiscount,
    isDarkMode,
    translations,
    searchRef,
    handleSurpriseMe,
}) {
    const categories = [
        { name: "All", icon: "Compass" },
        { name: "Beach", icon: "Umbrella" },
        { name: "Adventure", icon: "MapPin" },
        { name: "Cultural", icon: "Building" },
        { name: "Historical", icon: "Clock" },
        { name: "Wildlife", icon: "Globe2" },
        { name: "Mountain", icon: "Mountain" },
    ];

    return (
        <section ref={searchRef} className="py-16 bg-white dark:bg-[#1F1F1F]">
            <div className="max-w-6xl mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className={`bg-white dark:bg-gray-900 rounded-3xl p-8 shadow-2xl border ${
                        isDarkMode ? "border-gray-700" : "border-gray-200"
                    }`}
                >
                    <h2 className="text-4xl font-bold text-center mb-4 text-primary">
                        {translations.journey_planner_title ||
                            "Discover Your Next Adventure"}
                    </h2>

                    <div className="relative max-w-3xl mx-auto mb-8">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-primary" />
                        <input
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder={
                                translations.search_placeholder || "Search..."
                            }
                            className="w-full pl-12 pr-12 py-4 rounded-full border bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white"
                        />
                        {searchQuery && (
                            <button
                                onClick={() => setSearchQuery("")}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                            >
                                <X />
                            </button>
                        )}
                    </div>

                    <div className="flex flex-wrap justify-center gap-3 mb-8">
                        {categories.map((cat) => (
                            <button
                                key={cat.name}
                                onClick={() =>
                                    setSelectedCategory(cat.name.toLowerCase())
                                }
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                                    selectedCategory === cat.name.toLowerCase()
                                        ? "bg-primary text-white"
                                        : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                                }`}
                            >
                                {cat.name}
                            </button>
                        ))}
                        <button
                            onClick={handleSurpriseMe}
                            className="px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-full flex items-center gap-2 shadow-md"
                        >
                            <Sparkles />{" "}
                            {translations.surprise_me || "Surprise Me"}
                        </button>
                    </div>

                    <AnimatePresence>
                        {suggestions.length > 0 && (
                            <SearchSuggestions
                                suggestions={suggestions}
                                calculateDiscount={calculateDiscount}
                                isDarkMode={isDarkMode}
                            />
                        )}
                    </AnimatePresence>
                </motion.div>
            </div>
        </section>
    );
}
