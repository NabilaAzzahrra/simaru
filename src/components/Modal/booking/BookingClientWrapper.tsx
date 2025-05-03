"use client";

import { useState } from "react";
import { AddIcon } from "@/assets/icons";
import { Button } from "@/components/ui-elements/button";
import { BookingAddModal } from "./booking-add-modal";

export const BookingClientWrapper = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="space-y-10">
        <Button
          label="Add Booking"
          variant="outlinePrimary"
          shape="full"
          size="small"
          icon={<AddIcon />}
          className="mb-4"
          onClick={() => setShowModal(true)}
        />
      </div>
      <BookingAddModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </>
  );
};
