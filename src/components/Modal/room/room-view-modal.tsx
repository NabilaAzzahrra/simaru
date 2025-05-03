"use client";

import { useEffect, useState } from "react";
import ModalPortal from "@/components/ModalPortal";
import { useRoomModal } from "@/components/Modal/room/RoomModalContex";
import { Category } from '../../Tables/fetch';

export function RoomViewModal() {
  const { isOpen, room, closeModal } = useRoomModal();

  const [formData, setFormData] = useState({
    name: "",
    categoryName: "",
    price: "",
    capacity: "",
    description: "",
  });

  useEffect(() => {
    if (room) {
      setFormData({
        name: room.name || "",
        categoryName: String(room.category?.name || ""),
        price: String(room.price || ""),
        capacity: String(room.capacity || ""),
        description: room.description || "",
      });
    }
  }, [room]);

  if (!isOpen || !room) return null;

  return (
    <ModalPortal>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
        <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-lg dark:bg-gray-800">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white">Room Details</h2>
            <button onClick={closeModal} className="text-sm text-red-500">Close</button>
          </div>
          <div>
            <p><strong>Name:</strong> {formData.name}</p>
            <p><strong>Category:</strong> {formData.name}</p>
            <p><strong>Price:</strong> {formData.price}</p>
            <p><strong>Capacity:</strong> {formData.capacity}</p>
            <p><strong>Description:</strong> {formData.description}</p>
          </div>
        </div>
      </div>
    </ModalPortal>
  );
}
