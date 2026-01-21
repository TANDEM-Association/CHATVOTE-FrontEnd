/* eslint-disable @next/next/no-img-element */
"use client";
import { UserIcon } from "lucide-react";

import { useAnonymousAuth } from "@/components/anonymous-auth";
import { getUserDetailsFromUser, type UserDetails } from "@/lib/utils";

type Props = {
  details?: UserDetails;
};

function UserAvatar({ details }: Props) {
  const { user } = useAnonymousAuth();

  const userDetails = user ? getUserDetailsFromUser(user) : details;

  return (
    <div className="border-border hover:bg-muted flex aspect-square size-9 items-center justify-center rounded-full border">
      {userDetails?.photoURL ? (
        <img
          src={userDetails.photoURL}
          alt="User avatar"
          className="size-full rounded-full object-cover"
        />
      ) : (
        <UserIcon className="size-4" />
      )}
    </div>
  );
}

export default UserAvatar;
