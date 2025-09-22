// src/components/Section/TopAlbumsSection.jsx
import React, { useEffect, useState } from "react";
import styles from "./TopAlbumsSection.module.css";
import AlbumCard from "../Card/AlbumCard";
import { fetchTopAlbums } from "../../services/api";
import axios from "axios";

export default function TopAlbumsSection() {
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;

    (async function load() {
      try {
        setLoading(true);
        const data = await fetchTopAlbums();
        if (mounted) {
          setAlbums(data || []);
        }
      } catch (err) {
        console.error("Failed to load top albums", err);
        if (mounted) setError(err);
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, []);

  if (loading) return <div className={styles.loading}>Loading top albums…</div>;
  if (error)
    return (
      <div className={styles.error}>
        Could not load albums. If you see a CORS error, use the browser Allow-CORS
        extension or run a local proxy.
      </div>
    );

  return (
    <section className={styles.section} aria-labelledby="top-albums-heading">
      <div className={styles.header}>
        <h2 id="top-albums-heading">Top Albums</h2>
        <button className={styles.collapseBtn} aria-pressed="false">
          Collapse
        </button>
      </div>

      <div className={styles.grid}>
        {albums.map((a) => (
          <AlbumCard key={a.id} album={a} />
        ))}
      </div>
    </section>
  );
}

/*
top albumsection(){
xonst [albums, setAlbums] = useState();
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);

useEffect(() => {
    let mounted = true;
    async function load() {
    try{
        setLoading(true);
        data = await fetchTopAlbums();
        if (mounted){
        setAlbymsData(data||[])}}
        catch(err){
        
        console.error("failed to load top albums", err);}
        if(mounted) setError(err);
    }finally{
        if(mounted) setLoading(false);
    }mounted = fa;lse
        return (_)
        return (_) => {
            }
if(loading) return loadin<div>
 * 
if (error) return <div>could not load</div>
return (
<h2>top albums</h2>
<button>
cpllapse<button>
<div>{albums.map((a) => (
    <Albumcard key = {id} album = {a}/> 
    ))}</div>
    </section
)


 * 
 * 
 */