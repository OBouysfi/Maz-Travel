import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import WhatsappFloat from '@/components/layout/WhatsappFloat';
import ScrollReveal from '@/components/layout/ScrollReveal';

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="min-h-screen">{children}</main>
      <Footer />
      <WhatsappFloat />
      <ScrollReveal />
    </>
  );
}