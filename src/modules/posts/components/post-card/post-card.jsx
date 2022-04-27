import { Link } from "react-router-dom";

// styles
import './post-card.scss';

// stores
import { AppDataStore } from "../../../shared/stores/app-data-store";

// components
import { LazyImage } from "../../../shared/modules/lazy-image/components/lazy-image/lazy-image";

// utils
import { getFullRoute } from "../../../../utils/get-full-route.helper";

// constants
import { ROUTES } from "../../../../constants/routes.constant";

export function PostCard({ post }) {
  const currentUserId = AppDataStore.currentUser.id;

  return (
    <div className='col'>
      <div className="card h-100">
        { /*Image*/ }
        <LazyImage imageSource={ post.imageUrl }/>

        { /*Card Body*/ }
        <div className="card-body">
          <h5 className="card-title text-center">{ post.title }</h5>

          <p className="card-text post-body-ellipsis">
            { post.body }
          </p>
        </div>

        { /* Card Footer */ }
        <div className="card-footer d-flex justify-content-between align-items-center">
          <small className="text-muted">
            <i className="fa fa-solid fa-user me-2"/>{ post.user.fullName }
          </small>

          <div className="d-inline-flex">
            <div className="position-relative comments-count">
              <i className="fa fa-comment-o text-primary"/>
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-primary">
              { post.comments.length }
            </span>
            </div>

            {
              currentUserId === post.user.id ?
                <Link to={ `${ getFullRoute(ROUTES.UPDATE_POST) }${ post.id }` }
                      className="btn btn-sm btn-outline-primary ms-3">
                  <i className="fa fa-edit"/>
                </Link>
                : null
            }

            <Link to={ `${ getFullRoute(ROUTES.VIEW_POST) }${ post.id }` }
                  className="btn btn-sm btn-outline-primary ms-3">
              <i className="fa fa-eye"/>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
