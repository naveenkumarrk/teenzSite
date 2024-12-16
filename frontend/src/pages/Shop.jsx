import React, { useState } from "react";
import SideFilter from "../components/Shop/filter/SideFilter";
import Pagination from '../components/Shop/Pagination';
import ShopDetails from './../components/Shop/ShopDetails';
import AvailProducts from './../components/Products/Available/AvailProducts';
import Breadcrumbs from "../components/Shop/Breadcrumbs";


const Shop = () => {
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const itemsPerPageFromBanner = (itemsPerPage) => {
    setItemsPerPage(itemsPerPage);
  };

  return (
    <div className="mt-28 max-w-container mx-auto px-10 md:px-28">
      <Breadcrumbs title="Products" />
      {/* ================= Products Start here =================== */}
      <div className="w-full h-full flex pb-20 gap-10">
        <div className="w-[20%] lgl:w-[25%] hidden md:inline-flex h-full">
          {/* <SideFilter/> */}
          <AvailProducts/>
        </div>
        <div className="w-full mdl:w-[80%] lgl:w-[75%] h-full flex flex-col gap-10">
          {/* <ProductBanner itemsPerPageFromBanner={itemsPerPageFromBanner} />*/}
          <Pagination itemsPerPage={itemsPerPage} />           
        </div>
      </div>
      {/* ================= Products End here ===================== */}
    </div>
    // <>
    // <ShopDetails/>
    // </>
  );
};

export default Shop;
