# Changelog

All notable changes to this project will be documented in this file.

## [Unreleased]

### Current Status
✅ Product Image Upload Feature Implemented & Integrated.
✅ Marketplace navigation button added to Header.

### added
- Created `ImageUploader` component with drag-and-drop, clipboard paste, and URL support.
- Implemented `generateUploadUrl` mutation in `convex/admin.ts`.
- Updated `addProduct` and `updateProduct` mutations to handle storage IDs.
- Updated all product queries to resolve storage IDs to public URLs using a `resolveImages` helper.
- Added automatic cleanup of orphaned storage files when products are deleted.
- Added "Marketplace" navigation button to the header for quick access to product listings.

### Immediate Next Steps
- [ ] Verify image upload works after `npx convex dev` syncs the new mutations.
- [ ] Test edge cases (multiple files, very large files, invalid URLs).

### Known Issues/Notes
- `isSubmitting` state in `AdminDashboardPage` currently covers the entire upload + save process.
- Need to ensure users are aware that `npx convex dev` must be running for storage mutations to exist.
