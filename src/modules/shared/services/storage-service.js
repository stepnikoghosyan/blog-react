import { STORAGE_KEYS } from "../../../constants/storage-keys.constant";

const STORAGE_TYPES = Object.freeze({
  LOCAL_STORAGE: 'localStorage',
  SESSION_STORAGE: 'sessionStorage',
})

class _StorageService {
  storageType = STORAGE_TYPES.LOCAL_STORAGE;

  setStorageType(type) {
    this.storageType = type;
  }

  getAccessToken() {
    const token = this.STORAGE.getItem(STORAGE_KEYS.accessToken);
    return token || '';
  }

  getRefreshToken() {
    const token = this.STORAGE.getItem(STORAGE_KEYS.refreshToken);
    return token || '';
  }

  setTokens(tokens) {
    this.STORAGE.setItem(STORAGE_KEYS.accessToken, tokens.accessToken);
    this.STORAGE.setItem(STORAGE_KEYS.refreshToken, tokens.refreshToken);
  }

  get STORAGE() {
    return this.storageType === STORAGE_TYPES.SESSION_STORAGE ? sessionStorage : localStorage;
  }

  clear() {
    this.STORAGE.clear();
  }
}

export const StorageService = new _StorageService();
