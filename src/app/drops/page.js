"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function PublicDrops() {
  const [drops, setDrops] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDrops = async () => {
    try {
      const res = await fetch("/api/drops");
      const result = await res.json();
      setDrops(result.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchDrops();
  }, []);

  const customerDrops = drops.filter(
    (drop) => drop.status === "upcoming" || drop.status === "live"
  );

  const dropElements = customerDrops.map((drop) => {
    return (
      <div key={drop._id} className="border p-4 mb-4">
        <h3>{drop.name}</h3>
        <p>{drop.description || "Mysterious pirate treasures await..."}</p>
        <p>Status: {drop.status}</p>
        <p>Starts: {drop.dropDate}</p>
        <p>Items: {drop.products?.length || 0} products</p>

        <Link href={`/drops/${drop._id}`}>View Drop Details</Link>
      </div>
    );
  });

  if (loading) return <div>Loading...</div>;
  if (!drops.length) return <div>No drops found. Check back later!</div>;

  return (
    <div>
      <h1>Current Drops</h1>
      <p>
        Discover exclusive Steam Punk Pirate drops - limited time, limited
        quantities!
      </p>
      {dropElements}
    </div>
  );
}
