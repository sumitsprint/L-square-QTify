// src/components/Section/SongsSection.jsx
import React, { useEffect, useState } from "react";
import styles from "./TopAlbumsSection.module.css"; // reuse existing styles
import AlbumCard from "../Card/AlbumCard";
import Carousel from "../Carousel/Carousel";
import axios from "axios";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

/**
 * Robust SongsSection that tolerates different API shapes.
 */
export default function SongsSection() {
  const [genres, setGenres] = useState([]); // normalized: [{key,label}, ...]
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedGenre, setSelectedGenre] = useState("all");

  useEffect(() => {
    let mounted = true;

    function normalizeGenresPayload(payload) {
      // payload might be:
      //  - an array: [ {key, label}, ... ] or ['rock','pop'] or [{label:'Rock'}]
      //  - an object: { genres: [...] } or { data: [...] } or some mapping
      if (!payload) return [];

      if (Array.isArray(payload)) {
        return payload.map((g) => {
          if (typeof g === "string") return { key: g, label: capitalize(g) };
          if (g && typeof g === "object") {
            return {
              key: g.key ?? (g.label && slugify(g.label)) ?? g.id ?? JSON.stringify(g),
              label: g.label ?? g.name ?? String(g.key ?? g.id ?? ""),
            };
          }
          return null;
        }).filter(Boolean);
      }

      // payload is object: try common fields
      if (payload.genres && Array.isArray(payload.genres)) return normalizeGenresPayload(payload.genres);
      if (payload.data && Array.isArray(payload.data)) return normalizeGenresPayload(payload.data);

      // maybe payload is an object where keys are genre slugs
      const keys = Object.keys(payload || {});
      if (keys.length && keys.every(k => typeof payload[k] === "number" || typeof payload[k] === "object")) {
        // map keys to {key,label}
        return keys.map(k => ({ key: k, label: capitalize(k) }));
      }

      return [];
    }

    function capitalize(s) {
      if (!s) return s;
      return String(s).charAt(0).toUpperCase() + String(s).slice(1);
    }

    function slugify(s) {
      return String(s).toLowerCase().replace(/\s+/g, "-");
    }

    async function load() {
      try {
        setLoading(true);
        const [gRes, sRes] = await Promise.all([
          axios.get("https://qtify-backend-labs.crio.do/genres"),
          axios.get("https://qtify-backend-labs.crio.do/songs"),
        ]);

        // Log raw responses for debugging (inspect network shape)
        // Open browser console to see these
        // eslint-disable-next-line no-console
        console.log("genres raw:", gRes.data);
        // eslint-disable-next-line no-console
        console.log("songs raw:", sRes.data);

        const normalized = normalizeGenresPayload(gRes.data);

        // fallback set of genres if API is unexpected
        const fallbackGenres = [
          { key: "rock", label: "Rock" },
          { key: "pop", label: "Pop" },
          { key: "jazz", label: "Jazz" },
          { key: "blues", label: "Blues" },
        ];

        if (mounted) {
          setGenres((normalized && normalized.length) ? normalized : fallbackGenres);
          setSongs(Array.isArray(sRes.data) ? sRes.data : (sRes.data?.songs ?? []));
        }
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error("SongsSection load error", err);
        if (mounted) {
          setError(err);
        }
      } finally {
        if (mounted) setLoading(false);
      }
    }

    load();
    return () => {
      mounted = false;
    };
  }, []);

  const filteredSongs =
    selectedGenre === "all"
      ? songs
      : songs.filter((s) => {
          if (!s) return false;
          // handle possible shapes: s.genre.key, s.genre (string), s.genres array
          if (s.genre && typeof s.genre === "object" && s.genre.key) return s.genre.key === selectedGenre;
          if (typeof s.genre === "string") return s.genre === selectedGenre;
          if (Array.isArray(s.genres)) {
            return s.genres.some((g) => (typeof g === "string" ? g === selectedGenre : g.key === selectedGenre));
          }
          // fallback: sometimes songs have 'tags' etc - try match title
          return false;
        });

  if (loading) return <div className={styles.loading}>Loading songs…</div>;
  if (error) return <div className={styles.error}>Failed to load songs.</div>;

  return (
    <section className={styles.section} aria-labelledby="songs-heading">
      <div className={styles.header} style={{ alignItems: "flex-start" }}>
        <h2 id="songs-heading">Songs</h2>

        <div style={{ marginLeft: "auto" }}>
          <Tabs
            value={selectedGenre}
            onChange={(e, val) => setSelectedGenre(val)}
            variant="scrollable"
            scrollButtons="auto"
            aria-label="song genre tabs"
            sx={{
              "& .MuiTab-root": { color: "var(--color-white)", textTransform: "none", padding: "6px 12px" },
              "& .Mui-selected": { color: "var(--color-primary)" },
              "& .MuiTabs-indicator": { display: "none" },
            }}
          >
            <Tab value="all" label="All" />
            {genres.map((g) => (
              <Tab key={g.key} value={g.key} label={g.label} />
            ))}
          </Tabs>
        </div>
      </div>

      <Carousel>
        {filteredSongs.map((song) => (
          <AlbumCard
            key={song.id}
            album={{
              title: song.title ?? song.name,
              image: song.image ?? song.cover,
              id: song.id,
            }}
            countLabel="Likes"
            countValue={song.likes ?? 0}
          />
        ))}
      </Carousel>
    </section>
  );
}
