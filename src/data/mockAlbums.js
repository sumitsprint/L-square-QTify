// src/data/mockAlbums.js
// Minimal mock dataset that matches Search.jsx expectations.
// Each album has: id, title, slug, songs: [{ artists: [...] }]
const mockAlbums = [
  {
    id: "alb_01",
    title: "New English Songs",
    slug: "new-english-songs",
    songs: [
      { id: "s1", title: "Song A", artists: ["Artist 1"] },
      { id: "s2", title: "Song B", artists: ["Artist 2"] },
    ],
  },
  {
    id: "alb_02",
    title: "Bollywood Hits",
    slug: "bollywood-hits",
    songs: [{ id: "s3", title: "Song C", artists: ["Singer X"] }],
  },
  {
    id: "alb_03",
    title: "Havana",
    slug: "havana-album",
    songs: [{ id: "s4", title: "Song D", artists: ["Camila"] }],
  },
];

export default mockAlbums;
