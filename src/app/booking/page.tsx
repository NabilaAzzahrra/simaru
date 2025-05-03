import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { BookingUpdateModal } from "@/components/Modal/booking/booking-update-modal";
import { BookingViewModal } from "@/components/Modal/booking/booking-view-modal";
import { BookingClientWrapper } from "@/components/Modal/booking/BookingClientWrapper";
import { BookingModalProvider } from "@/components/Modal/booking/BookingModalContex";
import { BookingModalProviderUpdate } from "@/components/Modal/booking/BookingModalContexUpdate";
import { BookingTable } from "@/components/Tables/top-booking/booking-table";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tables",
};

const TablesPage = () => {
  return (
    <BookingModalProvider>
      <BookingModalProviderUpdate>
      <Breadcrumb pageName="Booking" />
      <BookingClientWrapper />
      <BookingViewModal/>
      <BookingUpdateModal />
      <div className="space-y-10">
        <BookingTable />
      </div>
      </BookingModalProviderUpdate>
    </BookingModalProvider>
  );
};

export default TablesPage;
