import { useState } from "react";
import { observer } from "mobx-react-lite";

export const PasswordField = observer(({
                                         formControl,
                                         id,
                                         label = 'Password',
                                         labelFor = 'password',
                                       }) => {
  const [showPasswordAsText, setShowPasswordAsText] = useState(false);

  function updateValue(event) {
    // console.log('event:', event);
    formControl.onChange(event.target.value);
  }

  function toggleViewMode() {
    setShowPasswordAsText(!showPasswordAsText);
  }

  return (
    <div className="form-input-group">

      { /*Label*/ }
      { !!label ? <label htmlFor={ labelFor } className="form-control-placeholder">{ label }</label> : null }

      { /*Form Control */ }
      <div className="position-relative">
        <input id={ id }
               type={ showPasswordAsText ? 'text' : 'password' }
               className="form-control"
               value={ formControl.value }
               onChange={ updateValue }
               onBlur={ updateValue }
        />

        <span onClick={ toggleViewMode }
              className={ 'fa fa-fw field-icon field-icon-hoverable' + (showPasswordAsText ? ' fa-eye' : ' fa-eye-slash') }>
        </span>
      </div>
    </div>

  );
});
