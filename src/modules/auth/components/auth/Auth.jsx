import { useEffect } from "react";
import { Route, Routes, useNavigate } from 'react-router-dom';

// styles
import './Auth.scss';

// stores
import { AppDataStore } from "../../../shared/stores/app-data-store";

// routing
import { authRouting } from "../../routing/auth-routing";

// constants
import { ROUTES } from "../../../../constants/routes.constant";

// utils
import { getFullRoute } from "../../../../utils/get-full-route.helper";

export function Auth() {
  const navigate = useNavigate();
  const currentUser = AppDataStore.currentUser;

  useEffect(() => {
    if (!!currentUser) {
      navigate(getFullRoute(ROUTES.HOME));
    }
  });

  return (
    <div className="full-window">
      <div className="form-container">
        <div className="wrap">

          <Routes>
            {
              authRouting().map(
                ({ path, element }) => (
                  <Route key={ path } path={ path } element={ element }/>
                )
              )
            }
          </Routes>

        </div>
      </div>
    </div>
  );
}
