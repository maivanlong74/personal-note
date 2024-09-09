import { db } from '../config/firebase.js';
import { collection, query, getDocs, where } from "firebase/firestore";

const userRef = collection(db, 'Users');

export const UserService = {
  getUserByEmail: async (email) => {
    try {
      const cmd = query(userRef, where('email', '==', email));
      const user = await getDocs(cmd);
      return user.docs.map(doc => doc.data())[0];
    } catch (error) {
      console.error('Error Queue data:', error);
      throw error;
    }
  },
}
