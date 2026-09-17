# 🎨 UI/UX Design System Tokens (`docs/design-system.md`)

This document defines the visual constraints, theme variables, and style guidelines for the application. All UI components and visual representations MUST strictly derive their parameters from the tokens defined here.

> ✅ **ملاحظة توافق (6 سبتمبر 2026):** بخلاف باقي الملفات المرفوعة بنفس الدفعة، هذا المعيار **يطابق واقعنا الحالي فعليًا** — تأكدنا بالتدقيق عبر الجلسة: صفر hex مكتوب يدويًا بالمكوّنات، كل الألوان عبر tokens دلالية بـ`src/styles.css`. يكمّل (لا يستبدل) `docs/design/design-system.md` الموجود أصلاً — هذا الملف قواعد الانضباط بالـtokens، وذاك تفاصيل الـtokens نفسها.

---

## 1. The Design Token Principle (Single Source of Truth)

To ensure cohesive branding, prevent style duplication, and enable painless white-label retheming:

1. **NO Hardcoded Hex Codes:** Directly writing hex colors (e.g., `#3b82f6`) in Tailwind classes (e.g., `text-[#3b82f6]`) is STRICTLY FORBIDDEN.
2. **Abstract Naming:** Styles must always be referenced by their semantic function (e.g., `bg-primary`, `text-muted-foreground`, `border-input`).
3. **Values Isolation:** All visual values live in standard CSS variables inside the global CSS stylesheet and map straight into Tailwind configuration.

---

## 2. CSS Variable Definitions (`src/styles/globals.css`)

Copy this baseline configuration into the project's global stylesheet. Modifying these values immediately shapes the entire visual identity of the project safely.

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    /* Base Colors - Soft Neutral Light Mode */
    --background: 0 0% 100%; /* Pure White */
    --foreground: 222.2 84% 4.9%; /* Near Black */

    /* Card & Container Elements */
    --card: 0 0% 100%;
    --card-foreground: 222.2 84% 4.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 222.2 84% 4.9%;

    /* Semantic Branding Tokens */
    --primary: 221.2 83.2% 53.3%; /* Primary Indigo/Blue */
    --primary-foreground: 210 40% 98%; /* Contrasting text on Primary */

    --secondary: 210 40% 96.1%; /* Muted Secondary Gray */
    --secondary-foreground: 222.2 47.4% 11.2%;

    /* Supporting Accent Elements */
    --accent: 210 40% 96.1%;
    --accent-foreground: 222.2 47.4% 11.2%;

    --muted: 210 40% 96.1%;
    --muted-foreground: 215.4 16.3% 46.9%; /* Lighter gray for secondary text */

    /* Functional Action States */
    --destructive: 0 84.2% 60.2%; /* Warning/Error Red */
    --destructive-foreground: 210 40% 98%;

    --success: 142.1 76.2% 36.3%; /* Success Green */
    --success-foreground: 355.7 100% 97.3%;

    /* Structural Accents */
    --border: 214.3 31.8% 91.4%; /* Border lines */
    --input: 214.3 31.8% 91.4%; /* Form fields border */
    --ring: 221.2 83.2% 53.3%; /* Focus rings */

    /* Typography & Radius Defaults */
    --font-sans: "Inter", system-ui, sans-serif;
    --radius: 0.5rem; /* Uniform Rounded Corner */
  }

  /* Built-in Dark Mode Support */
  .dark {
    --background: 222.2 84% 4.9%; /* Deep Charcoal */
    --foreground: 210 40% 98%; /* Soft White */

    --card: 222.2 84% 4.9%;
    --card-foreground: 210 40% 98%;
    --popover: 222.2 84% 4.9%;
    --popover-foreground: 210 40% 98%;

    --primary: 217.2 91.2% 59.8%;
    --primary-foreground: 222.2 47.4% 11.2%;

    --secondary: 217.2 32.6% 17.5%;
    --secondary-foreground: 210 40% 98%;

    --accent: 217.2 32.6% 17.5%;
    --accent-foreground: 210 40% 98%;

    --muted: 217.2 32.6% 17.5%;
    --muted-foreground: 215 20.2% 65.1%;

    --border: 217.2 32.6% 17.5%;
    --input: 217.2 32.6% 17.5%;
    --ring: 224.3 76.3% 48%;
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground font-sans antialiased;
    font-family: var(--font-sans);
  }
}
```

---

## 3. Tailwind Configuration Integration (`tailwind.config.js`)

Ensure the CSS variables are registered correctly in your `tailwind.config.js` or `tailwind.config.ts` to expose them as utility classes.

```javascript
module.exports = {
  darkMode: ["class"],
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: { "2xl": "1400px" },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
```

---

## 4. Spacing, Typography & Motion Tokens

To maintain structure and prevent layout chaos, follow these standard presets:

### 📐 A. Spacing & Sizing Scale

- **Content Padding:** `p-4` or `p-6` for normal layouts. Do not use random pixel sizing (e.g. `p-[17px]`).
- **Component Gap:** `space-y-4` or `space-y-6` to handle vertical gaps in lists.
- **Layout Grid:** Use standard responsive column counts: `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6`.

### ✍️ B. Typography Presets

- **Page Titles:** `text-3xl font-extrabold tracking-tight`
- **Card Titles:** `text-lg font-semibold leading-none`
- **Standard Body:** `text-sm text-foreground`
- **Secondary / Descriptive Metadata:** `text-xs text-muted-foreground`

### 🌀 C. Interactive & Animation States

- **Smooth Transitions:** Every clickable component MUST have smooth transitions: `transition-all duration-200 ease-in-out`.
- **State Hover / Active:** All elements must define explicit interaction styles:
  - Buttons: `hover:bg-primary/90 focus-visible:ring-2 focus-visible:ring-ring active:scale-95 disabled:pointer-events-none disabled:opacity-50`
- **Layout Motion Budget:** Heavy animations (e.g., Infinite CSS rotations, large scale spring transforms) are prohibited on mobile listings to protect core web vitals. Prefer subtle fade-ins (`animate-fade-in` or custom IntersectionObserver animations).
