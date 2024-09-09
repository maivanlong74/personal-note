import { db } from '../config/firebase.js';
import { collection, query, doc, getDocs, setDoc } from "firebase/firestore";
// import memberSeedData from './data/members.json' assert { type: "json" };;
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const short = require('short-uuid');
const Guid = short();

const memberSeedData = require('./data/members.json');

async function seedMembers() {
  try {
    const membersRef = collection(db, 'members');
    const cmd = query(membersRef);
    const membersSnap = await getDocs(cmd);
    if (membersSnap.empty) {
      console.log('Firestore seeding members starting!');
      for (const item of memberSeedData) {
        item.id = Guid.new();
        await setDoc(doc(membersRef, item.id), item);
      }
      console.log('Firestore seeding members completed successfully!');
    } else {
      console.log('Firestore seeding members skipped!');
    }
  } catch (error) {
    console.error('Error seeding members:', error);
  }
}

// ฟังก์ชันสำหรับ seed ข้อมูลเข้า Firestore
async function seed() {
  await seedMembers();
}

seed();
