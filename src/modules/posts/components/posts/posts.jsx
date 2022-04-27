import { Route, Routes } from "react-router-dom";

// routing
import { postsRouting } from "../../routing/posts-routing";

export function Posts() {
  return (
    <Routes>
      {
        postsRouting().map(
          ({ path, element }) => (
            <Route key={ path } path={ path } element={ element }/>
          )
        )
      }
    </Routes>
  );
}
