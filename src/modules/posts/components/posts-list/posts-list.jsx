import { observer } from "mobx-react-lite";
import { PostsListViewStore } from "../../stores/posts-list-view-store";
import { Spinner } from "../../../shared/components/spinner/Spinner";
import { PostCard } from "../post-card/post-card";
import { useEffect } from "react";
import { PostsService } from "../../services/posts.service";

export const PostsList = observer(() => {
  const isLoading = PostsListViewStore.isLoading;
  const posts = PostsListViewStore.posts;

  useEffect(() => {
    async function getPosts() {
      const response = await PostsService.getPosts();
      PostsListViewStore.setPosts(response.data.results);
      PostsListViewStore.setIsLoading(false);
    }

    getPosts();
  }, []);

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
