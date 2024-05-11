const config={
    Project_url:String(import.meta.env.VITE_PROJECT_URL),
    Project_id:String(import.meta.env.VITE_PROJECT_ID),
    Database_id:String(import.meta.env.VITE_DATABASE_ID),
    User_cart:String(import.meta.env.VITE_USERCART_COLLECTION_ID),
    Product_ingredients:String(import.meta.env.VITE_PRODUCT_COLLECTION_ID),
    Bucket_id:String(import.meta.env.VITE_BUCKET_ID)
}
export default config