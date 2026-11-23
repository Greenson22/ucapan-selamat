"use client";

import React, { useState, useRef, useEffect } from "react";
import { MusicToggleButton } from "@/components/elements/MusicToggleButton";

export interface MusicPlayerProps {
  src?: string;
  autoPlay?: boolean;
}

export function MusicPlayer({ src = "/audio/happy-birthday.mp3", autoPlay = false }: MusicPlayerProps) {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (autoPlay && audioRef.current) {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch((err) => {
          console.warn("Audio autoplay error:", err);
          setIsPlaying(false);
        });
    }
  }, [autoPlay]);

  const toggleMusic = async () => {
    if (!audioRef.current) return;
    try {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        await audioRef.current.play();
        setIsPlaying(true);
      }
    } catch (err) {
      console.warn("Audio playback error:", err);
      setIsPlaying(false);
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-40">
      <audio
        ref={audioRef}
        src={src}
        loop
        preload="auto"
        onEnded={() => setIsPlaying(false)}
      />
      <MusicToggleButton isPlaying={isPlaying} onToggle={toggleMusic} />
    </div>
  );
}
