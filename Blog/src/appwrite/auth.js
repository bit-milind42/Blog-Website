// import conf from '../conf.js'
// import { Client, Account, ID} from "appwrite";

// export class AuthService {
//     Client = new Client();
//     account;

//     constructor(){
//         this.Client
//             .setEndpoint(conf.appwriteUrl)
//             .setProject(conf.appwriteProjectId);
//         this.account = new Account(this.client);
//     }

//     async createAccount({email, password, name}) {
//         try{
//             const userAccount =await this.account.create(ID.unique(), email, password, name);
//             if(userAccount){
//                 // call another method
//                 return this.login({email, password});

//             }else{
//                 return userAccount;
//             }

//         }catch(error){
//             throw error;
//         }
//     }

//     async login({email, password}){
//         try{
//             return await this.account.createEmailPasswordSession(email,password);
//         } catch(error){
//             throw error;
//         }
//     }
//     async getCurrentUser(){
//         try{
//             return await this.account.get();
//         }catch(error){
//             console.log("Appwrite serive :: getCurrentUser :: error", error);

//         }
//         return null;
//     }

//     async logout(){
//         try{
//             await this.account.deleteSessions();
//         } catch(error){
//             console.log("Appwrite serive :: logout :: error", error);

//         }
//     }
// }
// const authService = new AuthService();

// export default AuthService


import conf from '../conf.js'
// Import necessary modules from Appwrite
import { Client, Account, ID } from "appwrite";

// Define the AuthService class to handle authentication using Appwrite
export class AuthService {
    // Create a new instance of the Appwrite Client
    Client = new Client();
    account;

    // Constructor to initialize the client and set up the project and endpoint
    constructor() {
        this.Client
            .setEndpoint(conf.appwriteUrl) // Set the Appwrite API endpoint from configuration
            .setProject(conf.appwriteProjectId); // Set the Appwrite project ID from configuration
        this.account = new Account(this.Client); // Create an Account object to handle user-related operations
    }

    // Method to create a new user account
    async createAccount({ email, password, name }) {
        try {
            // Use the Appwrite Account object to create a new user with unique ID, email, password, and name
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            
            if (userAccount) {
                // If the account is created successfully, automatically log the user in
                return this.login({ email, password });
            } else {
                // Return the created account object (likely null in this case)
                return userAccount;
            }
        } catch (error) {
            // Throw any error that occurs during account creation
            throw error;
        }
    }

    // Method to log a user in using their email and password
    async login({ email, password }) {
        try {
            // Use Appwrite to create a session for the user
            return await this.account.createEmailPasswordSession(email, password);
        } catch (error) {
            // Throw any error that occurs during login
            throw error;
        }
    }

    // Method to get the currently logged-in user's details
    async getCurrentUser() {
        try {
            // Fetch and return the user's session details
            return await this.account.get();
        } catch (error) {
            // Log any error that occurs during retrieval of user details
            console.log("Appwrite service :: getCurrentUser :: error", error);
        }
        // Return null if no user is currently logged in
        return null;
    }

    // Method to log the user out of their session
    async logout() {
        try {
            // Use Appwrite to delete all user sessions
            await this.account.deleteSessions();
        } catch (error) {
            // Log any error that occurs during logout
            console.log("Appwrite service :: logout :: error", error);
        }
    }
}

// Create a singleton instance of the AuthService class
const authService = new AuthService();

// Export the AuthService class for use in other parts of the application
export default AuthService;
