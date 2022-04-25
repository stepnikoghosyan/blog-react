// styles
import './post-card.scss';
import { Link } from "react-router-dom";
import { getFullRoute } from "../../../../utils/get-full-route.helper";
import { ROUTES } from "../../../../constants/routes.constant";
import { AppDataStore } from "../../../shared/stores/app-data-store";

export function PostCard({
                           post,
                         }) {
  const currentUserId = AppDataStore.currentUser.id;

  return (
    <div className='col'>
      <div className="card h-100">
      { /*Image*/ }
      <span className="lazy-image">
        <span className="position-relative">

          <img
            src={ post.imageUrl }
            alt="Image"
          />

          {/*<div className="skeleton"></div>*/ }
        </span>
      </span>

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
