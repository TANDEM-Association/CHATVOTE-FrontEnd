import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Swiper",
  description: "Chatvote Swiper - Trouvez le parti qui vous correspond.",
  openGraph: {
    title: "Swiper",
    description: "Chatvote Swiper - Trouvez le parti qui vous correspond.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Swiper",
    description: "Chatvote Swiper - Trouvez le parti qui vous correspond.",
  },
};

function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

export default Layout;
