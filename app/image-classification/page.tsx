"use client";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import axios from "axios";
import { ImageIcon, Loader2, ScanSearch } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import "../styles/global.css"; // Import the CSS file

type Props = {};

const ImageClassificationPage = (props: Props) => {
  const [url, setUrl] = useState("");
  const [label, setLabel] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isRelative, setIsRelative] = useState(false);

  useEffect(() => {
    if (url && label) {
      setIsRelative(true);
    }
  }, [url, label]);

  async function uploadFiles(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    const fileInput = formData.get("files") as File;

    if (!fileInput || fileInput.size === 0) {
      setErrorMessage(" (>_<) Please select a file to upload.");
      return;
    }

    setLoading(true);
    setErrorMessage(""); // Clear any existing error message

    try {
      const response = await axios.post("/api/detect-objects", formData);
      setUrl(response.data.url);
      setLabel(response.data.label);
    } catch (error) {
      setErrorMessage("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return ( 
    <div className="relative w-full min-h-screen flex flex-col" style={{backgroundColor:'#f1f0eb'}}> 
      <main className="flex flex-col items-center justify-start pt-56 p-24 gap-2">
        <svg className="absolute top-0 left-0 w-full h-auto" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 100" fill="#8573A2"><path d="m0 4 150 40h160l190 50 190-50h160l150-40V0H0v4z"></path></svg>
        <h1 className="text-4xl font-500 monstserrat text-center" style={{color: '#008080'}}>IMAGE CLASSIFICATION APP</h1>
        <p className="text-lg text-muted-foreground text-center ">Upload your image as a .png or .jpg to detect objects.</p>
        <form onSubmit={uploadFiles} className="flex gap-2 items-center">
          <ImageIcon size={40} />
          <Input name="files" type="file"></Input>
          <Button disabled={loading} type="submit">
            {loading ? (
              <Loader2 className="animate-spin" />
            ) : (
              <ScanSearch size={20} />
            )}
            <span className="ml-2">Upload</span>
          </Button>
        </form>
        {errorMessage && <p className="text-red-500  font-bold mt-4 ">{errorMessage}</p>}
        {url && (
          <div className="flex flex-col items-center gap-2 mt-4">
            <Image
              src={url}
              width={400}
              height={400}
              alt={"uploaded image"}
              className="rounded-md shadow-lg"
              style={{ boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3), 0 6px 20px rgba(0, 0, 0, 0.19)" }}
            ></Image>
            <Link
              href={url}
              className={cn(
                buttonVariants({ variant: "ghost" }),
                "text-xs text-muted-foreground"
              )}
            >
              View Image
            </Link>
          </div>
        )}
        {label && <p className="font-bold text-xl mt-4" style={{ zIndex: 2, position: 'relative' }}>Image detected: {label}</p>}
      </main>

      <svg className="absolute bottom-0 left-0 w-full h-auto" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 100" fill="#8573A2" transform="scale(1, -1)">
        <rect fill="#F1F0EB" width="100%" height="100%" />
        <path d="M0 0v4l250 64 125-32 250 64 375-96V0H0z"></path>
      </svg>

    </div>
  );
};

export default ImageClassificationPage;
