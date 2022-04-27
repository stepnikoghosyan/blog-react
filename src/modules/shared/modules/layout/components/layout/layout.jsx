import { useEffect } from "react";
import { Outlet, useNavigate } from 'react-router-dom';

// stores
import { AppDataStore } from "../../../../stores/app-data-store";

// components
import { Header } from "../header/header";

// constants
import { ROUTES } from "../../../../../../constants/routes.constant";

// helpers
import { getFullRoute } from "../../../../../../utils/get-full-route.helper";

export function Layout() {
  const navigate = useNavigate();
  const currentUser = AppDataStore.currentUser;

  console.log('Layout 1');

  useEffect(() => {
    if (!currentUser) {
      navigate(getFullRoute(ROUTES.LOGIN));
    }
  });

  return (
    <div className="container-fluid">
      <Header/>

      <div className="row mt-4">
        <main className="px-md-4">
          <Outlet/>
        </main>
      </div>
    </div>

  );
}
