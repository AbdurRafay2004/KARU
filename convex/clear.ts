import { mutation } from "./_generated/server";

export const clearDatabase = mutation({
    args: {},
    handler: async (ctx) => {
        const artisans = await ctx.db.query("artisans").collect();
        for (const artisan of artisans) {
            await ctx.db.delete(artisan._id);
        }

        const products = await ctx.db.query("products").collect();
        for (const product of products) {
            await ctx.db.delete(product._id);
        }

        const categories = await ctx.db.query("categories").collect();
        for (const category of categories) {
            await ctx.db.delete(category._id);
        }

        return "Database cleared";
    },
});
