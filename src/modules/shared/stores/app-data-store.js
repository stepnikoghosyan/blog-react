import { action, makeObservable, observable } from "mobx";

class _AppDataStore {
  currentUser = null;

  constructor() {
    makeObservable(this, {
      currentUser: observable,
      setCurrentUser: action,
      clear: action,
    });
  }

  setCurrentUser(data) {
    this.currentUser = data;
  }

  clear() {
    this.setCurrentUser(null);
  }
}

export const AppDataStore = new _AppDataStore();
