"use client";

import React, { useState } from "react";

import Link from "next/link";

import { MailIcon, MessageSquareHeart } from "lucide-react";

import { Button } from "./ui/button";
import { Modal } from "./ui/modal";

type Props = {
  children: React.ReactNode;
};

const FeedbackDialog = ({ children }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <React.Fragment>
      <div onClick={() => setIsOpen(true)}>{children}</div>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        className="w-full max-w-md p-6"
      >
        <div className="mb-4">
          <h2 className="text-lg font-semibold">Feedback !</h2>
          <p className="text-muted-foreground text-sm">
            Nous sommes heureux de recevoir vos retours sur chatvote.
          </p>
        </div>

        <div className="flex w-full flex-col gap-2">
          <Button asChild variant="outline">
            <Link href="mailto:info@chatvote.org">
              <MailIcon />
              Écrivez-nous un e-mail
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link
              href="https://forms.fillout.com/t/cGozfJUor9us"
              target="_blank"
            >
              <MessageSquareHeart />
              Remplissez notre formulaire de feedback
            </Link>
          </Button>
        </div>
      </Modal>
    </React.Fragment>
  );
};

export default FeedbackDialog;
