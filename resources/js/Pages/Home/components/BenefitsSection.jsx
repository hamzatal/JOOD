import { motion } from "framer-motion";
import { Tag, Shield, Award, Users } from "lucide-react";

export default function BenefitsSection({ translations, isDarkMode }) {
    const benefits = translations.benefits || [
        {
            title: "Best Price Guarantee",
            description:
                "We guarantee the best prices compared to anywhere else.",
        },
        {
            title: "Secure Booking",
            description:
                "Your personal information and payments are always protected.",
        },
        {
            title: "High-Quality Service",
            description: "Our support team is available 24/7 to assist you.",
        },
        {
            title: "Loyalty Rewards",
            description:
                "Earn points with every booking and enjoy exclusive benefits.",
        },
    ];

    const icons = [Tag, Shield, Award, Users];

    return (
        <section
            className={`py-20 ${
                isDarkMode
                    ? "bg-gray-900"
                    : "bg-gradient-to-b from-white to-gray-50"
            }`}
        >
            <div className="max-w-7xl mx-auto px-6 md:px-16">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <h2
                        className={`text-3xl font-bold mb-12 text-center ${
                            isDarkMode ? "text-white" : "text-gray-900"
                        }`}
                    >
                        {translations.benefits_section_title ||
                            "Why Choose JOOD"}
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {benefits.map((benefit, index) => {
                            const Icon = icons[index];
                            return (
                                <motion.div
                                    key={index}
                                    whileHover={{ y: -5 }}
                                    className={`p-6 rounded-xl ${
                                        isDarkMode
                                            ? "bg-gray-800 hover:bg-gray-700"
                                            : "bg-white hover:bg-gray-50"
                                    } shadow-md hover:shadow-lg transition-all`}
                                >
                                    <div
                                        className={`inline-flex items-center justify-center p-4 rounded-full mb-6 ${
                                            isDarkMode
                                                ? "bg-blue-900 text-blue-400"
                                                : "bg-blue-100 text-blue-600"
                                        }`}
                                    >
                                        <Icon size={24} />
                                    </div>
                                    <h3 className="text-xl font-semibold mb-3">
                                        {benefit.title}
                                    </h3>
                                    <p
                                        className={
                                            isDarkMode
                                                ? "text-gray-300"
                                                : "text-gray-600"
                                        }
                                    >
                                        {benefit.description}
                                    </p>
                                </motion.div>
                            );
                        })}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
