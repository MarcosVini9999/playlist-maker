"use client";
import React from "react";
import { generateCodeChallenge, generateRandomString } from "./utils/functions";
import { iTrack, iUserData } from "./utils/interfaces";
import { Button } from "@material-tailwind/react";
import { UserCard, AudioPlayer, AudioCard } from "./Components";

export default function Home() {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [playlist, setPlaylist] = React.useState<Array<iTrack>>();
  const [newPlaylist, setNewPlaylist] = React.useState<Array<iTrack>>();
  const [userData, setUserData] = React.useState<iUserData>();

  const onSearch = async () => {
    const access_token = window.localStorage.getItem("access_token");

    if (searchTerm === "" || !access_token) return;

    const params = {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    };

    const result = await fetch(
      `https://api.spotify.com/v1/search?type=track&q=${searchTerm}`,
      params
    ).then((result) => result.json());

    setPlaylist(result.tracks.items);
  };

  React.useEffect(() => {
    if (userData) return;

    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");
    const codeVerifier = localStorage.getItem("code_verifier");
    const client_id = process.env.CLIENT_ID;
    const redirectUri = "http://localhost:3000";

    if (!code || !codeVerifier || !client_id) return;

    const body = new URLSearchParams({
      grant_type: "authorization_code",
      code: code,
      redirect_uri: redirectUri,
      client_id: client_id,
      code_verifier: codeVerifier,
    });

    fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: body,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("HTTP status " + response.status);
        }
        return response.json();
      })
      .then((data) => {
        localStorage.setItem("access_token", data.access_token);
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    async function getProfile() {
      let accessToken = localStorage.getItem("access_token");

      const response = await fetch("https://api.spotify.com/v1/me", {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      });

      const data = await response.json();
      setUserData(data);
    }
    getProfile();
  }, []);

  const onLogIn = () => {
    const redirectUri = "http://localhost:3000";
    const codeVerifier = generateRandomString(128);
    const client_id = process.env.CLIENT_ID;

    if (!client_id) return;

    generateCodeChallenge(codeVerifier).then((codeChallenge) => {
      const state = generateRandomString(16);
      const scope = "user-read-private playlist-modify-public";
      const args = new URLSearchParams({
        response_type: "code",
        client_id: client_id,
        scope: scope,
        redirect_uri: redirectUri,
        state: state,
        code_challenge_method: "S256",
        code_challenge: codeChallenge,
      });

      window.location.href = "https://accounts.spotify.com/authorize?" + args;
    });

    localStorage.setItem("code_verifier", codeVerifier);
  };

  const keyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") onSearch();
  };

  const handleAddTrack = (newTrack: iTrack) => {
    setNewPlaylist((prev) => {
      let exist = 0;

      if (prev === undefined) return [newTrack];

      prev.forEach((track) => {
        if (track === newTrack) exist = 1;
      });

      if (exist) return prev;

      const newPlaylist = [...prev];
      newPlaylist.push(newTrack);

      return newPlaylist;
    });
  };

  const handleRemoveTrack = (track: iTrack) => {
    setNewPlaylist((prev) => {
      if (prev === undefined) return [];
      const newPlaylist = [...prev];

      const trackIndex = newPlaylist.indexOf(track);

      if (trackIndex > -1) newPlaylist.splice(trackIndex, 1);

      return newPlaylist;
    });
  };

  return (
    <React.Fragment>
      <header className="flex items-center justify-between flex-col-reverse lg:flex-row">
        <div className="flex items-center flex-col justify-center pt-16 lg:p-3 lg:flex-row">
          <input
            className="p-3 border-none rounded-md shadow-sm lg:w-96 shadow-black dark:shadow-gray-600"
            type="text"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Search song, artist, album..."
            onKeyDown={keyPress}
          />
          <button className="p-2 inline-block" onClick={onSearch}>
            {
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-8 h-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 15.75l-2.489-2.489m0 0a3.375 3.375 0 10-4.773-4.773 3.375 3.375 0 004.774 4.774zM21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            }
          </button>
        </div>
        <UserCard userData={userData} onLogIn={onLogIn} />
      </header>
      <main className="flex flex-col items-center justify-center">
        <h1 className="flex flex-row text-4xl items-center font-serif">
          Playlist Maker
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Spotify_icon.svg/1982px-Spotify_icon.svg.png"
            alt="spotify-icon"
            className="w-8 h-8 mx-2"
          />
        </h1>

        <div className="flex flex-col gap-5 my-11 lg:my-16 md:flex-row">
          <div className="flex flex-col items-center">
            <p>Searched songs</p>
            <div
              className="w-64 h-96 sm:w-72 md:w-80 lg:w-96 overflow-auto border-solid border-2 bg-gray-300 dark:bg-gray-900 border-black dark:border-green-400
              scrollbar-thin scrollbar-thumb-black dark:scrollbar-thumb-green-400"
            >
              {playlist?.map((track, index) => (
                <AudioCard key={index} track={track} onAddTrack={handleAddTrack} />
              ))}
            </div>
          </div>
          <div className="flex flex-col items-center">
            <p>Playlist to be created</p>
            <div
              className="w-64 h-96 sm:w-72 md:w-80 lg:w-96 overflow-auto border-solid border-2 bg-gray-300 dark:bg-gray-900 border-black dark:border-green-400
                scrollbar-thin scrollbar-thumb-black dark:scrollbar-thumb-green-400"
            >
              {newPlaylist?.map((track, index) => (
                <AudioCard key={index} track={track} onRemoveTrack={handleRemoveTrack} />
              ))}
            </div>
          </div>
        </div>
        <Button className="bg-black dark:bg-green-400 w-52" onClick={() => alert("update soon")}>
          Create
        </Button>
      </main>
    </React.Fragment>
  );
}
