import { Head } from "@inertiajs/react";
import Navbar from "../../Components/Nav";
import Footer from "../../Components/Footer";
import useHomeLogic from "./hooks/useHomeLogic";
import HeroCarousel from "./components/HeroCarousel";
import JourneyPlanner from "./components/JourneyPlanner";
import OffersSection from "./components/OffersSection";
import DestinationsSection from "./components/DestinationsSection";
import BenefitsSection from "./components/BenefitsSection";

export default function HomePage({
    auth,

    favorites: initialFavorites = [],
    heroSections = [],
    offers = [],
    destinations = [],
    packages = [],
    translations = {},
}) {
    const logic = useHomeLogic({
        auth,
        heroSections,
        initialFavorites,
        offers,
        destinations,
        packages,
        translations,
    });

    return (
        <div
            className={`min-h-screen transition-colors duration-300 ${
                logic.isDarkMode ? "dark bg-[#1F1F1F]" : "bg-[#F9F9F9]"
            } font-montserrat`}
        >
            <Head title="JOOD - Your Adventure Awaits">
                <meta
                    name="description"
                    content="Discover unforgettable trips with JOOD."
                />
            </Head>

            <Navbar
                isDarkMode={logic.isDarkMode}
                toggleDarkMode={() => logic.setIsDarkMode(!logic.isDarkMode)}
            />

            <HeroCarousel
                heroSections={heroSections}
                currentSlide={logic.currentSlide}
                setCurrentSlide={logic.setCurrentSlide}
                isDarkMode={logic.isDarkMode}
                scrollToSearch={() =>
                    logic.searchRef.current?.scrollIntoView({
                        behavior: "smooth",
                    })
                }
            />

            <JourneyPlanner
                searchQuery={logic.searchQuery}
                setSearchQuery={logic.setSearchQuery}
                selectedCategory={logic.selectedCategory}
                setSelectedCategory={logic.setSelectedCategory}
                suggestions={logic.suggestions}
                calculateDiscount={logic.calculateDiscount}
                isDarkMode={logic.isDarkMode}
                translations={logic.translations}
                searchRef={logic.searchRef}
                handleSurpriseMe={logic.handleSurpriseMe}
            />

            <OffersSection
                offers={logic.paginatedOffers}
                totalPages={logic.totalOfferPages}
                currentPage={logic.offerPage}
                setPage={logic.setOfferPage}
                translations={logic.translations}
                isDarkMode={logic.isDarkMode}
                toggleFavorite={logic.toggleFavorite}
                favorites={logic.favorites}
                loadingFavorite={logic.loadingFavorite}
            />

            <DestinationsSection
                destinations={logic.paginatedDestinations}
                totalPages={logic.totalDestinationPages}
                currentPage={logic.destinationPage}
                setPage={logic.setDestinationPage}
                translations={logic.translations}
                isDarkMode={logic.isDarkMode}
                toggleFavorite={logic.toggleFavorite}
                favorites={logic.favorites}
                loadingFavorite={logic.loadingFavorite}
            />

            <BenefitsSection
                translations={logic.translations}
                isDarkMode={logic.isDarkMode}
            />

            <Footer isDarkMode={logic.isDarkMode} />
        </div>
    );
}
