import { observer } from "mobx-react-lite";

export const FormField = observer(({
                                     formControl,
                                     id,
                                     type,
                                     labelFor = null,
                                     label = null,
                                   }) => {
  return (
    <div className="form-input-group">
      { /*Label*/ }
      {!!label ? <label htmlFor={labelFor} className="form-control-placeholder">{ label }</label> : null }

      { /*Form Control */ }
      <input
        id={id}
        type={type}
        onChange={(e) => formControl.onChange(e.target.value)}
        value={formControl.value}
        className="form-control"/>

      { /*Errors */ }
      {
        formControl.error ?
        <p className="error-msg">
          { formControl.error }
        </p> : null
      }
    </div>
  );
});
