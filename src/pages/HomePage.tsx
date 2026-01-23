import { HeroSection } from '../components/home/HeroSection';
import { TrendingSection } from '../components/home/TrendingSection';
import { CategorySection } from '../components/home/CategorySection';
import { FeaturedArtisan } from '../components/home/FeaturedArtisan';
import { JoinCommunity } from '../components/home/JoinCommunity';

export function HomePage() {
    return (
        <>
            <HeroSection />
            <TrendingSection />
            <CategorySection />
            <FeaturedArtisan />
            <JoinCommunity />
        </>
    );
}
