import { db } from '../config/firebase.js';
import { collection, query, getDocs } from "firebase/firestore";

const membersRef = collection(db, 'members');

const DatabaseService = {
  canConnect: async () => {
    try {
      const cmd = query(membersRef);
      const members = await getDocs(cmd);
      console.log('Success get data from firestore', members);
    } catch (error) {
      console.error('Error get data from firestore', error);
      throw error;
    }
    
  }
}

export {DatabaseService}