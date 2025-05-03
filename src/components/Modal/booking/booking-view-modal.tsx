"use client";

import { useEffect, useState } from "react";
import ModalPortal from "@/components/ModalPortal";
import { useBookingModal } from "@/components/Modal/booking/BookingModalContex";
import { Booking } from "@/components/Tables/fetch"; // Pastikan path ini benar

export function BookingViewModal() {
  const { isOpen, booking: booking, closeModal } = useBookingModal();

  const [formData, setFormData] = useState({
    roomName: "",
    bookingDate: "",
    startDate: "",
    endDate: "",
    startTime: "",
    endTime: "",
  });

  useEffect(() => {
    if (booking) {
      setFormData({
        roomName: String(booking.room?.name || ""),
        bookingDate: String(booking.bookingDate || ""),
        startDate: String(booking.startDate || ""),
        endDate: String(booking.endDate || ""),
        startTime: String(booking.startTime || ""),
        endTime: String(booking.endTime || ""),
      });
    }
  }, [booking]);

  if (!isOpen || !booking) return null;

  return (
    <ModalPortal>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
        <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-lg dark:bg-gray-800">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white">
              Booking Details
            </h2>
            <button onClick={closeModal} className="text-sm text-red-500">
              Close
            </button>
          </div>
          <div className="space-y-2 text-sm text-gray-700 dark:text-gray-200">
            <p>
              <strong>Room:</strong> {formData.roomName}
            </p>
            <p>
              <strong>Booking Date:</strong> {formData.bookingDate}
            </p>
            <p>
              <strong>Start Date:</strong> {formData.startDate}
            </p>
            <p>
              <strong>End Date:</strong> {formData.endDate}
            </p>
            <p>
              <strong>Start Time:</strong> {formData.startTime}
            </p>
            <p>
              <strong>End Time:</strong> {formData.endTime}
            </p>
          </div>
        </div>
      </div>
    </ModalPortal>
  );
}
