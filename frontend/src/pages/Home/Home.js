import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllProductsAsync,
  getProducts,
  productActions,
} from "../../redux/slice/productSlice";

function Home() {
  const dispatch = useDispatch();

  /* Getting all todos on component mounting */
  useEffect(() => {
    /* Dispatching action to set the loading state to true */
    dispatch(productActions.fetchStart());
    /* Dispatching getAllTodoAsync function of asyncThunk to make API call and get all todos details*/
    dispatch(getAllProductsAsync());
  }, []);

  return (
    <div>
      <h1>Home Page</h1>
    </div>
  );
}

export default Home;
