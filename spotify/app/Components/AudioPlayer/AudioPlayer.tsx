import React from "react";
import { useAudio } from "@/app/hooks/useAudio";

interface AudioPlayerProps {
  url: string;
  onAdd?: () => void;
  onRemove?: () => void;
}

export const AudioPlayer = ({ url, onAdd, onRemove }: AudioPlayerProps) => {
  const [playing, setPlaying] = useAudio(url);

  const handlePlay = () => {
    setPlaying(!playing);
  };

  return (
    <div className="flex flex-row">
      <button className="rounded-full p-1 bg-transparent hover:bg-transparent" onClick={handlePlay}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 7.5V18M15 7.5V18M3 16.811V8.69c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 010 1.954l-7.108 4.061A1.125 1.125 0 013 16.811z"
          />
        </svg>
      </button>
      <button onClick={onAdd ? onAdd : onRemove}>
        {onAdd ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15" />
          </svg>
        )}
      </button>
    </div>
  );
};
