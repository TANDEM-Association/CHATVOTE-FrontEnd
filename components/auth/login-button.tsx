"use client";

import React, { useState } from "react";

import { useAnonymousAuth } from "@/components/anonymous-auth";
import { Modal } from "@/components/ui/modal";
import { getUserDetailsFromUser, type UserDetails } from "@/lib/utils";

import LoginForm from "./login-form";
import UserDialog from "./user-dialog";

type Props = {
  noUserChildren?: React.ReactNode;
  userChildren?: React.ReactNode;
  userDetails?: UserDetails;
};

const LoginButton = ({ noUserChildren, userChildren, userDetails }: Props) => {
  const { user } = useAnonymousAuth();
  const [isOpen, setIsOpen] = useState(false);

  const handleSuccess = () => {
    setIsOpen(false);
  };

  const clientUserDetails = user ? getUserDetailsFromUser(user) : undefined;

  const hasUser = clientUserDetails
    ? !clientUserDetails.isAnonymous
    : userDetails
      ? !userDetails.isAnonymous
      : false;

  if (hasUser && !isOpen) {
    if (!userChildren) {
      return null;
    }

    return (
      <UserDialog details={userDetails ?? clientUserDetails}>
        {userChildren}
      </UserDialog>
    );
  }

  return (
    <React.Fragment>
      <div onClick={() => setIsOpen(true)}>{noUserChildren}</div>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        className="w-full max-w-md p-6"
      >
        <LoginForm onSuccess={handleSuccess} />
      </Modal>
    </React.Fragment>
  );
};

export default LoginButton;
