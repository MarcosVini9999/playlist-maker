"use client";
import { iUserData } from "@/app/utils/interfaces";
import { Button } from "@material-tailwind/react";
import React from "react";

interface UserCardPros {
  userData: iUserData | undefined;
  onLogIn: () => void;
}

export const UserCard = ({ userData, onLogIn }: UserCardPros) => {
  const onLogout = () => {
    const path = window.location.href;
    localStorage.removeItem("code_verifier");
    localStorage.removeItem("access_token");
    localStorage.removeItem("ally-supports-cache");
    window.location.href = path.substring(0, path.indexOf("?"));
  };

  return (
    <div className="fixed top-3 right-3">
      {userData ? (
        <div className="flex flex-row items-center">
          <div className="flex flex-row items-center bg-gray-800 rounded-s-lg">
            <img
              src={
                userData?.images?.length > 0
                  ? userData.images[0].url
                  : "https://icons.veryicon.com/png/o/internet--web/prejudice/user-128.png"
              }
              alt="user-image"
              className="w-10 rounded-xl p-1"
            />
            <p className="text-white p-2">
              {userData.display_name?.substring(0, userData.display_name.indexOf(" "))}
            </p>
          </div>
          <div className="bg-gray-200 w-1 h-10"></div>
          <Button className="rounded-s-[0] bg-black dark:bg-green-400" onClick={onLogout}>
            Logout
          </Button>
        </div>
      ) : (
        <Button className="bg-black dark:bg-green-400" size="sm" onClick={onLogIn}>
          Login
        </Button>
      )}
    </div>
  );
};
