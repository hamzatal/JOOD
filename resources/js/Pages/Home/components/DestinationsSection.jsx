import { motion } from "framer-motion";
import { Link } from "@inertiajs/react";
import DestinationCard from "./DestinationCard";
import Pagination from "./Pagination";
import { ArrowRight, Compass } from "lucide-react";
export default function DestinationsSection({
    destinations,
    totalPages,
    currentPage,
    setPage,
    translations,
    isDarkMode,
    toggleFavorite,
    favorites,
    loadingFavorite,
}) {
    return (
        <section
            className={`py-24 ${
                isDarkMode
                    ? "bg-gray-800"
                    : "bg-gradient-to-b from-gray-50 to-white"
            }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-12 text-center md:text-left"
                >
                    <div className="flex flex-col md:flex-row md:items-center justify-between">
                        <div>
                            <h2
                                className={`text-3xl md:text-4xl font-extrabold ${
                                    isDarkMode ? "text-white" : "text-gray-900"
                                }`}
                            >
                                {translations.destinations_section_title ||
                                    "Trending Destinations"}
                            </h2>
                            <p
                                className={`mt-3 text-lg ${
                                    isDarkMode
                                        ? "text-gray-300"
                                        : "text-gray-600"
                                }`}
                            >
                                {translations.destinations_subtitle ||
                                    "Discover our most popular vacation spots"}
                            </p>
                        </div>
                    </div>
                </motion.div>

                {destinations.length === 0 ? (
                    <div
                        className={`text-center py-16 ${
                            isDarkMode ? "text-gray-400" : "text-gray-500"
                        }`}
                    >
                        <Compass
                            size={48}
                            className="mx-auto mb-4 opacity-50"
                        />
                        <p className="text-lg font-medium">
                            {translations.destinations_empty_title ||
                                "No destinations available."}
                        </p>
                        <p className="mt-2">
                            {translations.destinations_empty_subtitle ||
                                "Check back later for new locations."}
                        </p>
                    </div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
                    >
                        {destinations.map((destination) => (
                            <DestinationCard
                                key={destination.id}
                                destination={destination}
                                translations={translations}
                                isDarkMode={isDarkMode}
                                calculateDiscount={(p, dp) => {
                                    if (!dp || p <= dp) return null;
                                    return Math.round(((p - dp) / p) * 100);
                                }}
                                toggleFavorite={toggleFavorite}
                                favorites={favorites}
                                loadingFavorite={loadingFavorite}
                            />
                        ))}
                    </motion.div>
                )}

                {totalPages > 1 && (
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={setPage}
                        isDarkMode={isDarkMode}
                    />
                )}

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                    className="text-center mt-12"
                >
                    <Link
                        href="/destinations"
                        className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-lg font-medium bg-gradient-to-r from-primary to-secondary text-white hover:scale-105 transform transition-all shadow-lg"
                    >
                        {translations.explore_all_destinations ||
                            "Explore All Destinations"}{" "}
                        <ArrowRight size={18} />
                    </Link>
                    <p
                        className={`mt-4 text-sm ${
                            isDarkMode ? "text-gray-400" : "text-gray-600"
                        }`}
                    >
                        {translations.over_200_destinations ||
                            "Over 200+ exotic locations to discover"}
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
