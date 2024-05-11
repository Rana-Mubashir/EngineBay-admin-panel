import React from 'react'
import { useState } from 'react';
import databaseService from '../backend/database'
import { useSelector, useDispatch } from 'react-redux';
import { productToUpdate } from '../store/showListSlice';
import { useNavigate } from 'react-router-dom';
import { useForm} from 'react-hook-form'
import Loader from './Loader';
function AddProductForm() {
    const dispatch = useDispatch();
    const product = useSelector((state) => state.showList.product)
    const [error, setError] = useState('')
    const [loader, setLoader] = useState(false);
    const navigate = useNavigate();
    const {register,handleSubmit}=useForm({
     defaultValues:{
        productName:product ? product.name : '',
        productDescription:product ? product.description : '',
        discountedPrice:product ? product.discountedPrice : '',
        originalPrice:product ? product.originalPrice : '',
        productCategory:product ? product.category : '',
     }
    })
    async function submit(data) {
        setLoader(true);
        try {
            if (product) {
                const file = await databaseService.uploadImage(data.image[0])
                if (file) {
                    await databaseService.delImage(product.imageId);
                }
                if (file) {
                    const imageId = file.$id
                    const updateDocument = await databaseService.updateProduct(
                        product.$id,
                        data.productName,
                        data.discountedPrice,
                        imageId,
                        data.productCategory,
                        data.productDescription,
                        data.originalPrice
                    )
                    if (updateDocument) {
                        dispatch(productToUpdate(''))
                        navigate("/productList")
                    }
                }

            }
            else {
                const file = await databaseService.uploadImage(data.image[0]);
                if (file) {
                    const imageId = file.$id;
                    const uploadDocument = await databaseService.addProduct(
                        data.productName,
                        data.discountedPrice,
                        imageId,
                        data.productCategory,
                        data.productDescription,
                        data.originalPrice
                    );
                    if (uploadDocument) {
                        navigate("/productList")
                    }
                }

            }
        } catch (error) {
            setLoader(false)
            setError(error.message)
            console.log(error)
        }

    }
    return (
        <>
            {
                loader ?
                    <Loader />
                    :
                    <form onSubmit={handleSubmit(submit)} className="bg-gray-100 p-8">
                        <div className="mb-5">
                            <h1 className='text-center text-5xl underline'>Product Form</h1>
                        </div>
                        <div className="container mx-auto">
                            <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                                <h2 className="text-3xl font-semibold mb-4">{
                                    product ?
                                    "Update Product"
                                    :
                                    "Add Product"
                                }
                                </h2>
                                <div className="">
                                    <p className="text-center text-red-500 text-sm md:text-xl lg:text-2xl">{error}</p>
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="productName" className="block text-gray-700 font-bold mb-2">Product Name</label>
                                    <input
                                        type="text"
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        placeholder="Enter product name"
                                        {...register('productName', {
                                            required: true
                                        })}
                                    />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="productDescription" className="block text-gray-700 font-bold mb-2">Product Description</label>
                                    <textarea
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        placeholder="Enter product description"
                                        rows="4"
                                        {...register('productDescription', {
                                            required: true
                                        })}
                                    ></textarea>
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="originalPrice" className="block text-gray-700 font-bold mb-2">Original Price</label>
                                    <input
                                        type="number"
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        placeholder="Enter original price"
                                        {...register('originalPrice', {
                                            required: true
                                        })}
                                    />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="discountedPrice" className="block text-gray-700 font-bold mb-2">Discounted Price</label>
                                    <input
                                        type="number"
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        placeholder="Enter discounted price"
                                        {...register('discountedPrice', {
                                            required: true
                                        })}
                                    />
                                </div>
                                <div className="mb-6">
                                    <label htmlFor="productCategory" className="block text-gray-700 font-bold mb-2">Select Category</label>
                                    <select
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        {...register('productCategory', {
                                            required: true
                                        })}
                                    >
                                        <option value="">Select category</option>
                                        <option value="Decoration">Decoration</option>
                                        <option value="Cleaning item">Cleaning item</option>
                                        <option value="Body Part">Body Part</option>
                                    </select>
                                </div>
                                <div className="mb-6">
                                    <label htmlFor="productImage" className="block text-gray-700 font-bold mb-2">Product Image</label>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        {...register ("image",{
                                            required:!product
                                        })}
                                        className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    />
                                </div>
                                <div className="flex items-center justify-between">
                                    <button
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                        type='submit'
                                    >
                                        {
                                            product ? 'Update post' : 'Add Post'
                                        }

                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
            }

        </>
    )
}

export default AddProductForm
