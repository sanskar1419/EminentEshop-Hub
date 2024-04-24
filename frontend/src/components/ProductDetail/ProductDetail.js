import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProducts } from "../../redux/slice/productSlice";
import ImageMagnifier from "../ImageMagnifier/ImageMagnifier";
import { backgroundRemoval } from "@cloudinary/url-gen/actions/effect";

function ProductDetail() {
  const { id } = useParams();
  const products = useSelector(getProducts);
  const product = products.find((p) => p.id == id);
  const [currentImage, setCurrentImage] = useState(product.image[0]);

  const handleHover = () => {};

  return (
    <div className="flex items-start flex-row bottom-5 w-full justify-center h-screen pt-10 bg-sky-100">
      <div className="mr-3 w-2/5 flex justify-around items-center">
        <div className="w-10 mr-4 flex justify-center flex-col">
          {product.image.map((i, index) => (
            <img
              src={i}
              className="mb-2 rounded-lg h-18 ring ring-pink-500 ring-offset-2 ring-offset-slate-50 dark:ring-offset-slate-900 cursor-pointer hover:ring-blue-500"
              onMouseOver={() => setCurrentImage(i)}
            />
          ))}
        </div>
        <div className="w-5/6 cursor-pointer mix-blend-multiply">
          <ImageMagnifier src={currentImage} />
        </div>
      </div>
      <div className="border-4 w-3/6"></div>
    </div>
  );
}

export default ProductDetail;
