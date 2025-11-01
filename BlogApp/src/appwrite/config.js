import config from '../conf/conf.js'
import { Client, Databases, Storage , ID, Query } from 'appwrite'


export class Service {
    client  = new Client();
    databases;
    storage;

    constructor(){
        this.client
            .setEndpoint(config.appwriteUrl) // Your API Endpoint
            .setProject(config.appwriteProjectId) ;// Your project ID
            this.databases = new Databases(this.client);
            this.storage = new Storage(this.client);
    }

    async createPost({title, slug, content, featuredImage,status, userId}){
        try{
            const newPost = await this.databases.createDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId,
                }
            )
            return newPost;
        }catch(error){
            console.log("appwrite :: createPost :: error", error);
        }
    }
    // if in update post we want to use document id by ID.unique() then in our React component where we handle the form submission, we will get this newDocument object back. After the post is created, we typically navigate the user to the edit page for that new post. Finally, in our EditPost component, we'll get the ID from the URL (using useParams from React Router) and pass it to your updatePost function. our updatePost function should be set up to accept this ID. So, in summary, we create a new post with a unique ID, navigate to the edit page for that post, and then use that ID to update the post when the user submits the edit form.
    
    async updatePost(slug,{title, content, featuredImage,status}){
        try{
            return await this.databases.updateDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                }
            )
        }catch(error){
            console.log("appwrite :: updatePost :: error", error);
        }
    }

    async deletePost(slug){
        try{
            await this.databases.deleteDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug,
            )
            //this true will be returned if the post is successfully deleted and in our react component we can use it to show a success message, otherwise it will return false.
            return true;
        }catch(error){
            console.log("appwrite :: deletePost :: error", error);
            return false;
        }
    }

    async getPost(slug){
        try{
            return await this.databases.getDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug,
            )
        }catch(error){
            console.log("appwrite :: getPost :: error", error);
            return false;
        }
    }
    async getPosts(queries = [Query.equal("status", "active")]){
        try{
            return await this.databases.listDocuments(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                queries
            )
        }catch(error){
            console.log("appwrite :: getPosts :: error", error);
            return false;
        }
    }

    //file uploading
    async uploadFile(file){
        try {
            return await this.storage.createFile(
                config.appwriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("appwrite :: uploadFile :: error", error);
            return false;
        }
    }

    async deleteFile(fileId){
        try {
            await this.storage.deleteFile(
                config.appwriteBucketId,
                fileId
            )
            return true;
        } catch (error) {
            console.log("appwrite :: deleteFile :: error", error);
            return false;
        }
    }

    getFilePreview(fileId){
        // The Appwrite SDK's getFilePreview may return a Promise/stream in some environments.
        // For use directly as an <img src="..." /> in the browser, return a constructed
        // preview URL string that the browser can fetch.
        const base = String(config.appwriteUrl).replace(/\/$/, '');
        // Use the 'view' endpoint which returns the file content and works well as an <img src>
        // URL-encode the fileId to be safe with special characters.
        const encodedId = encodeURIComponent(String(fileId));
        return `${base}/storage/buckets/${config.appwriteBucketId}/files/${encodedId}/view?project=${config.appwriteProjectId}`;
    }

}


const service = new Service();
export default service;