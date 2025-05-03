"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { Booking } from "@/components/Tables/fetch";

type BookingModalContextType = {
  isOpen: boolean;
  booking: Booking | null;
  openModal: (booking: Booking) => void;
  closeModal: () => void;
};

const BookingModalContext = createContext<BookingModalContextType | undefined>(undefined);

export const BookingModalProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [booking, setBooking] = useState<Booking | null>(null);

  const openModal = (booking: Booking) => {
    setBooking(booking);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setBooking(null);
  };

  return (
    <BookingModalContext.Provider value={{ isOpen, booking, openModal, closeModal }}>
      {children}
    </BookingModalContext.Provider>
  );
};

export const useBookingModal = () => {
  const context = useContext(BookingModalContext);
  if (!context) {
    throw new Error("useBookingModal must be used within a BookingModalProvider");
  }
  return context;
};
