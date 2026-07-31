"use client";

import React, { createContext, useContext, useState } from "react";

interface ModalContextType {
  isContactOpen: boolean;
  openContactModal: () => void;
  closeContactModal: () => void;
  isProjectOpen: boolean;
  openProjectModal: () => void;
  closeProjectModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isProjectOpen, setIsProjectOpen] = useState(false);

  const openContactModal = () => setIsContactOpen(true);
  const closeContactModal = () => setIsContactOpen(false);

  const openProjectModal = () => setIsProjectOpen(true);
  const closeProjectModal = () => setIsProjectOpen(false);

  return (
    <ModalContext.Provider
      value={{
        isContactOpen,
        openContactModal,
        closeContactModal,
        isProjectOpen,
        openProjectModal,
        closeProjectModal,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}

export function useModal() {
  const context = useContext(ModalContext);
  if (context === undefined) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
}
