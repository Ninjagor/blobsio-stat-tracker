"use client";
import Image from "next/image";
import axios from "axios";
import React, { useState } from "react";

export default function Home() {
  const [id, setId] = useState<string | undefined>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isFinished, setIsFinished] = useState<boolean>(false);

  const generate_tracker = () => {
    setIsLoading(() => true);
    axios.post("/api/generate", {})
      .then((data) => {
        console.log(data)
        setIsFinished(() => true)
        setId(() => data.data.data.id);
      })
      .catch(error => {
        alert("An error occured.")
        console.error(error)
      })
      .finally(() => {
        setIsLoading(() => false)
      })
  }

  return (
    <>
      <p className="text-center w-full mt-5 text-2xl font-semibold">Hello! Welcome to the BlobsIO Stats Tracker application.</p>
      <p className="text-center w-full max-w-[50%] ml-auto mr-auto mt-5 txt-sm opacity-50">First, click the Generate button to get your TrackerID. Input this in the openprocessing project, and the server will track your kill count. To view your stats, visit /view/YOUR_ID.</p>
      <div className="w-full flex items-center justify-center mt-5">
        {(!(isFinished)) && 
              <button onClick={generate_tracker} className="bg-blue-600 text-white px-5 py-2 rounded-md cursor-pointer text-sm font-medium hover:bg-blue-700" disabled={isLoading}>{isLoading ? "Loading..." : "Generate TrackerID"}</button>
        }
      </div>

      {isFinished && 
        <>
        <p className="text-center ml-auto mr-auto text-md mt-5">Your tracker ID is <span className="font-semibold">{id}</span></p>
        <p className="text-center ml-auto mr-auto text-md mt-2 opacity-50">Copy this and paste it into the openprocessing project. Do not share it with anyone.</p>
        </>
      }

    </>
  );
}
