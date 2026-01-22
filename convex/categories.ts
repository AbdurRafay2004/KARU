import { query } from "./_generated/server";

// Get all categories
export const list = query({
    args: {},
    handler: async (ctx) => {
        return await ctx.db.query("categories").collect();
    },
});
