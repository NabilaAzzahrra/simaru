"use client";

import { useEffect, useState } from "react";
import ModalPortal from "@/components/ModalPortal";
import { useRoomModalUpdate } from "@/components/Modal/room/RoomModalContexUpdate";
import { Select } from "@/components/FormElements/select";
import { Category } from "@/components/Tables/fetch";

export function RoomUpdateModal() {
  const { isOpen, room, closeModalUpdate } = useRoomModalUpdate();
  const [categories, setCategories] = useState<Category[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    capacity: "",
    description: "",
    categoryId: "",
  });

  useEffect(() => {
    if (room) {
      setFormData({
        name: room.name || "",
        price: String(room.price || ""),
        capacity: String(room.capacity || ""),
        description: room.description || "",
        categoryId: String(room.category?.id || ""),
      });

      const fetchCategories = async () => {
        try {
          const token = localStorage.getItem("token");
          if (!token) {
            console.error("No token found.");
            return;
          }
    
          const res = await fetch("https://simaru.amisbudi.cloud/api/categories", {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type":"application/json",
            },
          });

          console.log("tokennnn",token);
          
    
          const data = await res.json();
          console.log("Fetched categories:", data);
          setCategories(data);
        } catch (err) {
          console.error("Failed to fetch categories", err);
        }
      };
      fetchCategories();
    }
  }, [room]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    const token = localStorage.getItem("token");
    if (!token || !room) return;

    try {
      const response = await fetch(
        `https://simaru.amisbudi.cloud/api/rooms/${room.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            ...formData,
            price: Number(formData.price),
            capacity: Number(formData.capacity),
          }),
        },
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

  if (!isOpen || !room) return null;

  return (
    <ModalPortal>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
        <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-lg dark:bg-gray-800">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white">
              Update Room
            </h2>
            <button onClick={closeModalUpdate} className="text-sm text-red-500">
              Close
            </button>
          </div>
          <div className="space-y-4">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full rounded border px-3 py-2"
              placeholder="Room name"
            />
            <Select
              label=""
              name="categoryId"
              placeholder="Select category"
              defaultValue={formData.categoryId}
              items={categories.map((cat) => ({
                value: String(cat.id),
                label: cat.name,
              }))}
              className="mt-1"
              handleChange={handleChange}
            />
            <input
              type="text"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full rounded border px-3 py-2"
              placeholder="Price"
            />
            <input
              type="text"
              name="capacity"
              value={formData.capacity}
              onChange={handleChange}
              className="w-full rounded border px-3 py-2"
              placeholder="Capacity"
            />
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full rounded border px-3 py-2"
              placeholder="Description"
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
