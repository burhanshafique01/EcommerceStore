# Faisal Hardware storefront

React + Vite + Tailwind CSS v4. No backend; the cart is saved in `localStorage`.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in dist/
```

## Where things live

| Path | What |
|---|---|
| `src/data/products.js` | **Catalog**: departments, sub-categories, and all products. Edit this. |
| `src/components/Logo.jsx` | Inline SVG logo (`variant="light" \| "dark"`, `iconOnly`) |
| `brand/faisal-hardware-logo.svg` | Standalone full logo |
| `brand/faisal-hardware-icon.svg` | Standalone icon mark (also `public/favicon.svg`) |
| `src/index.css` | Colour palette and fonts (`@theme` tokens: `brand-*`, `accent-*`, `steel-*`) |
| `src/pages/` | Home, Shop (listing + filters), ProductDetail, Cart |
| `src/context/CartContext.jsx` | Cart state + localStorage persistence |

## Adding real product photos

Put images in `public/images/` and set `image: '/images/your-file.jpg'` on the product.
Leave `image: ''` to keep the built-in placeholder.

## Palette

- Navy `#10274e` (brand-800): headers, prices, logo
- Signal red `#e3262f` (accent-500): calls to action, discounts
- Steel greys (`steel-*`): backgrounds, borders, text
