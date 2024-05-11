import config from "../config/config";
import { Client, Databases, ID, Storage, Query } from "appwrite"
class Database {
    client = new Client()
    database
    storage
    constructor() {
        this.client
            .setEndpoint(config.Project_url)
            .setProject(config.Project_id)
        this.database = new Databases(this.client)
        this.storage = new Storage(this.client)
    }
    async addProduct(name, discountedPrice,imageId, category, description, originalPrice) {
        try {
            const session = await this.database.createDocument(
                config.Database_id,
                config.Product_ingredients,
                ID.unique(),
                {
                    name, discountedPrice,imageId, category, description, originalPrice
                }
            )
            return session
        } catch (error) {
            throw error
        }
    }
    async updateProduct(productId,name, discountedPrice,imageId, category, description, originalPrice){
        try {
            await this.database.updateDocument(
                config.Database_id,
                config.Product_ingredients,
                productId,
                {
                    name, discountedPrice,imageId, category, description, originalPrice
                }
            )
        } catch (error) {
            
        }
    }
    async delProduct(productId) {
        try {
            const session = await this.database.deleteDocument(
                config.Database_id,
                config.Product_ingredients,
                productId
            )
            return session
        } catch (error) {
            throw error
        }
    }
    async getProduct(documentId) {
        try {
            const session = this.database.getDocument(
                config.Database_id,
                config.Product_ingredients,
                documentId
            )
            return session
        } catch (error) {
            throw error
        }
    }
    async listAllProducts() {
        try {
            const session = await this.database.listDocuments(
                config.Database_id,
                config.Product_ingredients
            )
            return session
        } catch (error) {
            throw error
        }
    }
    // file uploading 

    async uploadImage(file) {
        try {
            let session = await this.storage.createFile(config.Bucket_id, ID.unique(), file)
            return session;
        } catch (error) {
            throw error
        }
    }
    async delImage(fileId){
        try {
            this.storage.deleteFile(
                config.Bucket_id,
                fileId
            )
        } catch (error) {
            
        }
    }
    getFilePre(fileId) {
        return this.storage.getFilePreview(config.Bucket_id, fileId);
    }
}
const databaseService = new Database();
export default databaseService;