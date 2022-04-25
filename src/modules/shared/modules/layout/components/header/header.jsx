import { Link, useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";

// styles
import './header.scss';

// stores
import { AppDataStore } from "../../../../stores/app-data-store";
import { HeaderViewStore } from "../../stores/header-view-store";

// services
import { AuthService } from "../../../../../auth/services/auth.service";

// configs
import { getNavigationItemsConfig } from "../../configs/navigation-items.config";

// utils
import { getFullRoute } from "../../../../../../utils/get-full-route.helper";

// constants
import { ROUTES } from "../../../../../../constants/routes.constant";

// assets
import noImage from '../../../../../shared/assets/no-image.png';

export const Header = observer(() => {
  const currentUserId = AppDataStore.currentUser.id;
  const currentUserProfilePicture = AppDataStore.currentUser.profilePictureUrl || noImage;
  const navigationItems = getNavigationItemsConfig();

  const navigate = useNavigate();

  const showProfileDropdown = HeaderViewStore.showProfileDropdown;

  function logout() {
    AuthService.logout(navigate);
  }

  function toggleDropdown() {
    HeaderViewStore.setShowProfileDropdown(!showProfileDropdown);
  }

  return (
    <header className="p-3 mb-3 border-bottom">
      <div className="d-flex flex-wrap align-items-center justify-content-center">
        <div className="me-lg-auto">
          <h1>Angular Course</h1>
        </div>

        <div className="d-flex align-items-center justify-content-center">
          { /*Navigation Items */ }
          <ul className="nav col-12 col-lg-auto mb-2 justify-content-center mb-md-0 me-2">
            {
              navigationItems.map((item) => (
                <li key={item.route}>
                  <Link to={ item.route } className="nav-link px-2 link-dark">
                    { item.label }
                  </Link>
                </li>
              ))
            }
          </ul>

          { /*Profile dropdown */ }
          <div className="dropdown text-end">
            <a onClick={toggleDropdown} className="d-block link-dark text-decoration-none dropdown-toggle" id="dropdownUser1" aria-expanded="false">
              <img src={ currentUserProfilePicture } alt="mdo" width="32" height="32" className="rounded-circle"/>
            </a>
            <ul className="dropdown-menu text-small" style={{display: showProfileDropdown ? 'block' : 'none'}} aria-labelledby="dropdownUser1">
              <li>
                <Link className="dropdown-item"
                      to={ getFullRoute(ROUTES.POSTS) }
                      params={ { userID: currentUserId } }>
                  My Posts
                </Link>
              </li>
              <li>
                <Link className="dropdown-item" to={ getFullRoute(ROUTES.PROFILE) }>Profile</Link>
              </li>

              <li>
                <hr className="dropdown-divider"/>
              </li>

              <li>
                <button onClick={ logout } className="dropdown-item">Sign out</button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
});
