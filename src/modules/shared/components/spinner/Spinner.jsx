// styles
import './spinner.scss';

export function Spinner({ centerInRelativeParent }) {
  return (
    <div
      className={ 'd-flex justify-content-center align-items-center m-1' + (centerInRelativeParent ? ' center-spinner' : '') }>
      <div className="spinner"/>
    </div>
  );
}
