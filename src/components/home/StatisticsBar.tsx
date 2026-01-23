import { Users, Package, Heart, MapPin } from "lucide-react";

export const StatisticsBar = () => {
    const stats = [
        { label: 'Artisans', value: '50+', icon: Users },
        { label: 'Handcrafted Items', value: '500+', icon: Package },
        { label: 'Happy Customers', value: '1000+', icon: Heart },
        { label: 'Districts Covered', value: '64', icon: MapPin }
    ];

    return (
        <section className="bg-gradient-earth text-white py-16 md:py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 text-center">
                    {stats.map((stat, i) => {
                        const Icon = stat.icon;
                        return (
                            <div
                                key={i}
                                className="animate-slide-up will-animate"
                                style={{ animationDelay: `${i * 100}ms` }}
                            >
                                <Icon className="w-12 h-12 md:w-14 md:h-14 mx-auto mb-4 text-karu-amber" />
                                <div className="font-display text-4xl md:text-5xl font-bold mb-2">
                                    {stat.value}
                                </div>
                                <div className="text-sm md:text-base uppercase tracking-wider opacity-80">
                                    {stat.label}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default StatisticsBar;
