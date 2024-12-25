import React, { useState, useEffect} from "react";
import ReactPaginate from "react-paginate";
import Product from "../Products/Product";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductList } from "../../redux/slices/ProductSlice";

const Pagination = ({ itemsPerPage = 9 }) => {
  const dispatch = useDispatch()
  const productList = useSelector((state) => state.product.productList)
  const { products: items = [], loading, error } = productList || {}

  useEffect(() => {
    dispatch(fetchProductList())
  }, [dispatch]); 
  
  // Pagination state management
  const [itemOffset, setItemOffset] = useState(0);
  const [itemStart, setItemStart] = useState(1);

  // If data is loading, show a loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-xl">Loading products...</p>
      </div>
    );
  }

  // If there's an error, show error message
  if (error) {
    return (
      <div className="flex justify-center items-center h-64 text-red-500">
        <p className="text-xl">Error loading products: {error}</p>
      </div>
    );
  }

  // Ensure items is an array
  const safeItems = Array.isArray(items) ? items : [];

  // Calculate pagination details
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = safeItems.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(safeItems.length / itemsPerPage);

  // Page change handler
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % safeItems.length;
    setItemOffset(newOffset);
    setItemStart(newOffset + 1);
  };

  // Items rendering component
  const Items = ({ currentItems }) => {
    // Add an additional check to ensure currentItems is an array
    if (!Array.isArray(currentItems)) {
      return null;
    }

    return (
      <>
        {currentItems.map((item) => (
          <div key={item.id || item._id} className="w-full">
            <Product
              _id={item.id || item._id}
              img={item.image || item.img}
              productName={item.title || item.productName}
              price={item.price}
              des={item.description || item.des}
            />
          </div>
        ))}
      </>
    );
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 mdl:gap-4 lg:gap-10">
        <Items currentItems={currentItems} />
      </div>
      <div className="flex flex-col mdl:flex-row justify-center mdl:justify-between items-center">
        <ReactPaginate
          nextLabel=""
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          marginPagesDisplayed={2}
          pageCount={pageCount}
          previousLabel=""
          pageLinkClassName="w-9 h-9 border-[1px] border-lightColor hover:border-gray-500 duration-300 flex justify-center items-center"
          pageClassName="mr-6"
          containerClassName="flex text-base font-semibold font-titleFont py-10"
          activeClassName="bg-black text-white"
        />

        <p className="text-base font-normal text-lightText">
          Products from {itemStart} to {Math.min(endOffset, safeItems.length)} of{" "}
          {safeItems.length}
        </p>
      </div>
    </div>
  );
};  

export default Pagination;