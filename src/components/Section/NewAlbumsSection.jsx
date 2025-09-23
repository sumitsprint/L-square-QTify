// src/components/Section/NewAlbumsSection.jsx
import React, { useEffect, useState } from "react";
import styles from "./TopAlbumsSection.module.css"; // reuse same styles
import AlbumCard from "../Card/AlbumCard";
import axios from "axios";
import Carousel from "../Carousel/Carousel";

export default function NewAlbumsSection() {
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    let mounted = true;
    (async function load() {
      try {
        setLoading(true);
        const res = await axios.get("https://qtify-backend-labs.crio.do/albums/new");
        if (mounted) setAlbums(res.data || []);
      } catch (err) {
        console.error(err);
        if (mounted) setError(err);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => (mounted = false);
  }, []);

  if (loading) return <div className={styles.loading}>Loading new albums…</div>;
  if (error) return <div className={styles.error}>Could not load albums.</div>;

  return (
    <section className={styles.section} aria-labelledby="new-albums-heading">
      <div className={styles.header}>
        <h2 id="new-albums-heading">New Albums</h2>
        <button
          className={styles.collapseBtn}
          onClick={() => setShowAll((s) => !s)}
          aria-expanded={showAll}
        >
          {showAll ? "Show All" : "Collapse"}
        </button>
      </div>

      {!showAll ? (
        <div className={styles.grid}>
          {albums.map((a) => (
            <AlbumCard key={a.id} album={a} />
          ))}
        </div>
      ) : (
        <Carousel>
          {albums.map((a) => (
            <AlbumCard key={a.id} album={a} />
          ))}
        </Carousel>
      )}
    </section>
  );
}
