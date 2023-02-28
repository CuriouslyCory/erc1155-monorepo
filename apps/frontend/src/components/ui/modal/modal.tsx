import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { cva, VariantProps } from "class-variance-authority";
import { AiOutlineClose } from "react-icons/ai";
import { Button } from "../button";

const modalLinkVariants = cva("text-amber-700 hover:underline", {
  variants: {
    variant: {
      default: "",
      warn: "text-red-500",
    },
    size: {
      default: "",
      sm: "text-sm",
      lg: "text-lg",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

export interface ModalLinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement>,
    VariantProps<typeof modalLinkVariants> {}

type ModalProps = {
  link?: string;
  title?: string;
  description?: string;
  includeClose?: boolean;
  open?: boolean;
  setOpen: (open: boolean) => void;
  children: React.ReactNode;
};

export const Modal = ({
  link,
  title,
  description,
  includeClose,
  open,
  setOpen,
  children,
}: ModalProps): JSX.Element => {
  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      {link && (
        <Dialog.Trigger asChild>
          <a className="cursor-pointer text-amber-600 hover:underline">
            {link}
          </a>
        </Dialog.Trigger>
      )}

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50" />
        <Dialog.Content className="width-[90vw] max-w-96 fixed top-1/2 left-1/2 max-h-[85vh] -translate-x-1/2 -translate-y-1/2 rounded-md bg-white p-8">
          <Dialog.Title className="mb-5 text-center text-xl font-semibold">
            {title}
          </Dialog.Title>
          <Dialog.Description>{description}</Dialog.Description>
          {children}
          {includeClose && (
            <div className="mt-5 flex justify-end">
              <Dialog.Close asChild>
                <Button variant="outline">Close</Button>
              </Dialog.Close>
            </div>
          )}
          <Dialog.Close asChild>
            <button className="absolute top-2 right-2 p-3" aria-label="Close">
              <AiOutlineClose className="text-gray-600" />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
