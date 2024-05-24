import React from 'react'
import databaseService from '../backend/database'
import { useDispatch } from 'react-redux';
import { toggleFlag } from '../store/showListSlice';
function DeleteProduct({ product }) {
    const dispatch = useDispatch();
    async function delItem() {
        try {
            console.log(product)
            const deleteImg = await databaseService.delImage(product.imageId);
            if (deleteImg) {
                const session = await databaseService.delProduct(product.$id);
                if (session) {
                    dispatch(toggleFlag());
                }
            }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div>
            <button
                className="bg-white hover:bg-gray-300 text-black font-bold py-2 px-4 rounded border-2 border-black"
                onClick={() => delItem()}
            >
                Delete
            </button>
        </div>
    )
}

export default DeleteProduct
