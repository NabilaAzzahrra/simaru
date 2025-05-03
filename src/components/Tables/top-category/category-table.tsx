"use client";

import { useEffect, useState } from "react";
import {  getCategoryData, Category} from "../fetch";
import { TrashIcon } from "@/assets/icons";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DownloadIcon, PreviewIcon } from "../icons";

export function CategoryTable() {
  const [data, setData] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    getCategoryData(token)
      .then((res) => {
        setData(res);
      })
      .catch((err) => console.error("Fetch Error:", err))
      .finally(() => setLoading(false));
  }, []);

  console.log("Fetched data:", data);
  if (loading) return <div>Loading...</div>;
  return (
    <div className="rounded-[10px] border border-stroke bg-white p-4 shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card sm:p-7.5">
      <Table>
        <TableHeader>
          <TableRow className="border-none bg-[#F7F9FC] dark:bg-dark-2 [&>th]:py-4 [&>th]:text-base [&>th]:text-dark [&>th]:dark:text-white">
            <TableHead className="min-w-[155px] xl:pl-7.5">No</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Description</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {data?.length > 0 ? (
            data.map((item, index) => (
              <TableRow key={item.id} className="border-[#eee] dark:border-dark-3">
                <TableCell className="min-w-[155px] xl:pl-7.5">
                  {index + 1}
                </TableCell>
  
                <TableCell>
                  {item.name}
                </TableCell>
  
                <TableCell>
                  {item.description}
                </TableCell>  
              </TableRow>
            ))
          ):(
            <TableRow className="border-[#eee] dark:border-dark-3">
              <TableCell colSpan={3}>No data found.</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
