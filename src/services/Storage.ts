import storage from "@react-native-async-storage/async-storage";

class StorageService {
  async saveItem(key: string, value: string) {
    try {
      await storage.setItem(key, value);
    } catch (error) {
      new Error(error);
    }
  }

  async getItem(key: string) {
    try {
      const item = await storage.getItem(key);

      return item;
    } catch (error) {
      new Error(error);
    }
  }
}

export { StorageService };
