import { action, makeObservable, observable } from "mobx";

class _HeaderViewStore {
  showProfileDropdown = false;

  constructor() {
    makeObservable(this, {
      showProfileDropdown: observable,
      setShowProfileDropdown: action,
    });
  }


  setShowProfileDropdown(value) {
    this.showProfileDropdown = value;
  }
}

export const HeaderViewStore = new _HeaderViewStore();
