// src/App.jsx
import React from "react";
import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
// import mockAlbums from "./data/mockAlbums";
import TopAlbumsSection from "./components/Section/TopAlbumsSection";

function App() {
  return (
    <>
     <Navbar searchData={[]} />
      <main style={{ paddingTop: 24 }}>
        <Hero />
        {/* future: album carousels, songs, FAQ, player */}
         <TopAlbumsSection />
      </main>
    </>
  );
}

export default App;
