import { openDB } from 'idb';

const DB_NAME = 'UserDB';
const STORE_NAME = 'users';

// Initialize the IndexedDB
const initDB = async () => {
  return openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'email' });
      }
    },
  });
};

// Store user credentials in IndexedDB
export const storeUser = async (email:string, password:string) => {
  const db = await initDB();
  await db.put(STORE_NAME, { email, password });
};

// Retrieve user by email from IndexedDB
export const getUserByEmail = async (email:string) => {
  const db = await initDB();
  return db.get(STORE_NAME, email);
};
