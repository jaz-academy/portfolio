import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Feature from "@/components/Feature";
import Stats from "@/components/Stats";
import Bento from "@/components/Bento";
import Centered from "@/components/Centered";
import Footer from "@/components/Footer";

export default function Home() {
  // error page test
  // throw new Error("Testing portfolio error boundary");

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
