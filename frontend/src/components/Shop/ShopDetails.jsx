import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import "./ShopDetails.css";

import { useDispatch, useSelector } from "react-redux";

import { Link } from "react-router-dom";
import { FiHeart } from "react-icons/fi";
import { FaStar } from "react-icons/fa";
import { IoFilterSharp, IoClose } from "react-icons/io5";
import { FaCartPlus } from "react-icons/fa";
import toast from "react-hot-toast";
import useFetchData from "../Products/useFetchData";
import { addToCart } from "../../slices/CartSlice";
import SideFilter from './filter/SideFilter';
// import Filter from "../Filters/Filter";  // Uncommented Filter import

const ShopDetails = () => {
    const itemsPerPage = 8;  // Number of items to display per page
    const { 
        data: items, 
        isLoading, 
        error 
    } = useFetchData('https://fakestoreapi.com/products');
    
    const dispatch = useDispatch();

    const [wishList, setWishList] = useState({});
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [itemOffset, setItemOffset] = useState(0);

    const handleWishlistClick = (productID) => {
        setWishList((prevWishlist) => ({
            ...prevWishlist,
            [productID]: !prevWishlist[productID],
        }));
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    const toggleDrawer = () => {
        setIsDrawerOpen(!isDrawerOpen);
    };

    const closeDrawer = () => {
        setIsDrawerOpen(false);
    };

    const handleAddToCart = (item) => {
        dispatch(
            addToCart({
                _id: item.id,
                name: item.title,
                quantity: 1,
                image: item.image,
                price: item.price,
            })
        );
        toast.success("Item added to cart!", {
            duration: 2000,
            style: {
                backgroundColor: "#07bc0c",
                color: "white",
            },
            iconTheme: {
                primary: "#fff",
                secondary: "#07bc0c",
            },
        });
    };

    // If data is loading, show a loading state
    if (isLoading) {
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
                <p className="text-xl">Error loading products: {error.message}</p>
            </div>
        );
    }

    // Pagination calculation
    const endOffset = itemOffset + itemsPerPage;
    const currentItems = items.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(items.length / itemsPerPage);

    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % items.length;
        setItemOffset(newOffset);
        scrollToTop();
    };

    return (
        <>
            <div className="shopDetails">
                <div className="shopDetailMain">
                    <div className="shopDetails__left">
                        <SideFilter />
                    </div>
                    
                    <div className="shopDetails__right">
                        <div className="shopDetailsSorting">
                            <div className="shopDetailsBreadcrumbLink">
                                <Link to="/" onClick={scrollToTop}>
                                    Home
                                </Link>
                                &nbsp;/&nbsp;
                                <Link to="/shop">The Shop</Link>
                            </div>
                            <div className="filterLeft" onClick={toggleDrawer}>
                                <IoFilterSharp />
                                <p>Filter</p>
                            </div>
                            <div className="shopDetailsSort">
                                <select name="sort" id="sort">
                                    <option value="default">Default Sorting</option>
                                    <option value="Featured">Featured</option>
                                    <option value="bestSelling">Best Selling</option>
                                    <option value="a-z">Alphabetically, A-Z</option>
                                    <option value="z-a">Alphabetically, Z-A</option>
                                    <option value="lowToHigh">Price, Low to high</option>
                                    <option value="highToLow">Price, high to low</option>
                                    <option value="oldToNew">Date, old to new</option>
                                    <option value="newToOld">Date, new to old</option>
                                </select>
                                <div className="filterRight" onClick={toggleDrawer}>
                                    <div className="filterSeprator"></div>
                                    <IoFilterSharp />
                                    <p>Filter</p>
                                </div>
                            </div>
                        </div>
                        <div className="shopDetailsProducts">
                            <div className=" shadow-md shopDetailsProductsContainer">
                                {currentItems && currentItems.map((item) =>  (
                                    <div className="sdProductContainer" key={item.id}>
                                        <div className="sdProductImages">
                                            <Link to="/Product" onClick={scrollToTop}>
                                                <img
                                                    src={item.image}
                                                    alt=""
                                                    className="sdProduct_front"
                                                />
                                                <img
                                                    src={item.image}
                                                    alt=""
                                                    className="sdProduct_back"
                                                />
                                            </Link>
                                            <h4 onClick={() => handleAddToCart(item)}>
                                                Add to Cart
                                            </h4>
                                        </div>
                                        <div
                                            className="sdProductImagesCart"
                                            onClick={() => handleAddToCart(item)}
                                        >
                                            <FaCartPlus />
                                        </div>
                                        <div className="sdProductInfo">
                                            <div className="sdProductCategoryWishlist">
                                                <p>Dresses</p>
                                                <FiHeart
                                                    onClick={() => handleWishlistClick(item.id)}
                                                    style={{
                                                        color: wishList[item.id]
                                                            ? "red"
                                                            : "#767676",
                                                        cursor: "pointer",
                                                    }}
                                                />
                                            </div>
                                            <div className="sdProductNameInfo">
                                                <Link to={`/products/${item.id}`} onClick={scrollToTop}>
                                                    <h5>{item.title}</h5>
                                                </Link>

                                                <p>${item.price}</p>
                                                <div className="sdProductRatingReviews">
                                                    <div className="sdProductRatingStar">
                                                        <FaStar color="#FEC78A" size={10} />
                                                        <FaStar color="#FEC78A" size={10} />
                                                        <FaStar color="#FEC78A" size={10} />
                                                        <FaStar color="#FEC78A" size={10} />
                                                        <FaStar color="#FEC78A" size={10} />
                                                    </div>
                                                    <span>{item.rating.rate}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="shopDetailsPagination">
                            <ReactPaginate
                                breakLabel="..."
                                nextLabel="Next >"
                                onPageChange={handlePageClick}
                                pageRangeDisplayed={5}
                                pageCount={pageCount}
                                previousLabel="< Prev"
                                renderOnZeroPageCount={null}
                                containerClassName="pagination"
                                activeClassName="active"
                            />
                        </div>
                    </div>
                </div>
            </div>
            {/* Drawer */}
            <div className={`filterDrawer ${isDrawerOpen ? "open" : ""}`}>
                <div className="drawerHeader">
                    <p>Filter By</p>
                    <IoClose onClick={closeDrawer} className="closeButton" size={26} />
                </div>
                <div className="drawerContent">
                    <SideFilter />
                </div>
            </div>
        </>
    );
};

export default ShopDetails;