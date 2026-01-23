import { HeroSection } from '../components/home/HeroSection';
import { StatisticsBar } from '../components/home/StatisticsBar';
import { TrendingSection } from '../components/home/TrendingSection';
import { CategorySection } from '../components/home/CategorySection';
import { FeaturedArtisan } from '../components/home/FeaturedArtisan';
import { JoinCommunity } from '../components/home/JoinCommunity';

export function HomePage() {
    return (
        <>
            <HeroSection />
            <StatisticsBar />
            <TrendingSection />
            <CategorySection />
            <FeaturedArtisan />
            <JoinCommunity />
        </>
    );
}
