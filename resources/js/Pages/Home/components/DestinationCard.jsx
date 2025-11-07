import { motion } from "framer-motion";
import { Heart, MapPin, Calendar, Users, ArrowRight } from "lucide-react";
import { Link } from "@inertiajs/react";

export default function DestinationCard({
    destination,
    translations,
    isDarkMode,
    calculateDiscount,
    toggleFavorite,
    favorites,
    loadingFavorite,
}) {
    return (
        <motion.div
            whileHover={{ y: -8 }}
            className={`rounded-2xl overflow-hidden shadow-lg ${
                isDarkMode
                    ? "bg-gray-800 border-gray-700"
                    : "bg-white border-gray-200"
            } border hover:shadow-xl transition-all group flex flex-col h-full`}
        >
            <div className="relative overflow-hidden h-56">
                <img
                    src={
                        destination.image ||
                        "/images/placeholder-destination.jpg"
                    }
                    alt={destination.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                    onError={(e) =>
                        (e.target.src = "/images/placeholder-destination.jpg")
                    }
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60"></div>
                <button
                    onClick={() =>
                        toggleFavorite(destination.id, "destination_id")
                    }
                    disabled={loadingFavorite[`destination_${destination.id}`]}
                    className={`absolute top-4 right-4 p-2 rounded-full backdrop-blur-sm transition-all ${
                        favorites[`destination_${destination.id}`]?.is_favorite
                            ? "bg-red-500 hover:bg-red-600"
                            : "bg-white/20 hover:bg-white/40"
                    }`}
                >
                    <Heart
                        size={18}
                        className={
                            favorites[`destination_${destination.id}`]
                                ?.is_favorite
                                ? "text-white fill-white"
                                : "text-white"
                        }
                    />
                </button>
                {calculateDiscount(
                    destination.price,
                    destination.discount_price
                ) && (
                    <div className="absolute top-16 right-0 bg-red-600 text-white px-3 py-1 rounded-l-full text-xs font-bold">
                        {calculateDiscount(
                            destination.price,
                            destination.discount_price
                        )}
                        % OFF
                    </div>
                )}
            </div>

            <div className="p-4 flex flex-col flex-grow">
                <h3
                    className={`text-lg font-semibold ${
                        isDarkMode ? "text-white" : "text-gray-900"
                    } line-clamp-1`}
                >
                    {destination.title}
                </h3>
                <p
                    className={`text-sm ${
                        isDarkMode ? "text-gray-300" : "text-gray-600"
                    } line-clamp-1`}
                >
                    {destination.company_name || "JOOD"}
                </p>
                <div className="flex items-center gap-2 mt-1">
                    <MapPin size={14} className="text-primary" />
                    <span
                        className={`text-sm ${
                            isDarkMode ? "text-gray-300" : "text-gray-600"
                        } line-clamp-1`}
                    >
                        {destination.location}
                    </span>
                </div>

                <div className="flex items-center gap-3 mb-3 mt-3">
                    <div className="flex items-center">
                        <Calendar
                            size={14}
                            className={
                                isDarkMode ? "text-gray-400" : "text-gray-500"
                            }
                        />
                        <span
                            className={`text-xs ${
                                isDarkMode ? "text-gray-400" : "text-gray-500"
                            } ml-1`}
                        >
                            {destination.duration || "3-7 days"}
                        </span>
                    </div>
                    <div className="flex items-center">
                        <Users
                            size={14}
                            className={
                                isDarkMode ? "text-gray-400" : "text-gray-500"
                            }
                        />
                        <span
                            className={`text-xs ${
                                isDarkMode ? "text-gray-400" : "text-gray-500"
                            } ml-1`}
                        >
                            {destination.group_size || "2-8 people"}
                        </span>
                    </div>
                </div>

                <div className="mt-auto pt-3 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-between">
                        <div>
                            <span
                                className={`block text-xs ${
                                    isDarkMode
                                        ? "text-gray-400"
                                        : "text-gray-500"
                                }`}
                            >
                                {translations.starting_from || "Starting from"}
                            </span>
                            <div className="flex items-baseline gap-1">
                                <span className="text-primary font-bold text-base">
                                    $
                                    {destination.discount_price ||
                                        destination.price}
                                </span>
                                {destination.discount_price && (
                                    <span
                                        className={`text-xs ${
                                            isDarkMode
                                                ? "text-gray-500"
                                                : "text-gray-400"
                                        } line-through`}
                                    >
                                        ${destination.price}
                                    </span>
                                )}
                                <span
                                    className={`text-xs ${
                                        isDarkMode
                                            ? "text-gray-400"
                                            : "text-gray-500"
                                    }`}
                                >
                                    {translations.per_night || "/ night"}
                                </span>
                            </div>
                        </div>
                        <Link
                            href={`/destinations/${destination.id}`}
                            className="flex items-center gap-1 px-3 py-2 bg-gradient-to-r from-primary to-secondary text-white rounded-lg text-sm font-medium shadow-md"
                        >
                            {translations.details || "Details"}{" "}
                            <ArrowRight size={16} />
                        </Link>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
