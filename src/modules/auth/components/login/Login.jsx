import { Link, useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";

// stores
import { LoginViewStore } from "../../stores/login-view-store";

// components
import { FormField } from "../../../forms/components/form-field/form-field";
import { PasswordField } from "../../../shared/components/password-field/password-field";
import { Spinner } from "../../../shared/components/spinner/Spinner";

// services
import { AuthService } from "../../services/auth.service";
import { UsersService } from "../../../users/services/users.service";

// utils
import { getFullRoute } from "../../../../utils/get-full-route.helper";

// constants
import { ROUTES } from "../../../../constants/routes.constant";
import { StorageService } from "../../../shared/services/storage-service";

export const Login = observer(() => {
  const form = LoginViewStore.form;
  const apiErrorMsg = LoginViewStore.apiErrorMsg;
  const isLoading = LoginViewStore.isLoading;

  const navigate = useNavigate();

  async function onSubmit(event) {
    event.preventDefault();

    LoginViewStore.setIsLoading(true);

    const res = await form.validate();
    if (res.hasError) {
      return;
    }

    try {
      const response = await AuthService.login({
        email: form.$.email.$,
        password: form.$.password.$,
      });

      StorageService.setTokens(response.data);

      await UsersService.getCurrentUser();

      navigate('/home');
    } catch (err) {
      if (!!err.response) {
        LoginViewStore.setApiErrorMsg(err.response.data.message);
      } else {
        LoginViewStore.setApiErrorMsg('');
        alert('Unknown error occurred');
      }
    } finally {
      LoginViewStore.setIsLoading(false);
    }
  }

  return (
    <div className="p-4 p-md-5">
      <div className="d-flex">
        <div className="w-100">
          <h3 className="mb-4 text-center">Sign In</h3>
        </div>
      </div>

      <form onSubmit={ onSubmit }>
        { /*Email*/ }
        <FormField
          id='email'
          type='text'
          formControl={ form.$.email }
          label='Email'
          labelFor='email'
        />

        { /*Password*/ }
        <PasswordField
          formControl={ form.$.password }
          id='password'
        />

        {/* Loader */ }
        { isLoading ? <Spinner/> : null }

        { /*Api error response message*/ }
        {
          !!apiErrorMsg ? <p className="error-msg text-center">{ apiErrorMsg }</p> : null
        }

        { /*Sign In button */ }
        <div className="form-input-group mt-4">
          <button type="submit" className="form-control btn btn-primary rounded px-3">
            Sign In
          </button>
        </div>

        <div className="form-input-group d-flex justify-content-center">
          { /* Remember me */ }
          <div className="form-check">
            <input className="form-check-input" type="checkbox" id="rememberMe"/>
            <label className="form-check-label" htmlFor="rememberMe">
              Remember me
            </label>
          </div>

          { /*Forgot password*/ }
          <div className="ms-5">
            <Link to="/auth/forgot-password">Forgot Password</Link>
          </div>
        </div>
      </form>

      { /*Sign up */ }
      <p className="text-center mt-4">
        Not a member? <Link to={ getFullRoute(ROUTES.REGISTER) }>Register</Link>
      </p>
    </div>
  );
});
