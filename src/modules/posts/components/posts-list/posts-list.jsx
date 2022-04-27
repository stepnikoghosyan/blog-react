import { useEffect } from "react";
import { observer, useLocalObservable } from "mobx-react-lite";

// stores
import { PostsDataStore } from "../../stores/posts-data-store";

// components
import { Spinner } from "../../../shared/components/spinner/Spinner";
import { PostCard } from "../post-card/post-card";

export const PostsList = observer(function PostsList() {
  const store = useLocalObservable(() => new PostsDataStore());
  const isLoading = store.isLoading;
  const posts = store.posts;

  useEffect(() => {
    store.getPosts();
  }, [store]);

  return (
    <>
      { /* Loader */ }
      { isLoading ? <Spinner/> : null }

      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 mt-4 mb-5">
        { posts.map((post) => <PostCard key={ post.id } post={ post }/>) }
      </div>
    </>
  );
});
