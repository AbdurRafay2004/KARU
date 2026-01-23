export function ProductCardSkeleton() {
    return (
        <article className="bg-white rounded-2xl overflow-hidden shadow-sm">
            {/* Image skeleton */}
            <div className="aspect-square bg-gray-200 shimmer"></div>

            {/* Content skeleton */}
            <div className="p-4 space-y-3">
                {/* Product name */}
                <div className="h-5 bg-gray-200 rounded shimmer w-3/4"></div>

                {/* Artisan name */}
                <div className="h-4 bg-gray-200 rounded shimmer w-1/2"></div>

                {/* Price */}
                <div className="h-7 bg-gray-200 rounded shimmer w-20"></div>
            </div>
        </article>
    );
}
