import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { observer, useLocalObservable } from "mobx-react-lite";

// stores
import { VerifyAccountViewStore } from "../../stores/verify-account-view-store";
import { VerifyAccountDataStore } from "../../stores/verify-account-data-store";

// components
import { Spinner } from "../../../shared/components/spinner/Spinner";
import { FormField } from "../../../forms/components/form-field/form-field";

// constants
import { ROUTES } from "../../../../constants/routes.constant";

// utils
import { getFullRoute } from "../../../../utils/get-full-route.helper";

export const VerifyAccount = observer(function VerifyAccount() {
  const viewStore = useLocalObservable(() => new VerifyAccountViewStore());
  const dataStore = useLocalObservable(() => new VerifyAccountDataStore(viewStore));

  const { activationToken } = useParams();
  const navigate = useNavigate();

  const titleState = viewStore.titleState;
  const isLoading = viewStore.isLoading;
  const showEmailInput = viewStore.showEmailInput;
  const emailCtrl = viewStore.emailCtrl;

  useEffect(() => {
    dataStore
      .verifyAccount(activationToken)
      .then(() => navigate(getFullRoute(ROUTES.LOGIN)));
  }, [dataStore, activationToken, navigate]);

  function onResendActivationToken() {
    viewStore.setShowEmailInput(true);
    viewStore.setTitleState('Enter your email address and we\'ll send you verification email again.');
  }

  async function onSubmit(e) {
    e.preventDefault();

    if (isLoading) {
      return;
    }

    dataStore
      .resendActivationToken()
      .then(() => navigate(getFullRoute(ROUTES.LOGIN)));
  }

  return (
    <div className="p-4 p-md-5">
      <div className="d-flex">
        <div className="w-100">
          <h3 className="mb-4 text-center">Verify Account</h3>
        </div>
      </div>

      <section>
        <p className="text-center">{ titleState }</p>

        { /* Loader */ }
        { isLoading ? <Spinner/> : null }

        <div className="form-input-group mt-4">
          <button onClick={ onResendActivationToken } disabled={ isLoading || showEmailInput }
                  type="button"
                  className="form-control btn btn-dark rounded px-3">
            Re-send activation token
          </button>
        </div>

        {
          showEmailInput ?
            <form onSubmit={ onSubmit }>
              <FormField
                id='email'
                type='text'
                formControl={ emailCtrl }
                label='Email'
                labelFor='email'
              />

              <div className="form-input-group mt-4">
                <button disabled={ isLoading } type="submit"
                        className="form-control btn btn-primary rounded px-3">
                  Send Email
                </button>
              </div>
            </form>
            : null
        }

        <div className="d-flex justify-content-evenly mt-4">
          <Link className="btn btn-info" to={ getFullRoute(ROUTES.LOGIN) } role="button">Sign In</Link>
          <Link className="btn btn-info" to={ getFullRoute(ROUTES.REGISTER) } role="button">Sign Up</Link>
        </div>
      </section>
    </div>
  );
});
