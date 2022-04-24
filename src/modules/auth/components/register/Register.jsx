import { Link, useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";

// stores
import { RegisterViewStore } from "../../stores/register-view-store";

// services
import { AuthService } from "../../services/auth.service";

// components
import { FormField } from "../../../forms/components/form-field/form-field";
import { PasswordField } from "../../../shared/components/password-field/password-field";
import { Spinner } from "../../../shared/components/spinner/Spinner";

// constants
import { ROUTES } from "../../../../constants/routes.constant";

// utils
import { getFullRoute } from "../../../../utils/get-full-route.helper";

export const Register = observer(() => {
  const form = RegisterViewStore.form;
  const apiErrorMsg = RegisterViewStore.apiErrorMsg;
  const isLoading = RegisterViewStore.isLoading;

  const navigate = useNavigate();

  async function onSubmit(e) {
    e.preventDefault();

    RegisterViewStore.setIsLoading(true);

    const res = await form.validate();
    if (res.hasError) {
      return;
    }

    try {
      await AuthService.register({
        firstName: form.$.firstName.$,
        lastName: form.$.lastName.$,
        email: form.$.email.$,
        password: form.$.password.$,
      });

      navigate(getFullRoute(ROUTES.LOGIN));

      // TODO: Show success toastr
    } catch (err) {
      if (!!err.response) {
        RegisterViewStore.setApiErrorMsg(err.response.data.message);
      } else {
        RegisterViewStore.setApiErrorMsg('');
        alert('Unknown error occurred');
      }
    } finally {
      RegisterViewStore.setIsLoading(false);
    }
  }

  return (
    <div className='p-4 p-md-5'>
      <div className="d-flex">
        <div className="w-100">
          <h3 className="mb-4 text-center">Sign Up</h3>
        </div>
      </div>

      <form onSubmit={ onSubmit }>
        { /* First Name */ }
        <FormField
          id="firstname"
          type="text"
          formControl={ form.$.firstName }
          labelFor="firstname"
          label="First Name">
        </FormField>

        { /* Last Name */ }
        <FormField
          id="lastname"
          type="text"
          formControl={ form.$.lastName }
          labelFor="lastname"
          label="Last Name">
        </FormField>

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

        {/*Sign Up button */ }
        <div className="form-input-group mt-4">
          <button type="submit" className="form-control btn btn-primary rounded submit px-3">
            Sign Up
          </button>
        </div>
      </form>

      { /* Sign up */ }
      <p className="text-center mt-4">
        Already a member? <Link to={ getFullRoute(ROUTES.LOGIN) }>Sign In</Link>
      </p>

    </div>
  );
});
