// Importing necessary module, component etc.
import { Outlet, Link } from "react-router-dom";
import addImage from "../../images/add .png";
import addToCart from "../../images/add-to-cart.png";
import { useDispatch, useSelector } from "react-redux";
import {
  getError,
  getMessage,
  productActions,
} from "../../redux/slice/productSlice";
import { useEffect } from "react";
import {
  getCart,
  getUserError,
  getUserMessage,
  userActions,
} from "../../redux/slice/userSlice";

/* Defining functional Navbar component */
function Navbar() {
  /* Defining Method To Dispatching Actions */
  const dispatch = useDispatch();
  /* Getting message state from product part redux store using useSelector hook  */
  const message = useSelector(getMessage);
  /* Getting error state from product part redux store using useSelector hook  */
  const error = useSelector(getError);
  /* Getting userMessage state from user part redux store using useSelector hook  */
  const userMessage = useSelector(getUserMessage);
  /* Getting userError state from user part redux store using useSelector hook  */
  const userError = useSelector(getUserError);
  /* Getting cart state from user part redux store using useSelector hook  */
  const cart = useSelector(getCart);

  /* Using useEffect hook to reset the message and error to null whenever they changes */
  useEffect(() => {
    /* If message exist */
    if (message) {
      setTimeout(() => {
        /* Dispatching a action to reset message */
        dispatch(productActions.resetMessage());
      }, 3000);
    }
    /* If error exist */
    if (error) {
      setTimeout(() => {
        /* Dispatching a action to reset error */
        dispatch(productActions.resetError());
      }, 3000);
    }
    /* If message exist */
    if (userMessage) {
      setTimeout(() => {
        /* Dispatching a action to reset message */
        dispatch(userActions.resetMessage());
      }, 3000);
    }
    /* If error exist */
    if (userError) {
      setTimeout(() => {
        /* Dispatching a action to reset error */
        dispatch(userActions.resetError());
      }, 3000);
    }
  }, [message, error, userError, userMessage]);

  /* Returning the JSX */
  return (
    <>
      {/* If Message Exist Showing the message notification */}
      {message && (
        <div role="alert" className="alert alert-success alertMessage">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current shrink-0 h-6 w-4"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>{message}</span>
        </div>
      )}
      {/* If error is there showing the alert */}
      {error && (
        <div role="alert" className="alert alert-error errorAlert">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current shrink-0 h-6 w-4"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>{error}</span>
        </div>
      )}

      {/* If userMessage Exist Showing the message notification */}
      {userMessage && (
        <div role="alert" className="alert alert-success alertMessage">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current shrink-0 h-6 w-4"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>{userMessage}</span>
        </div>
      )}
      {/* If error is there showing the alert */}
      {userError && (
        <div role="alert" className="alert alert-error errorAlert">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current shrink-0 h-6 w-4"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>{userError}</span>
        </div>
      )}
      {/* Main Navbar Component */}
      <div className="navbar bg-primary text-primary-content">
        <div className="navbar-start">
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h7"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-primary rounded-box w-52"
            >
              <li className="font-bold">
                {/* Redirecting to home page */}
                <Link to="/">Homepage</Link>
              </li>
              <li className="font-bold">
                {/* Redirecting to add page */}
                <Link to="/add">Add Todo</Link>
              </li>
              <li className="font-bold">
                {/* Redirecting to cart page */}
                <Link to="/cart">Cart Page</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="navbar-center">
          {/* Redirecting to home page */}
          <Link to="/" className="btn btn-ghost text-2xl font-extrabold">
            E Commerce
          </Link>
        </div>
        <div className="navbar-end">
          <h1 className="font-bold">Add New Product</h1>
          <button className="btn btn-ghost btn-circle">
            <div className="indicator">
              <Link to="/add">
                {" "}
                <img src={addImage} alt="Add" width="40px" />
              </Link>
            </div>
          </button>
          <button className="btn btn-ghost btn-circle">
            <div className="indicator">
              <Link to="/cart">
                {" "}
                <img src={addToCart} alt="Add" width="40px" />
                <span className="badge badge-xs badge-black indicator-item">
                  {cart.length}
                </span>
              </Link>
            </div>
          </button>
        </div>
      </div>
      {/* Using Outlet component to load the children */}
      <Outlet />
    </>
  );
}

/* Exporting Navbar Component */
export default Navbar;
