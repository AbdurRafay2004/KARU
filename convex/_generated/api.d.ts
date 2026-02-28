/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type * as admin from "../admin.js";
import type * as ai_helpers from "../ai/helpers.js";
import type * as artisans from "../artisans.js";
import type * as auth from "../auth.js";
import type * as categories from "../categories.js";
import type * as clear from "../clear.js";
import type * as gemini from "../gemini.js";
import type * as http from "../http.js";
import type * as orders from "../orders.js";
import type * as products from "../products.js";
import type * as storage from "../storage.js";
import type * as userProfiles from "../userProfiles.js";
import type * as users from "../users.js";
import type * as wishlist from "../wishlist.js";

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";

declare const fullApi: ApiFromModules<{
  admin: typeof admin;
  "ai/helpers": typeof ai_helpers;
  artisans: typeof artisans;
  auth: typeof auth;
  categories: typeof categories;
  clear: typeof clear;
  gemini: typeof gemini;
  http: typeof http;
  orders: typeof orders;
  products: typeof products;
  storage: typeof storage;
  userProfiles: typeof userProfiles;
  users: typeof users;
  wishlist: typeof wishlist;
}>;

/**
 * A utility for referencing Convex functions in your app's public API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;

/**
 * A utility for referencing Convex functions in your app's internal API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = internal.myModule.myFunction;
 * ```
 */
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;

export declare const components: {};
