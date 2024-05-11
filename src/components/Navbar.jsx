import React from 'react';
import { Link, NavLink } from 'react-router-dom'
const Navbar = () => {
    return (
        <nav className="bg-gray-800 p-4">
            <div className="container mx-auto flex flex-col lg:flex-row lg:justify-between items-center">
                <a href="#" className="text-white text-xl lg:text-2xl font-bold mb-4 lg:mb-0">EnGiNeBaY</a>
                <ul className="flex flex-col lg:flex-row lg:space-x-4">
                    <li>
                        <NavLink
                            to="/"
                            className={({ isActive }) =>
                                `block py-2 pr-4 pl-3 duration-200 ${isActive ? "text-yellow-500" : "text-white"} border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-yellow-500 lg:p-0`
                            }
                        >
                            Add Product
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/productList"
                            className={({ isActive }) =>
                                `block py-2 pr-4 pl-3 duration-200 ${isActive ? "text-yellow-500" : "text-white"} border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-yellow-500 lg:p-0`
                            }
                        >
                            Product List
                        </NavLink>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
