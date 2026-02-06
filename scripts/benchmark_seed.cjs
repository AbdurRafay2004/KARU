// scripts/benchmark_seed.js
const { performance } = require('perf_hooks');

async function benchmark() {
    console.log("Starting benchmark for Database Insertions...");

    // Mock Context and DB
    const db = {
        insert: async (table, data) => {
            // Simulate network latency (e.g., 5ms per insert)
            // This is a realistic minimal latency for a remote DB call
            await new Promise(resolve => setTimeout(resolve, 5));
            return "id_" + Math.random().toString(36).substr(2, 9);
        }
    };
    const ctx = { db };

    // Generate dummy products
    const products = [];
    for (let i = 0; i < 100; i++) {
        products.push({
            name: `Product ${i}`,
            price: 100 * i
        });
    }

    console.log(`Processing ${products.length} items...`);

    // 1. Serial Execution (Baseline)
    console.log("\n--- Serial Execution (Baseline) ---");
    const startSerial = performance.now();
    for (const product of products) {
        await ctx.db.insert("products", product);
    }
    const endSerial = performance.now();
    const timeSerial = endSerial - startSerial;
    console.log(`Serial Time: ${timeSerial.toFixed(2)}ms`);


    // 2. Parallel Execution (Optimized)
    console.log("\n--- Parallel Execution (Optimized) ---");
    const startParallel = performance.now();
    await Promise.all(products.map(product => ctx.db.insert("products", product)));
    const endParallel = performance.now();
    const timeParallel = endParallel - startParallel;
    console.log(`Parallel Time: ${timeParallel.toFixed(2)}ms`);

    // Results
    const improvement = timeSerial / timeParallel;
    console.log(`\nSpeedup Factor: ${improvement.toFixed(2)}x`);

    if (timeParallel < timeSerial) {
        console.log("SUCCESS: Parallel execution is significantly faster.");
    } else {
        console.log("WARNING: No improvement detected (check simulation parameters).");
    }
}

benchmark().catch(console.error);
