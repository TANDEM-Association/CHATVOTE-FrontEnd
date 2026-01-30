/* eslint-disable @next/next/no-img-element */
"use client";
import { UserIcon } from "lucide-react";

import { type User } from "@/lib/types/auth";

type UserAvatarProps = {
  user: User | null;
};

export const UserAvatar: React.FC<UserAvatarProps> = ({ user }) => {
  return (
    <div className="border-border hover:bg-muted flex aspect-square size-9 items-center justify-center rounded-full border">
      {user?.photoURL ? (
        <img
          src={user.photoURL}
          alt="User avatar"
          className="size-full rounded-full object-cover"
        />
      ) : (
        <UserIcon className="size-4" />
      )}
    </div>
  );
};
