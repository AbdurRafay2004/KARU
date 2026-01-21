---
description: KARU Marketplace - Development Specification
---

KARU Marketplace - Complete Development Specification
=====================================================

1\. Project Classification
--------------------------

**PROJECT TYPE:** Web Application (SPA)**TARGET PLATFORM:** Web (Desktop-first, Mobile-responsive)**PRIMARY USERS:**

*   Artisan sellers looking for a dedicated platform to showcase handcrafted goods
    
*   Conscious buyers seeking unique, sustainable, handmade products
    
*   Craft enthusiasts who value storytelling and the human element in commerce
    

**CORE PROBLEM IT SOLVES:**Mass-market platforms like Etsy dilute the artisan story with algorithmic feeds and generic interfaces. KARU creates an intimate, editorial shopping experience that puts the maker's narrative first, connecting buyers who value craftsmanship with artisans who deserve a premium presentation for their work.

2\. Must-Have Features
----------------------

1.  **Product Marketplace** - Filterable grid of products with category/price/material/location filters
    
2.  **Artisan Profile Pages** - Rich storytelling pages with biography, process photos, and studio updates
    
3.  **Dual Dashboard System** - Separate seller analytics dashboard and customer order dashboard
    
4.  **Multi-step Shop Setup Wizard** - Onboarding flow for new sellers (Identity → Story → Policies → Payment)
    
5.  **Complete Checkout Flow** - Multi-page checkout with shipping and payment collection
    
6.  **Shopping Cart** - Persistent cart with add/remove functionality
    
7.  **Product Detail Pages** - Individual product views with gallery, description, and artisan info
    
8.  **Search Functionality** - Text search across products and artisan names
    
9.  **Responsive Design** - Mobile-optimized layouts for all pages
    
10.  **User Authentication** - Sign up/login for buyers and sellers
    

3\. Nice-to-Have Features
-------------------------

1.  Favorites/Wishlist system
    
2.  Order tracking with status updates
    
3.  Seller messaging system
    
4.  Review and rating system
    
5.  Advanced analytics charts (revenue trends, top products)
    
6.  Email notifications for orders
    
7.  Social sharing integration
    
8.  Multi-image upload with drag-and-drop
    
9.  Seller verification badges
    
10.  Gift wrapping options at checkout
    

4\. Key Constraints
-------------------

*   **Budget:** $0 (using free tiers and open-source tools)
    
*   **Timeline:** Prototype phase - prioritize visual fidelity over backend complexity
    
*   **Team:** Single developer + AI assistance
    
*   **Hosting:** Static hosting friendly (Vercel)
    
*   **No vendor lock-in:** Avoid platform-specific features that prevent migration
    

5\. Similar Apps/References
---------------------------

**Primary Reference:** The provided CraftedRoots design with earth tones, editorial typography, and storytelling focus**Inspiration:**

*   Etsy (marketplace functionality) - but with premium, curated aesthetic
    
*   Airbnb (rich profile pages) - for artisan storytelling
    
*   Shopify (checkout flow) - for payment UX patterns
    
*   Behance (portfolio layouts) - for process/work showcase
    

6\. Recommended Tech Stack
--------------------------

### Core Framework

Plain textANTLR4BashCC#CSSCoffeeScriptCMakeDartDjangoDockerEJSErlangGitGoGraphQLGroovyHTMLJavaJavaScriptJSONJSXKotlinLaTeXLessLuaMakefileMarkdownMATLABMarkupObjective-CPerlPHPPowerShell.propertiesProtocol BuffersPythonRRubySass (Sass)Sass (Scss)SchemeSQLShellSwiftSVGTSXTypeScriptWebAssemblyYAMLXML`   React 19 + TypeScript + Vite   `

### Styling

Plain textANTLR4BashCC#CSSCoffeeScriptCMakeDartDjangoDockerEJSErlangGitGoGraphQLGroovyHTMLJavaJavaScriptJSONJSXKotlinLaTeXLessLuaMakefileMarkdownMATLABMarkupObjective-CPerlPHPPowerShell.propertiesProtocol BuffersPythonRRubySass (Sass)Sass (Scss)SchemeSQLShellSwiftSVGTSXTypeScriptWebAssemblyYAMLXML`   Tailwind CSS v3 (with custom configuration)   `

**Rationale:**

*   Utility-first approach matches the rapid prototyping needs
    
*   Custom theme supports the earth-tone design system
    
*   Container queries plugin for advanced responsive design
    

### Icons & Assets

Plain textANTLR4BashCC#CSSCoffeeScriptCMakeDartDjangoDockerEJSErlangGitGoGraphQLGroovyHTMLJavaJavaScriptJSONJSXKotlinLaTeXLessLuaMakefileMarkdownMATLABMarkupObjective-CPerlPHPPowerShell.propertiesProtocol BuffersPythonRRubySass (Sass)Sass (Scss)SchemeSQLShellSwiftSVGTSXTypeScriptWebAssemblyYAMLXML`   Google Material Symbols Outlined  Unsplash API for placeholder images (prototype)   `

### Fonts

Plain textANTLR4BashCC#CSSCoffeeScriptCMakeDartDjangoDockerEJSErlangGitGoGraphQLGroovyHTMLJavaJavaScriptJSONJSXKotlinLaTeXLessLuaMakefileMarkdownMATLABMarkupObjective-CPerlPHPPowerShell.propertiesProtocol BuffersPythonRRubySass (Sass)Sass (Scss)SchemeSQLShellSwiftSVGTSXTypeScriptWebAssemblyYAMLXML`   Google Fonts:  - Epilogue (Headings - modern, geometric)  - Manrope (Body - readable, warm)  - Noto Serif (Accents - editorial touch)   `