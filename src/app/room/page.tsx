import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { RoomClientWrapper } from "@/components/Modal/room/RoomClientWrapper";
import { RoomTable } from "@/components/Tables/top-room/room-table";

import { Metadata } from "next";
import { RoomViewModal } from "../../components/Modal/room/room-view-modal";
import { RoomUpdateModal } from '../../components/Modal/room/room-update-modal';
import { RoomModalProvider } from "@/components/Modal/room/RoomModalContex";
import { RoomModalProviderUpdate } from "@/components/Modal/room/RoomModalContexUpdate";

export const metadata: Metadata = {
  title: "Tables",
};

const TablesPage = () => {
  return (
    <RoomModalProvider>
      <RoomModalProviderUpdate>
        <Breadcrumb pageName="Room" />
        <RoomClientWrapper />
        <RoomViewModal />
        <RoomUpdateModal />
        <div className="space-y-10">
          <RoomTable />
        </div>
      </RoomModalProviderUpdate>
    </RoomModalProvider>
  );
};

export default TablesPage;
