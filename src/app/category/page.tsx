import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { CategoryTable } from "@/components/Tables/top-category/category-table";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tables",
};

const TablesPage = () => {
  return (
    <>
      <Breadcrumb pageName="Category" />

      <div className="space-y-10">
        <CategoryTable />
      </div>
    </>
  );
};

export default TablesPage;
