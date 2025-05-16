"use client";
import { useState } from "react";
import Navbar from "@/components/molecules/navbar/navbar";

export default function FooterComponent() {
  return (
    <footer className="fixed bottom-0 right-0 w-full flex z-50 bg-zinc-800 backdrop-blur-md gap-6 px-10 border-b border-white/60 mix-blend-difference text-white pointer-events-auto">
      <nav
        className={
          "m-0 w-auto h-auto flex-row gap-10 items-center bg-inherit static pt-0 flex flex-grow "
        }
      >
        <Navbar />
      </nav>
    </footer>
  );
}
