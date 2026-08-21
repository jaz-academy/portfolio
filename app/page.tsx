import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Feature from "@/components/Feature";
import Stats from "@/components/Stats";
import Bento from "@/components/Bento";
import Centered from "@/components/Centered";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Feature />
        <Stats />
        <Bento />
        <Centered />
      </main>
      <Footer />
    </>
  );
}
