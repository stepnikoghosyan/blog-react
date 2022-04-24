import { Route, Routes } from 'react-router-dom';

// styles
import './Auth.scss';

// routing
import { authRouting } from "../../routing/auth-routing";

export function Auth() {
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
