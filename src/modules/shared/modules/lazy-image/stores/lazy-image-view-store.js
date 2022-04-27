// assets
import noImage from '../../../assets/no-image.png';
import { action, makeObservable, observable } from "mobx";

export class LazyImageViewStore {
  isLoading = true;
  imageSrc = noImage;

  constructor() {
    makeObservable(this, {
      isLoading: observable,
      imageSrc: observable,
      setIsLoading: action,
      setImageSrc: action,
    });
  }

  setIsLoading(value) {
    this.isLoading = value;
  }

  setImageSrc(value) {
    this.imageSrc = value;
  }
}

// export const LazyImageViewStore = new _LazyImageViewStore();
