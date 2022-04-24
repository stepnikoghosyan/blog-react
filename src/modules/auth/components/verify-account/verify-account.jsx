import { observer } from "mobx-react-lite";
import { VerifyAccountViewStore } from "../../stores/verify-account-view-store";
import { Spinner } from "../../../shared/components/spinner/Spinner";
import { FormField } from "../../../forms/components/form-field/form-field";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ROUTES } from "../../../../constants/routes.constant";
import { getFullRoute } from "../../../../utils/get-full-route.helper";
import { useEffect } from "react";
import { AuthService } from "../../services/auth.service";

export const VerifyAccount = observer(() => {
  const titleState = VerifyAccountViewStore.titleState;
  const isLoading = VerifyAccountViewStore.isLoading;
  const showEmailInput = VerifyAccountViewStore.showEmailInput;
  const emailCtrl = VerifyAccountViewStore.emailCtrl;

  const { activationToken } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function verifyAccount() {
      try {
        await AuthService.verifyAccount(activationToken);
        // TODO: show success toastr
        navigate(getFullRoute(ROUTES.LOGIN));
      } catch (err) {
        let message;
        if (!!err.response) {
          message = err.response.data.message || 'Unknown Error Occurred';
        } else {
          message = 'Unknown Error Occurred';
        }

        // TODO: show error toastr
        alert(message);

        VerifyAccountViewStore.setTitleState('Could not verify account.');
        VerifyAccountViewStore.setIsLoading(false);
      }
    }

    verifyAccount();
  }, [activationToken, navigate]);

  function onResendActivationToken() {
    VerifyAccountViewStore.setShowEmailInput(true);
    VerifyAccountViewStore.setTitleState('Enter your email address and we\'ll send you verification email again.');
  }

  async function onSubmit(e) {
    e.preventDefault();

    if (isLoading) {
      return;
    }

    const result = await emailCtrl.validate();
    if (result.hasError) {
      return;
    }

    VerifyAccountViewStore.setIsLoading(true);
    VerifyAccountViewStore.setTitleState('Verifying Your account, please wait...');

    try {
      await AuthService.resendActivationToken(emailCtrl.$);

      // TODO: show success toastr
      navigate(getFullRoute(ROUTES.LOGIN));
    } catch (err) {
      let message;
      if (!!err.response) {
        message = err.response.data.message || 'Unknown Error Occurred';
      } else {
        message = 'Unknown Error Occurred';
      }

      // TODO: show error toastr
      alert(message);
      VerifyAccountViewStore.setIsLoading(false);
      VerifyAccountViewStore.setTitleState('Failed to re-send activated token.');
    }
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
