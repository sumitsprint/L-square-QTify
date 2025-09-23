import { useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import TopAlbumsSection from "./components/Section/TopAlbumsSection";
import NewAlbumsSection from "./components/Section/NewAlbumsSection";
import SongsSection from "./components/Section/SongsSection"; // ✅ FIXED

function App() {
  return (
    <>
      <Navbar />
      <main style={{ paddingTop: 24 }}>
        <Hero />
        <TopAlbumsSection />
        <NewAlbumsSection />
        <SongsSection />  {/* ✅ Now React knows this */}
      </main>
    </>
  );
}

export default App;
