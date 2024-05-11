import React, { useEffect, useState } from 'react'
import databaseService from '../backend/database'
import ProductCard from '../components/ProductCard'
import { useSelector, useDispatch } from 'react-redux'
import { productToUpdate } from '../store/showListSlice'
import Loader from './Loader'
function ProductList() {
  const dispatch = useDispatch();
  const flag = useSelector((state) => state.showList.flag)
  const [products, setProducts] = useState([])
  const [loader, setLoader] = useState(false);
  useEffect(() => {
    async function getAllProducts() {
      setLoader(true)
      dispatch(productToUpdate(''))
      try {
        const session = await databaseService.listAllProducts();
        if (session) {
          setProducts(session.documents)
          setLoader(false);
        }
      } catch (error) {
        console.log(error);
      }
    }
    getAllProducts();
  }, [flag])
  return (
    <>
      {
        loader ?
          <Loader />
          :
          <div className="container mx-auto mt-8">
            <h1 className="text-4xl text-center font-bold mb-4 underline">All Products</h1>
            <div className="flex justify-center items-center flex-col gap-10">
              {
                products && products.length > 0 ? products.map(product => (
                  <ProductCard key={product.$id} product={product} />
                ))
                  : 'No Products'
              }
            </div>
          </div>
      }

    </>
  )
}

export default ProductList
