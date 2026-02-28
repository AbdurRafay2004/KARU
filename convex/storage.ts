import type { Id } from "./_generated/dataModel";

/**
 * Helper to resolve image storage IDs to URLs.
 * If the image is a storage ID (doesn't start with http), it resolves it to a public URL.
 * If it's already a URL, it leaves it alone.
 */
export async function resolveImages(ctx: any, images: string[]) {
    return await Promise.all(
        images.map(async (image) => {
            if (!image.startsWith("http")) {
                const url = await ctx.storage.getUrl(image as Id<"_storage">);
                return url || image;
            }
            return image;
        })
    );
}
