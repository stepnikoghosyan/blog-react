// components
import { PostsList } from "../posts-list/posts-list";
import { PostFilters } from "../post-filters/post-filters";

export function Posts() {
  return (
    <>
      <h1 className="text-center">Posts</h1>

      <PostFilters/>

      <PostsList/>
    </>
  );
}
