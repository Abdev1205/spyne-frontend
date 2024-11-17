"use client";

import React, { ReactNode } from "react";
import { useEffect } from "react";

export interface ModalProps {
  visible: boolean;
  onClose?: () => void;
  callback?: () => void;
  children: ReactNode;
  focusMode?: boolean;
}

export interface ChildModalProps {
  visible: boolean;
  onClose?: () => void;
  callback?: () => void;
  focusMode?: boolean;
}

const Modal: React.FC<ModalProps> = ({
  visible,
  onClose = () => {},
  callback = () => {},
  children,
  focusMode = false,
}) => {
  useEffect(() => {
    if (visible) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <div
      id="background"
      className="fixed inset-0 z-[999] flex items-center justify-center bg-black bg-opacity-50"
      onClick={(e) => {
        const target = e.target as HTMLElement;
        if (target.id === "background" && !focusMode) onClose();
      }}
    >
      {children}
    </div>
  );
};

export default Modal;
