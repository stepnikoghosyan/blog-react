import { useEffect, useState } from "react";

export function SearchInput({
                              searchCallback,
                              initialValue = '',
                              placeholder = 'Search',
                              autoSubmitDelayInMilliseconds = 1000
                            }) {
  const [value, setValue] = useState(initialValue);
  const [timeoutRef, setTimeoutRef] = useState(undefined);

  // Problem: setValue hasn't updated value yet, but user pressed ENTER
  // QUESTION: is setValue async or sync ?

  useEffect(() => {
    console.log('value updated:', value);
  }, [value]);

  function onKeyUp(event) {
    if (event.key === 'Enter' || event.code === 'Enter') {
      enterPressedOrSearchBtnClicked();
    }
  }

  function enterPressedOrSearchBtnClicked() {
    stopTimeout();

    console.log('emit 1:', value);
    searchCallback(value);
  }

  function onChange(event) {
    console.log('set value:', event.target.value);
    setValue(event.target.value);

    stopTimeout();

    console.log('value before emit2:', value);

    const timeoutId = setTimeout(() => {
      console.log('emit 2:', value); // it's 1 symbol less here
      searchCallback(value);
      stopTimeout();
    }, autoSubmitDelayInMilliseconds);

    setTimeoutRef(timeoutId);
  }

  function stopTimeout() {
    if (timeoutRef) {
      clearTimeout(timeoutRef);
      setTimeoutRef(null);
    }
  }

  return (
    <div className="input-group">
      <input
        value={ value || '' }
        onChange={ onChange }
        placeholder={ placeholder }
        onKeyUp={ onKeyUp }
        className="col-12 form-control border-end-0 border"
        type="text"
      />

      <button
        onClick={ enterPressedOrSearchBtnClicked }
        className="btn btn-outline-secondary search-input-btn border-start-0 border" type="button">
        <i className="fa fa-search"/>
      </button>
    </div>

  );
}
