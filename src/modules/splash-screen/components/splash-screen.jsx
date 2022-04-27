import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// services
import { UsersService } from "../../users/services/users.service";
import { AuthService } from "../../auth/services/auth.service";

export function SplashScreen({ children }) {
  const [loaded, setLoaded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!AuthService.isAuthenticated()) {
      AuthService.logout(navigate);
      setLoaded(true);
      return;
    }

    async function getCurrentUser() {
      try {
        await UsersService.getCurrentUser();
      } catch (err) {
        AuthService.logout(navigate);
      } finally {
        setLoaded(true);
      }
    }

    getCurrentUser();
  }, [navigate]);

  return (
    <>
      {
        !!loaded? children : <p>Loading...</p>
      }
    </>
  );
}
