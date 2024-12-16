import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import { 
    Menu, X, ShoppingCart, User, Search, 
} from 'lucide-react';

import { FaFacebookF } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaPinterest } from "react-icons/fa";
import { FaRegUser } from 'react-icons/fa';

const Navbar = ({ cart }) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            setIsScrolled(scrollPosition > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        document.body.style.overflow = isMenuOpen ? 'hidden' : 'unset';
    }, [isMenuOpen]);

    const toggleMobileMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const NavLink = ({ href, children, className = '' }) => (
        <a 
            href={href} 
            className={`
                flex items-center gap-2 
                transition-colors duration-300 
                hover:text-gray-600 
                ${className}
            `}
        >
            {children}
        </a>
    );

    return (
        <>
            <header className={`z-[1001] block fixed top-0 bg-white/20 backdrop-blur-sm w-full transition-all duration-300 ${
        isMenuOpen ? 'bg-white/20 backdrop-blur' : 'bg-white/20 backdrop-blur'
      }`}>
                {/* Desktop Navigation */}
                <nav className={`w-full flex items-center justify-between px-6 md:px-16 transition-all duration-300 ${
          isScrolled ? 'h-16 backdrop-blur' : 'h-20 md:h-24'
        }`}>
                    {/* Left Side Navigation */}
                    <div className='hidden md:flex items-center gap-10'>
                        <NavLink href="#about">ABOUT</NavLink>
                        <NavLink href="#collection">COLLECTION</NavLink>
                    </div>

                    {/* Logo */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 transition-all duration-300">
                        <Link to="/">
                            <h1 
                                className={`
                                    font-bold 
                                    transition-all 
                                    duration-300 
                                    font-bostonAngel 
                                    ${isMenuOpen ? 'text-black' : ''}
                                    ${isScrolled ? 'text-2xl md:text-3xl' : 'text-3xl md:text-5xl'}
                                `}
                            >
                                TEENZ
                            </h1>
                        </Link>
                    </div>

                    

                    {/* Right Side Navigation */}
                    <div className="flex justify-between items-center gap-6">
                        {/* Desktop Navigation */}
                        <div className="hidden md:flex items-center gap-8">
                            <NavLink href="#search" className="mr-2">
                                <Search className="w-5 h-5" />
                            </NavLink>
                            <NavLink href="/products" className="flex items-center gap-1">
                                <ShoppingCart className="w-5 h-5" />
                                SHOP
                            </NavLink>
                            <NavLink href="/cart" className="flex items-center gap-1">
                                <ShoppingCart className="w-5 h-5" />
                                CART
                            </NavLink>
                            <NavLink href="/loginSignUp" className="flex items-center gap-1">
                                <User className="w-5 h-5" />
                                PROFILE
                            </NavLink>
                        </div>
                        <div className={`absolute bottom-0 left-0 w-full transition-all duration-500 ${
            isScrolled ? 'border-b border-black-900' : ''
          }`}>
            {!isScrolled && (
              <div className="flex justify-between px-5">
                <div className="w-[40rem] border-b border-grey-900"></div>
                <div className="w-[40rem] border-b border-grey-900"></div>
              </div>
            )}
          </div>

                        {/* Mobile Menu Toggle */}
                        <button
                            onClick={toggleMobileMenu}
                            className={`
                                md:hidden
                                flex 
                                items-center 
                                justify-center 
                                p-2 
                                rounded-full 
                                transition-colors 
                                z-50 
                                ${isMenuOpen ? 'text-black hover:bg-white/10' : 'hover:bg-gray-100'}
                            `}
                            aria-label="Toggle Menu"
                        >
                            {isMenuOpen ? (
                                <X className="w-6 h-6" />
                            ) : (
                                <Menu className="w-6 h-6" />
                            )}
                        </button>
                    </div>
                </nav>

                {/* Mobile Menu Overlay */}
                {isMenuOpen && (
                    <div 
                        className="
                            fixed 
                            inset-0 
                            bg-white 
                            z-40 
                            flex 
                            flex-col 
                            h-full
                            overflow-y-auto
                            md:hidden
                        "
                    >
                        {/* Mobile Menu Top */}
                        <div className="mobile-menuTop p-6">
                            {/* Search Bar */}
                            <div className="mobile-menuSearchBar mb-6">
                                <div className="
                                    flex 
                                    items-center 
                                    border 
                                    rounded-full 
                                    px-4 
                                    py-2
                                ">
                                    <input 
                                        type="text" 
                                        placeholder="Search products" 
                                        className="
                                            w-full 
                                            outline-none 
                                            bg-transparent
                                        "
                                    />
                                    <Link to="/shop">
                                        <Search className="w-5 h-5" />
                                    </Link>
                                </div>
                            </div>

                            {/* Navigation List */}
                            <div className="mobile-menuList">
                                <ul className="space-y-4">
                                    {[
                                        { to: '/', label: 'HOME' },
                                        { to: '/shop', label: 'SHOP' },
                                        { to: '/blog', label: 'BLOG' },
                                        { to: '/about', label: 'ABOUT' },
                                        { to: '/contact', label: 'CONTACT' }
                                    ].map((item) => (
                                        <li key={item.to}>
                                            <Link 
                                                to={item.to} 
                                                onClick={toggleMobileMenu}
                                                className="
                                                    block 
                                                    text-xl 
                                                    font-semibold 
                                                    py-2 
                                                    border-b
                                                "
                                            >
                                                {item.label}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* Mobile Menu Footer */}
                        <div className="mobile-menuFooter p-6 mt-auto border-t">
                            {/* My Account */}
                            <div className="mobile-menuFooterLogin mb-6">
                                <Link 
                                    to="/loginSignUp" 
                                    onClick={toggleMobileMenu}
                                    className="
                                        flex 
                                        items-center 
                                        gap-3 
                                        text-lg 
                                        font-semibold
                                    "
                                >
                                    <FaRegUser />
                                    <p>My Account</p>
                                </Link>
                            </div>

                            {/* Language and Currency */}
                            <div className="mobile-menuFooterLangCurrency space-y-4">
                                <div className="mobile-menuFooterLang">
                                    <p className="font-semibold mb-2">Language</p>
                                    <select 
                                        name="language" 
                                        id="language"
                                        className="w-full p-2 border rounded"
                                    >
                                        <option value="english">United States | English</option>
                                        <option value="Hindi">Hindi</option>
                                        <option value="Germany">Germany</option>
                                        <option value="French">French</option>
                                    </select>
                                </div>
                                <div className="mobile-menuFooterCurrency">
                                    <p className="font-semibold mb-2">Currency</p>
                                    <select 
                                        name="currency" 
                                        id="currency"
                                        className="w-full p-2 border rounded"
                                    >
                                        <option value="USD">$ USD</option>
                                        <option value="INR">₹ INR</option>
                                        <option value="EUR">€ EUR</option>
                                        <option value="GBP">£ GBP</option>
                                    </select>
                                </div>
                            </div>

                            {/* Social Links */}
                            <div className="mobile-menuSocial_links flex justify-center gap-6 mt-6 pt-6 border-t">
                                <Link to="#facebook" className="hover:text-blue-600">
                                    <FaFacebookF/>                                    
                                </Link>
                                <Link to="#twitter" className="hover:text-blue-400">
                                    <FaXTwitter />
                                </Link>
                                <Link to="#instagram" className="hover:text-pink-600">
                                    <FaInstagram />
                                </Link>
                                <Link to="#youtube" className="hover:text-red-600">
                                    <FaYoutube />
                                </Link>
                                <Link to="#pinterest" className="hover:text-red-700">
                                    <FaPinterest />
                                </Link>
                            </div>
                        </div>
                    </div>
                )}
            </header>
        </>
    )
}

export default Navbar