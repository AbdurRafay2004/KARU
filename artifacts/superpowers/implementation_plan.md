# Floating Action AI Chat Button

## Goal Description
Add a floating chat assistant button for buyers to get help. Due to cost constraints ("No money"), the initial implementation will use a rule-based/keyword-based logic to simulate an AI assistant, helping users with common queries (shipping, returns, order status, etc.) without external API costs.

## Proposed Changes
### Frontend Components
#### [NEW] [ChatWidget.tsx](file:///y:/Antigravity%20workspace/Handicraft%20Marketplace/KARU/src/components/layout/ChatWidget.tsx)
-   Floating Action Button (FAB) relative to viewport.
-   Chat window with message history.
-   Input field.
-   Logic for "Mock AI" responses.

#### [MODIFY] [Layout.tsx](file:///y:/Antigravity%20workspace/Handicraft%20Marketplace/KARU/src/components/layout/Layout.tsx)
-   Import and render `ChatWidget`.

### Logic
-   **Keywords**: "shipping", "return", "payment", "custom", "where is my order".
-   **Responses**: Pre-defined helpful text + links to relevant pages.

## Verification Plan
### Manual Verification
-   Click FAB -> Chat opens.
-   Type "shipping" -> Bot replies with shipping info.
-   Type "hello" -> Bot greets.
-   Verify responsive positioning (mobile/desktop).
