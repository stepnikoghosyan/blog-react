import { Navigate } from "react-router-dom";

// constants
import { ROUTES } from "../../../constants/routes.constant";

// components
import { ManagePost } from "../components/manage-post/manage-post";
import { PostFilters } from "../components/post-filters/post-filters";
import { PostsList } from "../components/posts-list/posts-list";

// utils
import { getFullRoute } from "../../../utils/get-full-route.helper";

export function postsRouting() {
  return [
    {
      index: true,
      path: '',
      element:
        <>
          <h1 className="text-center">Posts</h1>

          <PostFilters/>

          <PostsList/>
        </>
    },
    { path: ROUTES.CREATE_POST, element: <ManagePost/> },
    { path: `${ ROUTES.UPDATE_POST }/:postId`, element: <ManagePost isEditMode /> },
    { path: '*', element: <Navigate to={ getFullRoute(ROUTES.POSTS) }/> },
  ];
}
