// src/components/Card/AlbumCard.jsx
import React from "react";
import styles from "./AlbumCard.module.css";
import Chip from "@mui/material/Chip";

export default function AlbumCard({ album }) {
  const { title, follows, image, slug } = album || {};

  // safe fallback image (optional) - you can point to a local asset
  const fallback = "/src/assets/placeholder.png"; // optional: provide a placeholder in assets

  return (
    <article className={styles.card} aria-labelledby={`album-${slug}-title`}>
      <div className={styles.coverWrap}>
        <img
          src={image || fallback}
          alt={title}
          className={styles.cover}
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = fallback;
          }}
        />
        <div className={styles.chipWrap}>
          <Chip
            label={`${follows ?? 0} Follows`}
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
/*
 * export defau function Album ({album}){
  const {title , image, slug, follows} = album ||{}
  cpnst fallback =
 return (<img/
 src= {image || fallback}
 alt = {title}
 onError = {(e) => {
  e.currentTArget.error= nill
  e.currentTarget.src = fallback
 >)
 <chip label = {`${follows ?? 0} Follows`}/>
 <div>{{titlke}</div>
}
 * 
 * 
 * 
 * 
 * 
 */