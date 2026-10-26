<div align="center">

<img src="public/logo-icon.png" alt="Bazar Dor logo" width="80" />

# বাজার দর · Bazar Dor

**Today's market prices in Bangladesh, all in one place.**

Daily prices for rice, lentils, oil, vegetables, fish, meat, eggs and spices: compared across markets, with lowest, highest and average prices and how they changed since yesterday.

</div>

---

## About the project

Bazar Dor (বাজার দর, "market price") is a Bengali-first web app that helps shoppers in Bangladesh check what everyday groceries cost today before they head to the market. It shows which prices went up or down today, lets you browse products by category, and breaks each product's price down market by market and division by division.

Price data comes from the Programming Hero Bazardor API. User accounts are handled with Better Auth and stored in MongoDB.

## Features

- **Live price ticker**: a scrolling bar under the header shows every product's current price and its daily change, with green and red arrows. Click any item to open its details.
- **Today's risers and fallers**: the home page highlights the six products whose prices rose the most and the six that dropped the most, followed by the full product list.
- **Browse by category**: a category menu (rice, lentils, vegetables, fish and more) leads to a page for each category, listing its products with today's price and percentage change.
- **Market-wise price details**: each product page shows the lowest, highest and average price, how much the price changed since yesterday, and a table comparing prices across markets and divisions, sorted from cheapest to most expensive.
- **Accounts and sign-in**: sign up with email and password, then sign in, or continue with Google or GitHub. Form validation catches problems early, such as an invalid email, a weak password or passwords that don't match, and toast notifications confirm every sign-in, sign-up, sign-out and validation error.
- **Profile page**: signed-in users can view their account, update their name and sign out. The page is protected, so signed-out visitors are sent to the sign-in page.
- **Bengali-first interface**: all text, units (কেজি, লিটার, ডজন, পিস) and numbers are shown in Bengali, using the Noto Serif Bengali font.
- **Responsive design**: the layout adapts to mobile, tablet and desktop. On phones the category menu becomes a swipeable row and page sections stack vertically.
- **Skeleton loaders and 404 pages**: each page shows a skeleton of its own layout while data loads, and friendly Bengali "not found" screens (including one for unknown categories) link back home.

## Technologies used

| Area | Technology |
| --- | --- |
| Framework | [Next.js 16](https://nextjs.org) (App Router, Server Components) |
| UI library | [React 19](https://react.dev) |
| Language | [TypeScript](https://www.typescriptlang.org) |
| Styling | [Tailwind CSS 4](https://tailwindcss.com), [daisyUI 5](https://daisyui.com) |
| Components | [HeroUI](https://heroui.com) (forms, cards, dropdowns, toasts) |
| Authentication | [Better Auth](https://better-auth.com) (email/password, Google and GitHub OAuth) |
| Database | [MongoDB](https://www.mongodb.com) with the Better Auth Mongo adapter |
| Icons | [Lucide React](https://lucide.dev), [React Icons](https://react-icons.github.io/react-icons) |
| Extras | `react-marquee-text` for the price ticker, `next/font` (Noto Serif Bengali) |
| Data source | Programming Hero Bazardor API |

## Pages

| Route | Description |
| --- | --- |
| `/` | Banner, today's price risers and fallers, and all products |
| `/category/[categoryId]` | Products in one category |
| `/products/[productsId]` | Price summary and market-wise price table for one product |
| `/signin`, `/signup` | Sign in or create an account |
| `/profile` | Account details and name update (signed-in users only) |

## Getting started

### Prerequisites

- Node.js 20 or newer
- A MongoDB database (local or [MongoDB Atlas](https://www.mongodb.com/atlas))
- Google and GitHub OAuth credentials, for social sign-in

### Installation

```bash
git clone https://github.com/arifdotdev/bazar-dor-website.git
cd bazar-dor-website
npm install
```

### Environment variables

Create a `.env` file in the project root:

```env
BETTER_AUTH_SECRET=your_random_secret
BETTER_AUTH_URL=http://localhost:3000
MONGODB_URI=your_mongodb_connection_string
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
```

OAuth callback URLs to register with each provider:

- Google: `http://localhost:3000/api/auth/callback/google`
- GitHub: `http://localhost:3000/api/auth/callback/github`

### Run the app

```bash
npm run dev      # start the dev server at http://localhost:3000
npm run build    # create a production build
npm start        # run the production build
npm run lint     # check the code with ESLint
```

## Project structure

```
src/
├── app/
│   ├── (authPage)/        # sign in, sign up and profile pages
│   ├── HomePage/          # home page product sections
│   ├── api/auth/          # Better Auth API route
│   ├── category/          # category pages
│   ├── products/          # product details pages
│   ├── layout.tsx         # root layout: header, ticker, footer
│   ├── loading.tsx        # loading screen
│   └── not-found.tsx      # 404 page
├── components/            # Header, Footer, Banner, NavLink, ProductCard, ...
└── lib/                   # Better Auth server and client setup
```
