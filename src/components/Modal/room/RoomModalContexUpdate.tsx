"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { Room } from "@/components/Tables/fetch";

type RoomModalContextTypeUpdate = {
  isOpen: boolean;
  room: Room | null;
  openModalUpdate: (room: Room) => void;
  closeModalUpdate: () => void;
};

const RoomModalContextUpdate = createContext<RoomModalContextTypeUpdate | undefined>(undefined);

export const RoomModalProviderUpdate = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [room, setRoom] = useState<Room | null>(null);

  const openModalUpdate = (room: Room) => {
    setRoom(room);
    setIsOpen(true);
  };

  const closeModalUpdate = () => {
    setIsOpen(false);
    setRoom(null);
  };

  return (
    <RoomModalContextUpdate.Provider value={{ isOpen, room, openModalUpdate, closeModalUpdate }}>
      {children}
    </RoomModalContextUpdate.Provider>
  );
};

export const useRoomModalUpdate = () => {
  const context = useContext(RoomModalContextUpdate);
  if (!context) {
    throw new Error("useRoomModalUpdate must be used within a RoomModalProviderUpdate");
  }
  return context;
};
