"use client";

import { useEffect, useState } from "react";
import ModalPortal from "@/components/ModalPortal";
import { useBookingModalUpdate } from "@/components/Modal/booking/BookingModalContexUpdate";
import { Select } from "@/components/FormElements/select";

export function BookingUpdateModal() {
  const { isOpen, booking, closeModalUpdate } = useBookingModalUpdate();
  const [rooms, setRooms] = useState<{ id: number; name: string }[]>([]);
  const [formData, setFormData] = useState({
    roomId: "",
    bookingDate: "",
  });

  useEffect(() => {
    if (booking) {
      setFormData({
        roomId: String(booking.room?.id || ""),
        bookingDate: String(booking.bookingDate || ""),
      });

      const fetchRooms = async () => {
        try {
          const token = localStorage.getItem("token");
          if (!token) return;

          const res = await fetch("https://simaru.amisbudi.cloud/api/rooms", {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          });

          const data = await res.json();
          setRooms(data.data);
        } catch (err) {
          console.error("Failed to fetch rooms", err);
        }
      };

      fetchRooms();
    }
  }, [booking]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    const token = localStorage.getItem("token");
    if (!token || !booking) return;

    try {
      const response = await fetch(
        `https://simaru.amisbudi.cloud/api/bookings/${booking.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            bookingDate: formData.bookingDate,
            roomId: Number(formData.roomId),
          }),
        }
      );

      if (response.ok) {
        alert("Data berhasil diperbarui.");
        closeModalUpdate();
        window.location.reload();
      } else {
        alert("Gagal memperbarui data.");
      }
    } catch (error) {
      console.error("Update error:", error);
      alert("Terjadi kesalahan saat memperbarui.");
    }
  };

  if (!isOpen || !booking) return null;

  return (
    <ModalPortal>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
        <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-lg dark:bg-gray-800">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white">
              Update Booking
            </h2>
            <button onClick={closeModalUpdate} className="text-sm text-red-500">
              Close
            </button>
          </div>
          <div className="space-y-4">
            <input
              type="date"
              name="bookingDate"
              value={formData.bookingDate}
              onChange={handleChange}
              className="w-full rounded border px-3 py-2"
              placeholder="Booking Date"
            />
            <Select
              label=""
              name="roomId"
              placeholder="Pilih ruangan"
              defaultValue={formData.roomId}
              items={rooms.map((room) => ({
                value: String(room.id),
                label: room.name,
              }))}
              className="mt-1"
              handleChange={handleChange}
            />
            <button
              onClick={handleSubmit}
              className="w-full rounded bg-blue-600 py-2 text-white hover:bg-blue-700"
            >
              Update
            </button>
          </div>
        </div>
      </div>
    </ModalPortal>
  );
}
