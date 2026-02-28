# Best Practices - KARU Marketplace

## Frontend Development
- **Component Reusability**: Extract complex logic into reusable components (e.g., `ImageUploader`).
- **State Management**: Use `useState` for UI-local state and Convex `useQuery`/`useMutation` for global data synchronisation.
- **Handling Uploads**: 
    - Always provide multiple ways to upload (URL, Drag & Drop, Clipboard).
    - Use `URL.createObjectURL` for instant local previews, but remember to revoke them to avoid memory leaks.
    - Validate file size and type (MIME type) on the client side before triggering backend calls.
    - **Compress before uploading**: Use the Canvas API (`compressImage` utility in `ImageUploader.tsx`) to resize images to max 1600px and re-encode as JPEG (quality 0.85) before uploading to Convex Storage. This saves bandwidth and storage costs without any external library.

## Backend (Convex)
- **Security**: Never trust client-provided IDs for authorization. Use `auth.getUserId(ctx)` to derive the current user and their permissions.
- **Storage Management**: 
    - Resolve `storageId` to public URLs on the backend using `ctx.storage.getUrl` to keep the frontend clean.
    - Always implement cleanup logic (e.g., in `deleteProduct`) to remove files from Convex Storage when their references are deleted from the database.
- **Function Organization**: Keep admin-only mutations in `convex/admin.ts` and public queries in `convex/products.ts`.

## Styling
- **Brand Consistency**: Use the defined terracotta (`#C75D3C`) and charcoal (`#2D2A26`) colors.
- **Micro-Interactions**: Use Lucide icons and Tailwind animations (e.g., `animate-spin` for loaders, transitions on hover) to make the UI feel premium.
