"use client";

import { useEffect, useState } from "react";
import { getBookingData, Booking } from "../fetch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TrashIcon } from "@/assets/icons";
import { PreviewIcon, UpdateIcon } from "../icons";
import { useBookingModal } from "@/components/Modal/booking/BookingModalContex";
import { useBookingModalUpdate } from "@/components/Modal/booking/BookingModalContexUpdate";


export function BookingTable() {
  const [data, setData] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  const { openModal } = useBookingModal();
  const { openModalUpdate } = useBookingModalUpdate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    getBookingData(token)
      .then((res) => {
        setData(res);
      })
      .catch((err) => console.error("Fetch Error:", err))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id: number) => {
    if (confirm("Yakin ingin menghapus item ini?")) {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("No token found.");
          return;
        }
        const response = await fetch(
          `https://simaru.amisbudi.cloud/api/bookings/${id}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          },
        );

        if (response.ok) {
          alert("Data berhasil dihapus.");
          window.location.reload();
        } else {
          alert("Gagal menghapus data.");
        }
      } catch (error) {
        console.error("Error saat menghapus:", error);
        alert("Terjadi kesalahan.");
      }
    }
  };

  const handlePreview = async (id: number) => {
    console.log("Preview clicked", id);
    const booking = data.find((item) => item.id === id);
    if (booking) {
      console.log("Booking found:", booking);
      openModal(booking);
    } else {
      console.log("Booking not found");
    }
  };

  const handleUpdate = async (id: number) => {
    console.log("Preview clicked", id);
    const booking = data.find((item) => item.id === id);
    if (booking) {
      console.log("Booking found:", booking);
      openModalUpdate(booking); 
    } else {
      console.log("Booking not found");
    }
  };

  console.log("Fetched data:", data);
  if (loading) return <div>Loading...</div>;
  return (
    <div className="rounded-[10px] border border-stroke bg-white p-4 shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card sm:p-7.5">
      <Table>
        <TableHeader>
          <TableRow className="border-none bg-[#F7F9FC] dark:bg-dark-2 [&>th]:py-4 [&>th]:text-base [&>th]:text-dark [&>th]:dark:text-white">
            <TableHead className="xl:pl-7.5">No</TableHead>
            <TableHead>Room</TableHead>
            <TableHead>Start Date</TableHead>
            <TableHead>End Date</TableHead>
            <TableHead>Booking Date</TableHead>
            <TableHead>Start Time</TableHead>
            <TableHead>End Time</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {data?.length > 0 ? (
            data.map((item, index) => (
              <TableRow
                key={item.id}
                className="border-[#eee] dark:border-dark-3"
              >
                <TableCell className="min-w-[155px] xl:pl-7.5">
                  {index + 1}
                </TableCell>

                <TableCell>{item.room.name}</TableCell>

                <TableCell>{item.startDate}</TableCell>

                <TableCell>{item.endDate}</TableCell>

                <TableCell>{item.bookingDate}</TableCell>

                <TableCell>{item.startTime}</TableCell>

                <TableCell>{item.endTime}</TableCell>

                <TableCell>
                  <div className="flex items-center justify-between">
                    <button
                      className="hover:text-primary"
                      onClick={() => handleDelete(item.id)}
                    >
                      <span className="sr-only">Delete Invoice</span>
                      <TrashIcon />
                    </button>

                    <button
                      className="hover:text-primary"
                      onClick={() => handlePreview(item.id)}
                    >
                      <span className="sr-only">View Booking</span>
                      <PreviewIcon />
                    </button>

                    <button
                      className="hover:text-primary"
                      onClick={() => handleUpdate(item.id)}
                    >
                      <span className="sr-only">Update Room</span>
                      <UpdateIcon />
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow className="border-[#eee] dark:border-dark-3">
              <TableCell colSpan={3}>No data found.</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
