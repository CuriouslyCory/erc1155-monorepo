import { useState } from "react";
import { Modal } from "./modal";

type ModalProps = {
  link?: string;
  title?: string;
  description?: string;
  includeClose?: boolean;
  externalOpen?: boolean;
  children: React.ReactNode;
};

export const useModal = ({
  link,
  title,
  description,
  includeClose,
  children,
}: ModalProps) => {
  const [open, setOpen] = useState(false);

  return {
    dialog: (
      <Modal
        link={link}
        title={title}
        description={description}
        includeClose={includeClose}
        open={open}
        setOpen={setOpen}
      >
        {children}
      </Modal>
    ),
    setOpen,
  };
};
