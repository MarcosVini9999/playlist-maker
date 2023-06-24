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
    <div className="flex flex-row ">
      <button
        className="rounded-full p-1 bg-transparent hover:bg-gray-300 dark:hover:bg-gray-700"
        onClick={handlePlay}
      >
        {playing ? (
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
              d="M15.75 5.25v13.5m-7.5-13.5v13.5"
            />
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
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z"
            />
          </svg>
        )}
      </button>
      <button
        className="rounded-full p-1 bg-transparent hover:bg-gray-300 dark:hover:bg-gray-700"
        onClick={onAdd ? onAdd : onRemove}
      >
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
