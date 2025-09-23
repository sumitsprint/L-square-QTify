// src/components/Card/AlbumCard.jsx
import React from "react";
import styles from "./AlbumCard.module.css";
import Chip from "@mui/material/Chip";

export default function AlbumCard({ album, countLabel = "Follows", countValue }) {
  // album may be an album object or song object depending on caller
  const title = album?.title || album?.name || "Untitled";
  const image = album?.image || album?.coverUrl || "/src/assets/placeholder.png";
  const slug = album?.slug || album?.id || title.replace(/\s+/g, "-").toLowerCase();

  // fallback countValue: try album.follows or album.likes
  const value = countValue ?? album?.follows ?? album?.likes ?? 0;

  return (
    <article className={styles.card} aria-labelledby={`album-${slug}-title`}>
      <div className={styles.coverWrap}>
        <img
          src={image}
          alt={title}
          className={styles.cover}
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = "/src/assets/placeholder.png";
          }}
        />
        <div className={styles.chipWrap}>
          <Chip
            label={`${value} ${countLabel}`}
            size="small"
            className={styles.chip}
            tabIndex={-1}
            aria-hidden="true"
          />
        </div>
      </div>

      <div className={styles.meta}>
        <h3 id={`album-${slug}-title`} className={styles.title}>
          {title}
        </h3>
      </div>
    </article>
  );
}
