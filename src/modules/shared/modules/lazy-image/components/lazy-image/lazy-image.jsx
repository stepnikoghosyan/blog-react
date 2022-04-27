// styles
import './lazy-image.scss';

// stores
import { LazyImageViewStore } from "../../stores/lazy-image-view-store";

// assets
import noImage from '../../../../assets/no-image.png';
import { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";

export const LazyImage = observer(({ imageSource }) => {
  const [lazyImageViewStore] = useState(new LazyImageViewStore());
  const isLoading = lazyImageViewStore.isLoading;
  const imageSrc = lazyImageViewStore.imageSrc;

  useEffect(() => {
    if (!!imageSource) {
      lazyImageViewStore.setImageSrc(imageSource);
    }
  }, [lazyImageViewStore, imageSource]);

  function imageLoadingSuccess() {
    lazyImageViewStore.setIsLoading(false);
  }

  function imageLoadingError() {
    console.log('error');
    lazyImageViewStore.setIsLoading(false);
    lazyImageViewStore.setImageSrc(noImage);
  }

  return (
    <span className="lazy-image">
      <span className="position-relative">

        <img
          src={ imageSrc }
          onLoad={ () => imageLoadingSuccess() }
          onError={ () => imageLoadingError() }
          alt="Post"
        />

        { isLoading ? <div className="skeleton"/> : null }
      </span>
    </span>
  );
});
