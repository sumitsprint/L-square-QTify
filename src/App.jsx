// src/App.jsx
import React from "react";
import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import NewAlbumsSection from "./components/Section/NewAlbumsSection";
import TopAlbumsSection from "./components/Section/TopAlbumsSection";

function App() {
  return (
    <>
     <Navbar searchData={[]} />
      <main style={{ paddingTop: 24 }}>
        <Hero />
        {/* future: album carousels, songs, FAQ, player */}
         <TopAlbumsSection />
          <NewAlbumsSection />
      </main>
    </>
  );
}

export default App;
