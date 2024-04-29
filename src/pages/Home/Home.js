/* Importing Necessary files, module etc */
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllProductsAsync,
  getLoading,
  productActions,
} from "../../redux/slice/productSlice";
import GridLoader from "react-spinners/GridLoader";
import Products from "../../components/Products/Products";
import { getUserAsync } from "../../redux/slice/userSlice";

/* Home Functional Component */
function Home() {
  /* Defining Method To Dispatching Actions */
  const dispatch = useDispatch();
  /* Getting loading state from product part redux store using useSelector hook  */
  const loading = useSelector(getLoading);

  /* Getting all products on component mounting */
  useEffect(() => {
    /* Dispatching action to set the loading state to true */
    dispatch(productActions.fetchStart());
    /* Dispatching getAllProductsAsync function of asyncThunk to make API call and get all products details*/
    dispatch(getAllProductsAsync());
  }, []);

  /* Getting user details on component mounting */
  useEffect(() => {
    /* Dispatching getUserAsync function of asyncThunk to make API call and get all user details*/
    dispatch(getUserAsync());
  }, []);

  /* Returning the JSX */
  return (
    <>
      {loading ? (
        <div className="loader">
          <GridLoader color="green" />
        </div>
      ) : (
        <div className="flex mt-4 text-3xl flex-col justify-center items-center mb-8">
          <div className="font-extrabold mb-4 text-emerald-600 relative w-full flex items-center justify-center">
            List Of All Products{" "}
          </div>
          {/* Rendering the TodoList component */}
          <Products />
        </div>
      )}
    </>
  );
}

/* Exporting Home Component */
export default Home;
