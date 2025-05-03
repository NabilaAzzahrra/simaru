"use client";
import InputGroup from "@/components/FormElements/InputGroup";
import { Select } from "@/components/FormElements/select";
import ModalPortal from "@/components/ModalPortal";
import React , {useEffect, useState} from "react";

type Category = {
    id: number;
    name: string;
};

export function RoomAddModal({ 
    isOpen, 
    onClose 
    }: { 
    isOpen: boolean; 
    onClose: () => void 
    }) {
    const [categories, setCategories] = useState<Category[]>([]);

    const [formData, setFormData] =useState({
        name:"",
        categoryId:"",
        price:"",
        capacity:"",
        description:"",
    });

    const [loading, setLoading]= useState(false);

    useEffect(() => {
        if (isOpen) {
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
    }, [isOpen]);

    if (!isOpen) return null;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
          ...prev,
          [name]: value,
        }));
      };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        setLoading(true);
        try {
            const token = localStorage.getItem("token");
                  if (!token) {
                    console.error("No token found.");
                    return;
                  }
          const res = await fetch("https://simaru.amisbudi.cloud/api/rooms",{
            method: "POST",
            headers:{
              "Content-Type":"application/json",
              "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify(formData),
          });
          const result = await res.json();
          if (!res.ok) {
            console.log("Error:", result.message || result.errors || "Register failed");
            return;
          }
          console.log("Success:", result);
          window.location.reload();
          if (result.accessToken) {
            localStorage.setItem("token", result.accessToken);
          }
        } catch (err) {
          console.log("Error:", err);
        } finally {
          setLoading(false);
        }
      }
  return (
    <ModalPortal>
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl w-full max-w-md shadow-lg">
                <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Add Room</h2>
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <InputGroup
                        label="Name"
                        type="text"
                        name="name"
                        placeholder="Enter room name"
                        className="mb-4.5"
                        value={formData.name}
                        handleChange={handleChange}
                    />
                    <Select
                        label="Category"
                        name="categoryId"
                        placeholder="Select category"
                        defaultValue=""
                        items={categories.map(cat => ({
                            value: String(cat.id),
                            label: cat.name,
                        }))}
                        className="mt-1"
                        handleChange={handleChange}
                    />
                    <InputGroup
                            label="Price"
                            type="text"
                            name="price"
                            placeholder="Enter room price"
                            className="mb-4.5"
                            value={formData.price}
                            handleChange={handleChange}
                    />
                    <InputGroup
                        label="Capacity"
                        type="text"
                        name="capacity"
                        placeholder="Enter room capacity"
                        className="mb-4.5"
                        value={formData.capacity}
                        handleChange={handleChange}
                    />
                    <InputGroup
                        label="Description"
                        type="text"
                        name="description"
                        placeholder="Enter room description"
                        className="mb-4.5"
                        value={formData.description}
                        handleChange={handleChange}
                    />
                <div className="flex justify-end space-x-2 mt-4">
                    <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
                    >
                    Cancel
                    </button>
                    <button type="submit" disabled={loading} className="flex w-full justify-center rounded-lg bg-primary p-[13px] font-medium text-white hover:bg-opacity-90">
          {loading ? "Saving..." : "Submit"}
                    </button>
                </div>
                </form>
            </div>
        </div>
    </ModalPortal>
  );
}
