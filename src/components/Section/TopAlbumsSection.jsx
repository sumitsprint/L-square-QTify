// src/components/Section/TopAlbumsSection.jsx
import React, { useEffect, useState } from "react";
import styles from "./TopAlbumsSection.module.css";
import AlbumCard from "../Card/AlbumCard";
import Carousel from "../Carousel/Carousel";
import axios from "axios";

export default function TopAlbumsSection() {
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    let mounted = true;
    async function load() {
      try {
        setLoading(true);
        const res = await axios.get("https://qtify-backend-labs.crio.do/albums/top");
        if (mounted) {
          setAlbums(res.data || []);
        }
      } catch (err) {
        console.error("Failed to load top albums", err);
        if (mounted) setError(err);
      } finally {
        if (mounted) setLoading(false);
      }
    }
    load();
    return () => {
      mounted = false;
    };
  }, []);

  if (loading) return <div className={styles.loading}>Loading top albums…</div>;
  if (error) return <div className={styles.error}>Failed to load top albums.</div>;

  return (
    <section className={styles.section} aria-labelledby="top-albums-heading">
      <div className={styles.header}>
        <h2 id="top-albums-heading">Top Albums</h2>
        <button
          className={styles.collapseBtn}
          onClick={() => setShowAll((s) => !s)}
          aria-expanded={showAll}
        >
          {showAll ? "Collapse" : "Show All"}
        </button>
      </div>

      {showAll ? (
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
