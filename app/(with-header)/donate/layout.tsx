import { Card } from '@/components/ui/card';

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section className="container flex h-full flex-col items-center justify-center py-4">
      <Card className="w-full max-w-lg border-0 md:border">{children}</Card>
    </section>
  );
}

export default Layout;
