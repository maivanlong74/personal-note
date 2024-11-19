import { db } from '../config/firebase.js';
import { collection, query, getDocs, where } from "firebase/firestore";

const membersRef = collection(db, 'Users');

const UserService = {
  canConnect: async () => {
    try {
      const cmd = query(membersRef);
      const members = await getDocs(cmd);
      console.log('Success get data from firestore', members);
    } catch (error) {
      console.error('Error get data from firestore', error);
      throw error;
    }
    
  },

  getUserByEmail: async (email) => {
    try {
      const cmd = query(membersRef, where('email', '==', email));
      const user = await getDocs(cmd);
      
      return user.docs.map(doc => doc.data())[0];
    } catch (error) {
      console.error('Error Queue data:', error);
      throw error;
    }
  },
}

export {UserService}