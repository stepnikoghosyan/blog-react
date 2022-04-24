import { useEffect, useState } from "react";

// services
import { UsersService } from "../../users/services/users.service";
import { AuthService } from "../../auth/services/auth.service";

export function SplashScreen({ children }) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!AuthService.isAuthenticated()) {
      setLoaded(true);
      return;
    }

    async function getCurrentUser() {
      try {
        await UsersService.getCurrentUser();
      } finally {
        setLoaded(true);
      }
    }

    getCurrentUser();
  }, []);

  return (
    <>
      {
        !!loaded? children : <p>Loading...</p>
      }
    </>
  );
}
