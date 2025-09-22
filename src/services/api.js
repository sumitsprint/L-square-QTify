// src/services/api.js
import axios from "axios";

const API = axios.create({
  baseURL: "https://qtify-backend-labs.crio.do",
  timeout: 10000,
});

export async function fetchTopAlbums() {
  const res = await API.get("/albums/top");
  return res.data;
}
/**
 * const Api = axios.create({
 * 
 * })
 */