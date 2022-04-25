import { Route, Routes, useNavigate } from 'react-router-dom';

// styles
import './Auth.scss';

// routing
import { authRouting } from "../../routing/auth-routing";
import { AppDataStore } from "../../../shared/stores/app-data-store";
import { getFullRoute } from "../../../../utils/get-full-route.helper";
import { ROUTES } from "../../../../constants/routes.constant";
import { useEffect } from "react";

export function Auth() {
  const navigate = useNavigate();
  const currentUser = AppDataStore.currentUser;

  useEffect(() => {
    if (!!currentUser) {
      navigate(getFullRoute(ROUTES.POSTS)); // TODO: change to Home
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
