
interface DBObject {
  id: string;
  [key: string]: any;
}

const PRODUCTS_COUNT = 50;
const ARTISANS_COUNT = 5; // High duplication

// Mock Data
const artisans: DBObject[] = Array.from({ length: ARTISANS_COUNT }, (_, i) => ({
  id: `artisan_${i}`,
  name: `Artisan ${i}`,
  slug: `artisan-${i}`,
}));

const products: DBObject[] = Array.from({ length: PRODUCTS_COUNT }, (_, i) => ({
  id: `product_${i}`,
  name: `Product ${i}`,
  artisanId: `artisan_${i % ARTISANS_COUNT}`, // Distribute artisans
}));

const wishlistProductIds = products.map(p => p.id);

// Mock DB
let dbCalls = 0;
const LATENCY_MS = 10; // 10ms latency per call

const db = {
  get: async (id: string): Promise<DBObject | null> => {
    dbCalls++;
    await new Promise(resolve => setTimeout(resolve, LATENCY_MS));
    if (id.startsWith("product_")) return products.find(p => p.id === id) || null;
    if (id.startsWith("artisan_")) return artisans.find(a => a.id === id) || null;
    return null;
  }
};

async function unoptimized() {
  dbCalls = 0;
  const start = performance.now();

  const result = await Promise.all(
    wishlistProductIds.map(async (productId) => {
      const product = await db.get(productId);
      if (!product) return null;
      const artisan = await db.get(product.artisanId);
      return { ...product, artisan };
    })
  );

  const end = performance.now();
  console.log(`[Unoptimized] Time: ${(end - start).toFixed(2)}ms, DB Calls: ${dbCalls}`);
  return result;
}

async function optimized() {
  dbCalls = 0;
  const start = performance.now();

  // 1. Fetch products
  const productList = await Promise.all(wishlistProductIds.map(id => db.get(id)));

  // 2. Filter valid
  const validProducts = productList.filter((p): p is DBObject => p !== null);

  // 3. Collect artisan IDs
  const artisanIds = [...new Set(validProducts.map(p => p.artisanId))];

  // 4. Fetch artisans
  const artisanList = await Promise.all(artisanIds.map(id => db.get(id)));

  // 5. Map
  const artisansMap = new Map();
  artisanIds.forEach((id, index) => artisansMap.set(id, artisanList[index]));

  const result = validProducts.map(product => {
    const artisan = artisansMap.get(product.artisanId);
    return { ...product, artisan };
  });

  const end = performance.now();
  console.log(`[Optimized]   Time: ${(end - start).toFixed(2)}ms, DB Calls: ${dbCalls}`);
  return result;
}

async function run() {
  console.log(`Running benchmark with ${PRODUCTS_COUNT} products and ${ARTISANS_COUNT} artisans.`);
  console.log("---------------------------------------------------");
  await unoptimized();
  await optimized();
}

run().catch(console.error);
