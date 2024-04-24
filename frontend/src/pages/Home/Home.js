import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllProductsAsync,
  getLoading,
  getProducts,
  productActions,
} from "../../redux/slice/productSlice";
import GridLoader from "react-spinners/GridLoader";
import Products from "../../components/Products/Products";

function Home() {
  const dispatch = useDispatch();
  const loading = useSelector(getLoading);

  /* Getting all todos on component mounting */
  useEffect(() => {
    /* Dispatching action to set the loading state to true */
    dispatch(productActions.fetchStart());
    /* Dispatching getAllTodoAsync function of asyncThunk to make API call and get all todos details*/
    dispatch(getAllProductsAsync());
  }, []);

  return (
    <>
      {loading ? (
        <div className="loader">
          <GridLoader color="green" />
        </div>
      ) : (
        <div className="flex mt-4 text-3xl flex-col justify-center items-center mb-8">
          {/* <h1 className="font-extrabold mb-4">List Of All Products</h1> */}
          {/* Rendering the TodoList component */}
          <Products />
        </div>
      )}
    </>
  );
}

export default Home;
