import { useRoutes } from 'react-router-dom';

// styles
import './App.scss';

// routing
import { appRouting } from "./app-routing";

// components
import { SplashScreen } from "./modules/splash-screen/components/splash-screen";

export function App() {
  return (
    <SplashScreen>
      {useRoutes(appRouting())}
    </SplashScreen>
  );
}
