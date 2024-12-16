import React, { useState, useEffect} from "react";
import ReactPaginate from "react-paginate";
import { useFetchData } from "../Products/useFetchData"; // Import the generic data fetching hook
import Product from "../Products/Product"; // Adjust the import path as needed
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from './../../actions/productActions';


const Pagination = ({ itemsPerPage = 9 }) => {
  // Use the useFetchData hook to fetch products from Fake Store API
  // const { 
  //   data: items, 
  //   isLoading, 
  //   error 
  // } = useFetchData('http://127.0.0.1:8000/api/products/');

  const dispatch = useDispatch()
  const productsList = useSelector((state) => state.productsList)

  const {error, loading, products} = productsList

  useEffect(() =>{
    dispatch(listProducts())
  }, [dispatch]); 

  console.log(products)

  
  // Pagination state management
  const [itemOffset, setItemOffset] = useState(0);
  const [itemStart, setItemStart] = useState(1);

  // // If data is loading, show a loading state
  // if (isLoading) {
  //   return (
  //     <div className="flex justify-center items-center h-64">
  //       <p className="text-xl">Loading products...</p>
  //     </div>
  //   );
  // }

  // // If there's an error, show error message
  // if (error) {
  //   return (
  //     <div className="flex justify-center items-center h-64 text-red-500">
  //       <p className="text-xl">Error loading products: {error.message}</p>
  //     </div>
  //   );
  // }

  // Calculate pagination details
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = items.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(items.length / itemsPerPage);

  // Page change handler
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    setItemOffset(newOffset);
    setItemStart(newOffset + 1);
  };

  // Items rendering component
  const Items = ({ currentItems }) => {
    return (
      <>
        {currentItems &&
          currentItems.map((item) => (
            <div key={item.id} className="w-full">
              <Product
                _id={item.id}
                img={item.image}
                productName={item.productName}
                price={item.price}
                des={item.description}
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
          Products from {itemStart} to {Math.min(endOffset, items.length)} of{" "}
          {items.length}
        </p>
      </div>
    </div>
  );
};  

export default Pagination;