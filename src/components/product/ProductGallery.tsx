import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ProductGalleryProps {
    images: string[];
}

export function ProductGallery({ images }: ProductGalleryProps) {
    const [activeIndex, setActiveIndex] = useState(0);

    const nextImage = () => {
        setActiveIndex((prev) => (prev + 1) % images.length);
    };

    const prevImage = () => {
        setActiveIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    return (
        <div className="flex flex-col gap-4">
            {/* Main Image Container */}
            <div className="relative aspect-square rounded-karu-lg overflow-hidden bg-karu-sand group">
                <img
                    src={images[activeIndex]}
                    alt={`Product view ${activeIndex + 1}`}
                    className="w-full h-full object-cover transition-opacity duration-300"
                />

                {/* Navigation Arrows */}
                {images.length > 1 && (
                    <>
                        <button
                            onClick={prevImage}
                            className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/90 backdrop-blur-sm rounded-full opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity hover:bg-white"
                            aria-label="Previous image"
                        >
                            <ChevronLeft className="w-5 h-5 text-karu-charcoal" />
                        </button>
                        <button
                            onClick={nextImage}
                            className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/90 backdrop-blur-sm rounded-full opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity hover:bg-white"
                            aria-label="Next image"
                        >
                            <ChevronRight className="w-5 h-5 text-karu-charcoal" />
                        </button>
                    </>
                )}
            </div>

            {/* Thumbnails */}
            {images.length > 1 && (
                <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                    {images.map((image, index) => (
                        <button
                            key={index}
                            onClick={() => setActiveIndex(index)}
                            className={`relative flex-shrink-0 w-20 h-20 rounded-karu overflow-hidden border-2 transition-all ${activeIndex === index ? 'border-karu-terracotta' : 'border-transparent'
                                }`}
                        >
                            <img
                                src={image}
                                alt={`Thumbnail ${index + 1}`}
                                className="w-full h-full object-cover"
                            />
                            {activeIndex !== index && (
                                <div className="absolute inset-0 bg-white/20 hover:bg-transparent transition-colors" />
                            )}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
