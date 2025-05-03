"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { Room } from "@/components/Tables/fetch";

type RoomModalContextType = {
  isOpen: boolean;
  room: Room | null;
  openModal: (room: Room) => void;
  closeModal: () => void;
};

const RoomModalContext = createContext<RoomModalContextType | undefined>(undefined);

export const RoomModalProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [room, setRoom] = useState<Room | null>(null);

  const openModal = (room: Room) => {
    setRoom(room);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setRoom(null);
  };

  return (
    <RoomModalContext.Provider value={{ isOpen, room, openModal, closeModal }}>
      {children}
    </RoomModalContext.Provider>
  );
};

export const useRoomModal = () => {
  const context = useContext(RoomModalContext);
  if (!context) {
    throw new Error("useRoomModal must be used within a RoomModalProvider");
  }
  return context;
};
