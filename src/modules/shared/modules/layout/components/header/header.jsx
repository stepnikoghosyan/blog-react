import { NavLink } from "react-router-dom";
import { observer } from "mobx-react-lite";

// styles
import './header.scss';

// configs
import { getNavigationItemsConfig } from "../../configs/navigation-items.config";

// assets
import { ProfileDropdown } from "../profile-dropdown/profile-dropdown";

export const Header = observer(function Header() {
  const navigationItems = getNavigationItemsConfig();

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
                <li key={ item.route }>
                  <NavLink to={ item.route }
                           className={ ({ isActive }) => 'nav-link px-2 link-dark' + (isActive ? ' custom-active' : '') }>
                    { item.label }
                  </NavLink>
                </li>
              ))
            }
          </ul>

          { /*Profile dropdown */ }
          <ProfileDropdown/>
        </div>
      </div>
    </header>
  );
});
