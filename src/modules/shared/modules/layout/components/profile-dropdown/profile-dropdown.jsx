import { useState } from "react";
import { observer } from "mobx-react-lite";
import { Link, useNavigate } from "react-router-dom";

// stores
import { AppDataStore } from "../../../../stores/app-data-store";

// services
import { AuthService } from "../../../../../auth/services/auth.service";

// utils
import { getFullRoute } from "../../../../../../utils/get-full-route.helper";

// constants
import { ROUTES } from "../../../../../../constants/routes.constant";

// assets
import noImage from "../../../../assets/no-image.png";

export const ProfileDropdown = observer(function ProfileDropdown() {
  const currentUserId = AppDataStore.currentUser.id;
  const currentUserProfilePicture = AppDataStore.currentUser.profilePictureUrl || noImage;

  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const navigate = useNavigate();


  function logout() {
    AuthService.logout(navigate);
  }

  function toggleDropdown() {
    setShowProfileDropdown(!showProfileDropdown);
  }

  return (
    <div className="dropdown text-end">
      <button onClick={toggleDropdown} className="d-block link-dark text-decoration-none dropdown-toggle" id="dropdownUser1" aria-expanded="false">
        <img src={ currentUserProfilePicture } alt="mdo" width="32" height="32" className="rounded-circle"/>
      </button>
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
  );
});
