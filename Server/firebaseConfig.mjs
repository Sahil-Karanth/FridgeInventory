import { getFirestore } from 'firebase-admin/firestore';
import { initializeApp, cert } from 'firebase-admin/app';
import fs from 'fs';

// Read and parse the JSON file
const serviceAccount = JSON.parse(fs.readFileSync('./serviceAccount.json', 'utf8'));

initializeApp({
  credential: cert(serviceAccount),
});

const db = getFirestore();

export default db;