import { Header } from './Header';
import { Footer } from './Footer';
import { ChatWidget } from './ChatWidget';
import { ScrollToTop } from './ScrollToTop';

interface LayoutProps {
    children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
    return (
        <div className="min-h-screen flex flex-col">
            <ScrollToTop />
            <Header />
            <main className="flex-1">
                {children}
            </main>
            <Footer />
            <ChatWidget />
        </div>
    );
}
