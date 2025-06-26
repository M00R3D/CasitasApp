import { Storage } from '@ionic/storage';

const storage = new Storage();

let storageInstance = null;

async function initStorage() {
  if (!storageInstance) {
    storageInstance = await storage.create();
  }
  return storageInstance;
}

export default {
  async set(key, value) {
    const store = await initStorage();
    return store.set(key, value);
  },

  async get(key) {
    const store = await initStorage();
    return store.get(key);
  },

  async remove(key) {
    const store = await initStorage();
    return store.remove(key);
  },

  async clear() {
    const store = await initStorage();
    return store.clear();
  }
};
