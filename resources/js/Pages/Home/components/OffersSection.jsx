// resources/js/Pages/Home/components/OffersSection.jsx

import { motion } from "framer-motion";
import { Link } from "@inertiajs/react";
import { ArrowRight } from "lucide-react"; // ← استورد هنا
import OfferCard from "./OfferCard";
import Pagination from "./Pagination";

export default function OffersSection({
    offers,
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
        <section className={`py-16 ${isDarkMode ? "bg-gray-900" : "bg-white"}`}>
            <div className="max-w-7xl mx-auto px-6 md:px-16">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <div className="flex items-center justify-between mb-10">
                        <div>
                            <h2
                                className={`text-3xl font-bold ${
                                    isDarkMode ? "text-white" : "text-gray-900"
                                }`}
                            >
                                {translations.offers_section_title ||
                                    "Featured Offers"}
                            </h2>
                            <p
                                className={`mt-2 ${
                                    isDarkMode
                                        ? "text-gray-400"
                                        : "text-gray-600"
                                }`}
                            >
                                {translations.offers_section_subtitle ||
                                    "Exclusive deals and promotions"}
                            </p>
                        </div>
                        <Link
                            href="/offers"
                            className="flex items-center gap-1 text-primary hover:underline"
                        >
                            {translations.view_all || "View All"}{" "}
                            <ArrowRight size={16} />
                        </Link>
                    </div>

                    {offers.length === 0 ? (
                        <div
                            className={`text-center py-8 ${
                                isDarkMode ? "text-gray-400" : "text-gray-500"
                            }`}
                        >
                            {translations.offers_empty_message ||
                                "No offers available at the moment."}
                        </div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
                        >
                            {offers.map((offer) => (
                                <OfferCard
                                    key={offer.id}
                                    offer={offer}
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
                </motion.div>
            </div>
        </section>
    );
}
