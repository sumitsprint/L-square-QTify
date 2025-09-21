// src/App.jsx
import React from "react";
import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import mockAlbums from "./data/mockAlbums";

function App() {
  return (
    <>
      <Navbar searchData={mockAlbums} />
      <main style={{ paddingTop: 24 }}>
        <Hero />
        {/* future: album carousels, songs, FAQ, player */}
      </main>
    </>
  );
}

export default App;
