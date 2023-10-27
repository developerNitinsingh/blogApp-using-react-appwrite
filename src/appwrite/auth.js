import conf from "../conf/conf";
import { Client, Account, ID } from "appwrite";

export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);

        this.account = new Account(this.client);
    }

    //   +++++++++  Account creation   +++++++++ 


    async createAccount({ email, password, name }) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if (userAccount) {
                return this.login({ email, password })
            } else {
                return userAccount;
            }
        } catch (error) {
            throw error;
        }
    }
    //   +++++++++  Account login   +++++++++ 

    async login({ email, password }) {
        try {
            return await this.account.createEmailSession(email, password);
        } catch (error) {
            throw error;
        }
    }


    //   +++++++++  Account getCurrentUser   +++++++++ 

    async getCurrentUser() {
        try {
            return await this.account.get()
        } catch (error) {
            console.log("Appwite service :: getCurrentUser :: error", error)
        }

        return null;
    }

    //   +++++++++  Account logOut   +++++++++ 

    async logout() {
        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.log("Appwite service :: logout :: error", error);
        }
    }

}


const authService = new AuthService();


export default authService