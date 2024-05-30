"use client";
import Image from "next/image";
import axios from "axios";
import React, { useState, useEffect } from "react";

export default function Page({ params }: { params: { slug: string } }) {
  const [kills, setKills] = useState<null | number>(null);

  const generate_tracker = () => {
    axios.post("/api/getinfo", {
      trackerId: params.slug
    })
      .then((data) => {
        console.log(data)
        setKills(() => data.data.data.kills)
      })
      .catch(error => {
        alert("TrackerID not found.")
        window.location.replace("/")
        console.error(error)
      })
      .finally(() => {
      })
  }

  useEffect(() => {
    generate_tracker();
  }, [])

  return (
    <>
      <p>Kills: {Math.round(kills!/4)}</p>
    </>
  );
}
