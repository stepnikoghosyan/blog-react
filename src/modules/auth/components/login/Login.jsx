import { Link, useNavigate } from "react-router-dom";
import { observer, useLocalObservable } from "mobx-react-lite";

// stores
import { LoginViewStore } from "../../stores/login-view-store";
import { LoginDataStore } from "../../stores/login-data-store";

// components
import { FormField } from "../../../forms/components/form-field/form-field";
import { PasswordField } from "../../../shared/components/password-field/password-field";
import { Spinner } from "../../../shared/components/spinner/Spinner";

// utils
import { getFullRoute } from "../../../../utils/get-full-route.helper";

// constants
import { ROUTES } from "../../../../constants/routes.constant";

export const Login = observer(function Login() {
  const viewStore = useLocalObservable(() => new LoginViewStore());
  const dataStore = useLocalObservable(() => new LoginDataStore(viewStore));

  const form = viewStore.form;
  const apiErrorMsg = viewStore.apiErrorMsg;
  const isLoading = viewStore.isLoading;

  const navigate = useNavigate();

  function onSubmit(event) {
    event.preventDefault();

    if (isLoading) {
      return;
    }

    dataStore
      .login()
      .then(() => navigate(getFullRoute(ROUTES.HOME)));
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
