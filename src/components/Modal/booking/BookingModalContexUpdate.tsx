"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { Booking } from "@/components/Tables/fetch";

type BookingModalContextTypeUpdate = {
  isOpen: boolean;
  booking: Booking | null;
  openModalUpdate: (booking: Booking) => void;
  closeModalUpdate: () => void;
};

const BookingModalContextUpdate = createContext<BookingModalContextTypeUpdate | undefined>(undefined);

export const BookingModalProviderUpdate = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [booking, setBooking] = useState<Booking | null>(null);

  const openModalUpdate = (booking: Booking) => {
    setBooking(booking);
    setIsOpen(true);
  };

  const closeModalUpdate = () => {
    setIsOpen(false);
    setBooking(null);
  };

  return (
    <BookingModalContextUpdate.Provider value={{ isOpen, booking, openModalUpdate, closeModalUpdate }}>
      {children}
    </BookingModalContextUpdate.Provider>
  );
};

export const useBookingModalUpdate = () => {
  const context = useContext(BookingModalContextUpdate);
  if (!context) {
    throw new Error("useBookingModalUpdate must be used within a BookingModalProviderUpdate");
  }
  return context;
};
