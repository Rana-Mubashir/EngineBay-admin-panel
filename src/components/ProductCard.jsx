import React from 'react';
import databaseService from '../backend/database';
import DeleteProduct from './DeleteProduct';
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { productToUpdate } from '../store/showListSlice';
const ProductCard = ({ product }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    function onUpdateClick() {
        dispatch(productToUpdate(product))
        navigate('/')
    }
    return (
        <div className="bg-white shadow-lg rounded-lg overflow-hidden w-full max-w-4xl mx-auto my-4 ">
            <div className="flex items-center p-4">
                <img
                    src={databaseService.getFilePre(product.imageId)}
                    alt={product.name}
                    className="w-32 h-32 object-cover mr-4"
                />
                <div className="flex-1">
                    <h3 className="text-gray-800 font-bold text-lg mb-2">{product.name}</h3>
                    <div className="flex justify-between items-center mb-2 gap-3">
                        <span className="text-red-600 text-sm">Original Price: <del>${product.originalPrice}</del></span>
                        <span className="text-green-600 text-sm">Discounted Price: ${product.discountedPrice}</span>
                    </div>
                    <div className="flex gap-4">
                        <button
                            className="bg-white hover:bg-gray-300 text-black font-bold py-2 px-4 rounded border-2 border-black"
                            onClick={() => onUpdateClick(product.$id)}
                        >
                            Update
                        </button>
                        <DeleteProduct productId={product.$id} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
