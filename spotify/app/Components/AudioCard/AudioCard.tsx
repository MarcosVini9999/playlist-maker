import { iTrack } from "@/app/utils/interfaces";
import React from "react";
import { AudioPlayer } from "../AudioPlayer/AudioPlayer";

interface AudioCardProps {
  track: iTrack;
  onRemoveTrack?: (track: iTrack) => void;
  onAddTrack?: (track: iTrack) => void;
}

export const AudioCard = ({ track, onRemoveTrack, onAddTrack }: AudioCardProps) => {
  return (
    <div className="flex flex-row items-center p-5 hover:bg-gray-400 dark:hover:bg-gray-800">
      <img src={track.album.images[0].url} alt="album-image" className="w-16 h-16" />
      <div className="ml-8">
        <h1 className="text-lg antialiased font-semibold tracking-wider line-clamp-2">
          {track.name}
        </h1>
        <p className="text-xs antialiased italic font-thin leading-6">
          {track.album.artists[0].name}
        </p>
        {onAddTrack ? (
          <AudioPlayer url={track?.preview_url} onAdd={() => onAddTrack(track)} />
        ) : onRemoveTrack ? (
          <AudioPlayer url={track?.preview_url} onRemove={() => onRemoveTrack(track)} />
        ) : null}
      </div>
    </div>
  );
};
