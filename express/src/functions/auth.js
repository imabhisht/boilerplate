// Auth Functions
const { firebaseAdmin } = require("../auth")
const { mongoDB } = require("../db")
const uuid = require('uuid');
const { logger } = require("../utils");

class AuthFunctions {
    // db = mongoDB.getDatabase();
    firebaseAuth = firebaseAdmin.app.auth();
    // constructor(){
    //     this.db = mongoDB.getDatabase();
    //     this.firebaseAuth = firebaseAdmin.app.auth();
    // }

    async isUserExists(emailId){
        try {
            const user = await this.firebaseAuth.getUserByEmail(emailId);
            return user;
        } catch (error) {
            console.error(error);
            return false;
        }
    }

    async generateUserSession(emailId){
        try {
            const user = await this.firebaseAuth.getUserByEmail(emailId);
            if(user){
                throw new Error('User already exists');
            }


            // Create mongoDB document with 15 minutes expiration
            const session = {
                _id: uuid.v4(),
                email_id: emailId,
                type: 'user_verify',
                expires_at: new Date(Date.now() + 15 * 60 * 1000),
                code: Math.floor(100000 + Math.random() * 900000),
            };

            await this.db.collection('sessions').insertOne(session);

            logger.log(`Otp for ${emailId} is ${session.code}`);

            return session.insertedId;
        } catch (error) {
            console.error(error);
            throw new Error('Error generating user create session');
        }
    }

    async verifyUserSession(sessionId, code){
        try {
            const session = await this.db.collection('sessions').findOne({
                _id: sessionId,
                type: 'user_create',
                code: code,
            });

            if(!session){
                throw new Error('Invalid or expired session');
            }

            return session.email_id;
        } catch (error) {
            console.error(error);
            throw new Error('Error verifying user create session');
        }
    }

    async createUser(emailId){
        try {
            const user = await this.firebaseAuth.createUser({
                email: emailId,
                emailVerified: false,
                displayName: "Unknown",
                disabled: false,
            });

             if(userRole){
                await this.firebaseAuth.setCustomUserClaims(
                    user.uid,
                    { role: userRole }
                )
             }

            return user; 
        } catch (error) {
            console.error(error);
            throw new Error('Error creating user');
        }
    }

    async generateLoginToken(emailId){
        try {
            const user = await this.firebaseAuth.getUserByEmail(emailId);
            if(!user){
                throw new Error('User does not exist');
            }

            const token = await this.firebaseAuth.createCustomToken(user.uid);

            return token;
        } catch (error) {
            console.error(error);
            throw new Error('Error generating login token');
        }
    }

    async updateUserRole(uid, userRole){
        try {
            await this.firebaseAuth.setCustomUserClaims(
                uid,
                { role: userRole }
            );
        } catch (error) {
            console.error(error);
            throw new Error('Error updating user role');
        }
    }

    async deleteUser(uid){
        try {
            await this.firebaseAuth.deleteUser(uid);
        } catch (error) {
            console.error(error);
            throw new Error('Error deleting user');
        }
    }
    
}

module.exports = AuthFunctions;