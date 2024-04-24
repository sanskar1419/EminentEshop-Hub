import { useSelector } from "react-redux";
import Product from "../Product/Product";
import { getProducts } from "../../redux/slice/productSlice";

function Products() {
  const products = useSelector(getProducts);
  return (
    <div className="flex flex-wrap items-center justify-center w-5/6">
      {products.map((product) => (
        <Product key={product.id} product={product} />
      ))}
    </div>
  );
}

export default Products;
