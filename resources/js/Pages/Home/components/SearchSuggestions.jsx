import { motion } from "framer-motion";
import { Link } from "@inertiajs/react";

export default function SearchSuggestions({
    suggestions,
    calculateDiscount,
    isDarkMode,
}) {
    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
            {suggestions.map((item) => (
                <Link
                    key={`${item.type}-${item.id}`}
                    href={
                        item.type === "destination"
                            ? `/destinations/${item.id}`
                            : item.type === "offer"
                            ? `/offers/${item.id}`
                            : `/packages/${item.id}`
                    }
                    className={`relative p-4 rounded-xl border ${
                        isDarkMode
                            ? "bg-gray-800 border-gray-700"
                            : "bg-white border-gray-200"
                    } hover:shadow-lg transition-all`}
                >
                    <div className="flex items-center gap-4">
                        <img
                            src={item.image || "/images/placeholder-small.jpg"}
                            alt={item.title}
                            className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div>
                            <h3 className="font-semibold text-sm">
                                {item.title}
                            </h3>
                            <p className="text-xs text-gray-500">
                                {item.location}
                            </p>
                            <p className="text-primary font-medium">
                                ${item.discount_price || item.price}
                            </p>
                        </div>
                    </div>
                    {calculateDiscount(item.price, item.discount_price) && (
                        <div className="absolute top-2 right-2 bg-red-600 text-white text-xs px-2 py-1 rounded-full">
                            {calculateDiscount(item.price, item.discount_price)}
                            % OFF
                        </div>
                    )}
                </Link>
            ))}
        </motion.div>
    );
}
