import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Search } from "lucide-react";
import { Link } from "@inertiajs/react";

export default function HeroCarousel({
    heroSections,
    currentSlide,
    setCurrentSlide,
    isDarkMode,
    scrollToSearch,
}) {
    if (!heroSections.length)
        return (
            <div className="h-screen flex items-center justify-center bg-gray-200 dark:bg-gray-800">
                <p className="text-xl text-gray-600 dark:text-gray-300">
                    No hero images
                </p>
            </div>
        );

    return (
        <section className="relative h-screen overflow-hidden">
            <AnimatePresence initial={false}>
                <motion.div
                    key={currentSlide}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0"
                >
                    <img
                        src={
                            heroSections[currentSlide].image ||
                            "/images/placeholder-hero.jpg"
                        }
                        alt={heroSections[currentSlide].title}
                        className="w-full h-full object-cover"
                        onError={(e) =>
                            (e.target.src = "/images/placeholder-hero.jpg")
                        }
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
                </motion.div>
            </AnimatePresence>

            <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-6 z-10">
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
                >
                    {heroSections[currentSlide].title}
                </motion.h1>
                <p className="text-xl mb-8 max-w-3xl">
                    {heroSections[currentSlide].subtitle}
                </p>
                <div className="flex gap-4">
                    <Link
                        href="/booking"
                        className="px-8 py-4 bg-white text-gray-900 rounded-full font-bold hover:scale-105 transition"
                    >
                        Start Planning
                    </Link>
                    <button
                        onClick={scrollToSearch}
                        className="px-8 py-4 border-2 border-white rounded-full flex items-center gap-2 hover:bg-white/10 transition"
                    >
                        <Search size={20} /> Find Destination
                    </button>
                </div>
            </div>

            <button
                onClick={() =>
                    setCurrentSlide((p) =>
                        p === 0 ? heroSections.length - 1 : p - 1
                    )
                }
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 p-3 rounded-full hover:bg-white/30"
            >
                <ArrowLeft />
            </button>
            <button
                onClick={() =>
                    setCurrentSlide((p) => (p + 1) % heroSections.length)
                }
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 p-3 rounded-full hover:bg-white/30"
            >
                <ArrowRight />
            </button>

            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-2">
                {heroSections.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setCurrentSlide(i)}
                        className={`h-1 rounded-full transition-all ${
                            i === currentSlide
                                ? "w-8 bg-white"
                                : "w-3 bg-white/50"
                        }`}
                    />
                ))}
            </div>
        </section>
    );
}
