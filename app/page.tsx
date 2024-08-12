"use client";
import { useState } from 'react';
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from 'next/link';
import "./styles/global.css"; // Import the CSS file
import React from "react";

export default function Home() {
  const [showInfo, setShowInfo] = useState(false);

  const toggleInfo = () => {
    setShowInfo(!showInfo);
  };

  return (
    <main className="min-h-screen p-6 sm:p-12 md:p-24 bg-cover bg-center overflow-hidden" style={{ backgroundImage: "url('paperTexture.jpg')", backgroundAttachment: 'fixed', backgroundClip: 'padding-box' }}>
      <div className="flex flex-col md:flex-row items-start p-4">
        <div className="flex flex-col justify-start items-start w-full md:w-3/5">
          <h1 className="text-4xl sm:text-5xl md:text-6xl text-left inter square-heading" style={{ lineHeight: '1.5' }}>
            AI-Powered Image Object Classification Made Easy
          </h1>
          <p className="mb-6 p-heading mt-4" style={{ lineHeight: '2' }}>
            Want to know numbers of different Objects for your Photo? Use the Button below to get Instant Results.
          </p>

          <div className="flex flex-col sm:flex-row gap-2 " style={{ marginLeft: '80px' }}>
            <Link
              className={cn(buttonVariants({ variant: 'secondary' }), "link")}
              href={'/image-classification'}
              style={{ backgroundColor: 'rgba(242, 143, 72, 0.5)', transition: 'transform 0.5s' }}
            >
              Upload Object Image
            </Link>
            <button
              className={cn(buttonVariants({ variant: 'ghost' }), "button")}
              onClick={toggleInfo}
              style={{ backgroundColor: '#0955ed', color: 'white', transition: 'transform 0.5s' }}
            >
              Info for nerds
            </button>
          </div>

          {showInfo && (
            <p className="mt-8 text-center mx-auto max-w-2xl">
              Curious how this app is built? It uses Pretrained Models from Hugging Face's <a href="https://huggingface.co/docs/transformers.js/index" className="underline text-blue-500">Transformers.js</a> Library, and support from the Pipeline API that runs the pretrained AI models. Specifically, the AI used here allows for object detection and image classification.
            </p>
          )}
        </div>

        <div className="flex justify-center items-center p-4 w-full md:w-2/5 mt-8 md:mt-0 md:ml-8">
          <img src="diagram.png" className="w-full md:w-auto" style={{ maxWidth: '100%' }} alt="Diagram" />
        </div>
      </div>
    </main>
  );
}
