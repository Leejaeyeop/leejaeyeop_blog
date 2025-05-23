"use client";
import { useRef } from "react";
import { Playfair } from "next/font/google";
import Navbar from "@/components/molecules/navbar/navbar";

const playfair = Playfair({
  weight: ["800"],
  style: ["italic"],
  display: "swap",
  subsets: ["latin"],
});

function FirstSection() {
  const ref = useRef<HTMLDivElement | null>(null);
  return (
    <section
      ref={ref}
      className={
        playfair.className +
        " w-full min-h-full flex flex-col items-center relative px-60 justify-center"
      }
    >
      <header className="text-center">
        <h1 className="text-[11rem]">Lee jaeyeop</h1>
        <h2 className="text-7xl">Frontend developer</h2>
        <h3 className="text-2xl opacity-70 mt-5">Impossible is nothing</h3>
      </header>
      <nav className="mt-36">
        <Navbar className="text-5xl" />
      </nav>
    </section>
  );
}

export default FirstSection;
