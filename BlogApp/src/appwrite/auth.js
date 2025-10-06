import config from '../conf/conf.js'
import { Client, Account, ID } from 'appwrite'

export class AuthService {
    client  = new Client();
    account;

    constructor(){
        this.client
            .setEndpoint(config.appwriteUrl) // Your API Endpoint
            .setProject(config.appwriteProjectId) ;// Your project ID
        this.account = new Account(this.client);
    }
    async createAccount({email,password, name}){
        try{
            const userAccount  = await this.account.create(ID.unique(), email, password, name);
            if (userAccount) {
                //call another method: if user's accpount created successfully then automatically login the user
                return this.login({email, password});
            } else {
                return userAccount;
            }
        }catch(error){
            throw error;
        }
    }
    async login({email, password}){
        try{
            return await this.account.createEmailPasswordSession(email, password);
        }catch(error){
            console.error('AuthService.login error:', error);
            throw error;
        }
    }
    //if user is at home page and we need to know whether user is logged in or not then we can use this method
    async getCurrentUser(){
        try{
            return await this.account.get();
        }catch(error){
            console.log("appwrite :: getCurrentUser :: error", error);
        }
        // if above return statement fails then return null
        return null;
    }

    async logout(){
        try{
            // delete the current session
            return await this.account.deleteSession('current');
        }catch(error){
            throw error;
        }
        return null;
    }
}


const authService = new AuthService();


export default authService;