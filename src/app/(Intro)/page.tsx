"use client";

import Intro from "./intro";
import { usePendingStore } from "./store/usePendingStore";
import { useEffect } from "react";
import Pending from "@/features/scene/intro/components/pending";

export default function Home() {
  const isPending = usePendingStore(state => state.isPending);
  const setIsPending = usePendingStore(state => state.setIsPending);

  useEffect(() => setIsPending(false), [setIsPending]);

  return (
    <main>
      {isPending && <Pending />}
      <Intro></Intro>
    </main>
  );
}
