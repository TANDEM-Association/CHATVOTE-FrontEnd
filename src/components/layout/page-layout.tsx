import { Footer } from "./footer";
import { Header } from "./header";

type PageLayoutProps = {
  children: React.ReactNode;
};

export const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
  return (
    <div className="relative flex size-full flex-col">
      <Header />
      <main className="mx-auto min-h-[calc(100vh-var(--header-height)-var(--footer-height))] w-full max-w-xl grow px-4 pb-8 md:px-0">
        {children}
      </main>
      <Footer />
    </div>
  );
};
