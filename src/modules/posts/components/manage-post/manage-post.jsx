import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { observer, useLocalObservable } from "mobx-react-lite";

// stores
import { ManagePostViewStore } from "../../stores/manage-post-view-store";
import { ManagePostDataStore } from "../../stores/manage-post-data-store";

// components
import { FormField } from "../../../forms/components/form-field/form-field";
import { Spinner } from "../../../shared/components/spinner/Spinner";

// utils
import { getFullRoute } from "../../../../utils/get-full-route.helper";

// constants
import { ROUTES } from "../../../../constants/routes.constant";

export const ManagePost = observer(function ManagePost({ isEditMode }) {
  const viewStore = useLocalObservable(() => new ManagePostViewStore());
  const dataStore = useLocalObservable(() => new ManagePostDataStore(viewStore));
  const { postId } = useParams();
  const navigate = useNavigate();

  const form = viewStore.form;
  const isLoading = viewStore.isLoading;
  const apiErrorMsg = viewStore.apiErrorMsg;

  useEffect(() => {
    if (isEditMode) {
      dataStore.getPostAndUpdateFormValues(postId)
        .then((response) => {
          if (!response) {
            navigate(getFullRoute(ROUTES.POSTS));
          }
        });
    }
  }, [dataStore, postId, isEditMode, navigate]);

  function onFileChange(event) {
    const files = event.target.files;
    if (!!files && files.length > 0) {
      const file = files[0];
      form.$.image.onChange(file);
    }
  }

  function clearFileInput() {
    form.$.image.onChange(null);
  }

  function onSubmit(event) {
    event.preventDefault();

    dataStore
      .managePost(isEditMode)
      .then((response) => {
        if (!!response) {
          navigate(getFullRoute(ROUTES.POSTS))
        }
      });
  }

  return (
    <section className="container">
      <h4 className="text-center mb-4">{ isEditMode ? 'Update Post' : 'Create Post' }</h4>

      <form onSubmit={ onSubmit }>
        { /* Title */ }
        <FormField
          id='title'
          type='text'
          formControl={ form.$.title }
          label='Title'
          labelFor='title'
        />

        { /* Body */ }
        <FormField
          id='body'
          type='text'
          formControl={ form.$.body }
          label='Body'
          labelFor='body'
        />

        { /* Image */ }
        <div className="form-input-group file-upload">
          <label className="upload-btn text-success">
            <input
              onChange={ onFileChange }
              disabled={ isLoading }
              accept="image/*"
              className="form-control"
              type="file"/>
            { form.$.image.$ ? 'Change File' : 'Select File' }
          </label>

          { form.$.image.$ ?
            (
              <div className="uploaded-file-name mt-2">
                <span>{ form.$.image.$.name || 'Image' }</span>

                <button
                  onClick={ clearFileInput }
                  disabled={ isLoading } type="button" className="btn btn-danger btn-sm ms-3 clear-uploaded-file-btn">
                  <i className="fa fa-remove"/>
                </button>
              </div>
            ) : null }

          { /* Image Error Message */ }
          {
            form.$.image.error ?
              (
                <p className="error-msg">
                  { form.$.image.error }
                </p>
              ) : null
          }
        </div>


        { /* Loader */ }
        { isLoading ? <Spinner/> : null }

        { /*Api error response message*/ }
        {
          !!apiErrorMsg ? <p className="error-msg text-center">{ apiErrorMsg }</p> : null
        }

        { /* Sign In button */ }
        <div className="d-flex justify-content-end mt-4">
          <button disabled={ isLoading } type="submit" className="btn btn-primary rounded px-3">
            { isEditMode ? 'Update' : 'Create' }
          </button>
        </div>
      </form>
    </section>
  );
});
