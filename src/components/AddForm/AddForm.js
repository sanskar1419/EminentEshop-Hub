import { useState } from "react";
import hintImg from "../../images/lightbulb.png";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewProductAsync,
  getLoading,
  getProducts,
  productActions,
} from "../../redux/slice/productSlice";
import { useNavigate } from "react-router-dom";
import PropagateLoader from "react-spinners/PropagateLoader";

function AddForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loading = useSelector(getLoading);

  const [inputs, setInputs] = useState({
    title: "",
    rating: 0,
    mrp: 0,
    price: 0,
    Brand: "",
    Review: 0,
    image: [],
    type: "",
    details: {},
    description: [],
    additional: null,
  });

  const [images, setImages] = useState({
    image1: "",
    image2: "",
    image3: "",
    image4: "",
    image5: "",
    image6: "",
    image7: "",
  });

  const [description, setDescription] = useState({
    para1: "",
    para2: "",
    para3: "",
    para4: "",
    para5: "",
    para6: "",
    para7: "",
    para8: "",
    para9: "",
    para10: "",
  });

  const [detailKey, setDetailKey] = useState({
    detailKey1: "",
    detailKey2: "",
    detailKey3: "",
    detailKey4: "",
    detailKey5: "",
    detailKey6: "",
    detailKey7: "",
    detailKey8: "",
    detailKey9: "",
    detailKey10: "",
  });

  const [detailValue, setDetailValue] = useState({
    detailValue1: "",
    detailValue2: "",
    detailValue3: "",
    detailValue4: "",
    detailValue5: "",
    detailValue6: "",
    detailValue7: "",
    detailValue8: "",
    detailValue9: "",
    detailValue10: "",
  });

  const [additionalKey, setAdditionalKey] = useState({
    additionalKey1: "",
    additionalKey2: "",
    additionalKey3: "",
    additionalKey4: "",
    additionalKey5: "",
    additionalKey6: "",
    additionalKey7: "",
    additionalKey8: "",
    additionalKey9: "",
    additionalKey10: "",
  });

  const [additionalValue, setAdditionalValue] = useState({
    additionalValue1: "",
    additionalValue2: "",
    additionalValue3: "",
    additionalValue4: "",
    additionalValue5: "",
    additionalValue6: "",
    additionalValue7: "",
    additionalValue8: "",
    additionalValue9: "",
    additionalValue10: "",
  });

  const dataCorrection = () => {
    return;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    /* Validation */
    if (inputs.mrp <= 0) {
      dispatch(productActions.setError("MRP should be grater then 0."));
      return;
    }

    if (inputs.price <= 0 || inputs.price >= inputs.mrp) {
      dispatch(
        productActions.setError(
          "Price should be grater then 0 and it should be less then MRP"
        )
      );
      return;
    }

    const imageList = [];
    const productDescriptionList = [];
    Object.keys(images).forEach((key) => {
      if (images[key] !== "") {
        imageList.push(images[key]);
      }
    });
    Object.keys(description).forEach((key) => {
      if (description[key] !== "") {
        productDescriptionList.push(description[key]);
      }
    });

    let productDetail = {
      [detailKey.detailKey1]: detailValue.detailValue1,
      [detailKey.detailKey2]: detailValue.detailValue2,
      [detailKey.detailKey3]: detailValue.detailValue3,
      [detailKey.detailKey4]: detailValue.detailValue4,
      [detailKey.detailKey5]: detailValue.detailValue5,
      [detailKey.detailKey6]: detailValue.detailValue6,
      [detailKey.detailKey7]: detailValue.detailValue7,
      [detailKey.detailKey8]: detailValue.detailValue8,
      [detailKey.detailKey9]: detailValue.detailValue9,
      [detailKey.detailKey10]: detailValue.detailValue10,
    };

    productDetail = Object.keys(productDetail)
      .filter((objKey) => objKey !== "")
      .reduce((newObj, key) => {
        newObj[key] = productDetail[key];
        return newObj;
      }, {});

    let additionalDetails = {
      [additionalKey.additionalKey1]: additionalValue.additionalValue1,
      [additionalKey.additionalKey2]: additionalValue.additionalValue2,
      [additionalKey.additionalKey3]: additionalValue.additionalValue3,
      [additionalKey.additionalKey4]: additionalValue.additionalValue4,
      [additionalKey.additionalKey5]: additionalValue.additionalValue5,
      [additionalKey.additionalKey6]: additionalValue.additionalValue6,
      [additionalKey.additionalKey7]: additionalValue.additionalValue7,
      [additionalKey.additionalKey8]: additionalValue.additionalValue8,
      [additionalKey.additionalKey9]: additionalValue.additionalValue9,
      [additionalKey.additionalKey10]: additionalValue.additionalValue10,
    };

    additionalDetails = Object.keys(additionalDetails)
      .filter((objKey) => objKey !== "")
      .reduce((newObj, key) => {
        newObj[key] = additionalDetails[key];
        return newObj;
      }, {});

    setInputs({
      ...inputs,
      image: [...imageList],
      description: [...productDescriptionList],
      rating: Math.floor(Math.random() * (5 - 0 + 1)) + 0,
      Review: Math.floor(Math.random() * (150 - 20 + 1)) + 20,
      details:
        Object.keys(productDetail).length === 0 ? null : { ...productDetail },
      additional:
        Object.keys(additionalDetails).length === 0
          ? null
          : { ...additionalDetails },
    });

    dispatch(productActions.fetchStart());
    dispatch(
      addNewProductAsync({
        title: inputs.title,
        mrp: inputs.mrp,
        price: inputs.price,
        Brand: inputs.Brand,
        type: inputs.type,
        image: [...imageList],
        description: [...productDescriptionList],
        rating: Math.floor(Math.random() * (5 - 0 + 1)) + 0,
        Review: Math.floor(Math.random() * (150 - 20 + 1)) + 20,
        details:
          Object.keys(productDetail).length === 0 ? null : { ...productDetail },
        additional:
          Object.keys(additionalDetails).length === 0
            ? null
            : { ...additionalDetails },
      })
    );
    navigate("/");
  };

  return (
    <form className="w-5/6" onSubmit={handleSubmit}>
      {/* Title Inputs ................................. */}
      <label className="form-control w-full max-w-full mb-5">
        <div className="font-extrabold text-base mb-2 flex items-center justify-between">
          <div>Enter Title</div>
          <div
            className="tooltip tooltip-left tooltip-info"
            data-tip="Title must contain brand and important feature"
          >
            <button className="btn btn-info ml-1 btn-circle" disabled>
              <img src={hintImg} className="w-10" />
            </button>
          </div>
        </div>
        <input
          type="text"
          placeholder="Type your product title here"
          className="input input-bordered input-success w-full max-w-full"
          // On input change setting the input title
          value={inputs.title}
          onChange={(e) => setInputs({ ...inputs, title: e.target.value })}
          oninvalid="this.setCustomValidity('Please Enter valid email')"
          required
        />
      </label>
      {/* MRP Inputs ................................. */}
      <label className="form-control w-full max-w-full mb-5">
        <div className="font-extrabold text-base mb-2 flex items-center justify-between">
          Enter MRP{" "}
          <div
            className="tooltip tooltip-left tooltip-info"
            data-tip="MRP Shouldn't be less then 0"
          >
            <button className="btn btn-info ml-1 btn-circle" disabled>
              <img src={hintImg} className="w-10" />
            </button>
          </div>
        </div>
        <input
          type="number"
          placeholder="Type product MRP here"
          min={0}
          className="input input-bordered input-success w-full max-w-full"
          // On input change setting the input MRP
          value={inputs.mrp}
          onChange={(e) => setInputs({ ...inputs, mrp: e.target.value })}
          required
        />
      </label>
      {/* Price input .................................................. */}
      <label className="form-control w-full max-w-full mb-5">
        <div className="font-extrabold text-base mb-2 flex items-center justify-between">
          Enter Price{" "}
          <div
            className="tooltip tooltip-left tooltip-info"
            data-tip="Price should be greater then zero"
          >
            <button className="btn btn-info ml-1 btn-circle" disabled>
              <img src={hintImg} className="w-10" />
            </button>
          </div>
        </div>
        <input
          type="number"
          placeholder="Type product price here"
          min={0}
          value={inputs.price}
          onChange={(e) => setInputs({ ...inputs, price: e.target.value })}
          className="input input-bordered input-success w-full max-w-full"
          required
        />
      </label>
      {/*  Brand Input .....................................................  */}
      <label className="form-control w-full max-w-full mb-5">
        <div className="font-extrabold text-base mb-2 flex items-center justify-between">
          Enter Brand{" "}
          <div
            className="tooltip tooltip-left tooltip-info"
            data-tip="Enter Valid Brand Name"
          >
            <button className="btn btn-info ml-1 btn-circle" disabled>
              <img src={hintImg} className="w-10" />
            </button>
          </div>
        </div>
        <input
          type="text"
          placeholder="Type your product brand here"
          className="input input-bordered input-success w-full max-w-full"
          value={inputs.Brand}
          onChange={(e) => setInputs({ ...inputs, Brand: e.target.value })}
          required
        />
      </label>
      {/* Type Input .................................................... */}
      <label className="form-control w-full max-w-full mb-5">
        <div className="font-extrabold text-base mb-2 flex items-center justify-between">
          Select Product Type{" "}
          <div
            className="tooltip tooltip-left tooltip-info"
            data-tip="Select Type Care Fully"
          >
            <button className="btn btn-info ml-1 btn-circle" disabled>
              <img src={hintImg} className="w-10" />
            </button>
          </div>
        </div>
        <select
          className="select select-success w-full max-w-full"
          value={inputs.type}
          onChange={(e) => setInputs({ ...inputs, type: e.target.value })}
          required
        >
          <option disabled selected value={""}>
            Pick the type of product
          </option>
          <option value="electronic">Electronic</option>
          <option value="Men">Men</option>
          <option value="women">Women</option>
          <option value="Bags">Bag</option>
          <option value="Accessories">Accessories</option>
        </select>
      </label>

      {/* Image URL Inputs .................................................. */}
      <label className="form-control w-full max-w-full mb-5">
        <div className="font-extrabold text-base mb-2 flex items-center justify-between">
          Enter Image URL{" "}
          <div
            className="tooltip tooltip-left tooltip-info"
            data-tip="Can enter max 7 images"
          >
            <button className="btn btn-info ml-1 btn-circle" disabled>
              <img src={hintImg} className="w-10" />
            </button>
          </div>
        </div>
        <input
          type="url"
          placeholder="Type URL here.."
          className="input input-bordered input-primary w-full max-w-full mb-1"
          value={images.image1}
          onChange={(e) => setImages({ ...images, image1: e.target.value })}
          required
        />
        <input
          type="url"
          placeholder="Type URL here.."
          className="input input-bordered input-primary w-full max-w-full mb-1"
          value={images.image2}
          onChange={(e) => setImages({ ...images, image2: e.target.value })}
        />
        <input
          type="url"
          placeholder="Type URL here.."
          className="input input-bordered input-primary w-full max-w-full mb-1"
          value={images.image3}
          onChange={(e) => setImages({ ...images, image3: e.target.value })}
        />
        <input
          type="url"
          placeholder="Type URL here.."
          className="input input-bordered input-primary w-full max-w-full mb-1"
          value={images.image4}
          onChange={(e) => setImages({ ...images, image4: e.target.value })}
        />
        <input
          type="url"
          placeholder="Type URL here.."
          className="input input-bordered input-primary w-full max-w-full mb-1"
          value={images.image5}
          onChange={(e) => setImages({ ...images, image5: e.target.value })}
        />
        <input
          type="url"
          placeholder="Type URL here.."
          className="input input-bordered input-primary w-full max-w-full mb-1"
          value={images.image6}
          onChange={(e) => setImages({ ...images, image6: e.target.value })}
        />
        <input
          type="url"
          placeholder="Type URL here.."
          className="input input-bordered input-primary w-full max-w-full mb-1"
          value={images.image7}
          onChange={(e) => setImages({ ...images, image7: e.target.value })}
        />
      </label>

      {/* Product Description input .................................................. */}
      <label className="form-control w-full max-w-full mb-5">
        <div className="font-extrabold text-base mb-2 flex items-center justify-between">
          Enter Product Description{" "}
          <div
            className="tooltip tooltip-left tooltip-info"
            data-tip="Can only enter max 10 para about the product"
          >
            <button className="btn btn-info ml-1 btn-circle" disabled>
              <img src={hintImg} className="w-10" />
            </button>
          </div>
        </div>
        <input
          type="text"
          placeholder="Type description para 1 here..."
          value={description.para1}
          onChange={(e) =>
            setDescription({ ...description, para1: e.target.value })
          }
          required
          className="input input-bordered input-warning w-full max-w-full mb-1"
        />
        <input
          type="text"
          placeholder="Type description para 2 here..."
          value={description.para2}
          onChange={(e) =>
            setDescription({ ...description, para2: e.target.value })
          }
          className="input input-bordered input-warning w-full max-w-full mb-1"
        />
        <input
          type="text"
          placeholder="Type description para 3 here..."
          value={description.para3}
          onChange={(e) =>
            setDescription({ ...description, para3: e.target.value })
          }
          className="input input-bordered input-warning w-full max-w-full mb-1"
        />
        <input
          type="text"
          placeholder="Type description para 4 here..."
          value={description.para4}
          onChange={(e) =>
            setDescription({ ...description, para4: e.target.value })
          }
          className="input input-bordered input-warning w-full max-w-full mb-1"
        />
        <input
          type="text"
          placeholder="Type description para 5 here..."
          value={description.para5}
          onChange={(e) =>
            setDescription({ ...description, para5: e.target.value })
          }
          className="input input-bordered input-warning w-full max-w-full mb-1"
        />
        <input
          type="text"
          placeholder="Type description para 6 here..."
          value={description.para6}
          onChange={(e) =>
            setDescription({ ...description, para6: e.target.value })
          }
          className="input input-bordered input-warning w-full max-w-full mb-1"
        />
        <input
          type="text"
          placeholder="Type description para 7 here..."
          value={description.para7}
          onChange={(e) =>
            setDescription({ ...description, para7: e.target.value })
          }
          className="input input-bordered input-warning w-full max-w-full mb-1"
        />
        <input
          type="text"
          placeholder="Type description para 8 here..."
          value={description.para8}
          onChange={(e) =>
            setDescription({ ...description, para8: e.target.value })
          }
          className="input input-bordered input-warning w-full max-w-full mb-1"
        />
        <input
          type="text"
          placeholder="Type description para 9 here..."
          value={description.para9}
          onChange={(e) =>
            setDescription({ ...description, para9: e.target.value })
          }
          className="input input-bordered input-warning w-full max-w-full mb-1"
        />
        <input
          type="text"
          placeholder="Type description para 10 here..."
          value={description.para10}
          onChange={(e) =>
            setDescription({ ...description, para10: e.target.value })
          }
          className="input input-bordered input-warning w-full max-w-full mb-1"
        />
      </label>

      {/* Product Specific input .................................... */}
      <label className="form-control w-full max-w-full mb-5">
        <div className="font-extrabold text-base mb-2 flex items-center justify-between">
          Enter Product Specific Detail{" "}
          <div
            className="tooltip tooltip-left tooltip-info"
            data-tip="Enter detail heading on left and its description on right"
          >
            <button className="btn btn-info ml-1 btn-circle" disabled>
              <img src={hintImg} className="w-10" />
            </button>
          </div>
        </div>
        {/* !st Key Value pair input */}
        <div className="w-full flex justify-evenly items-center">
          <input
            type="text"
            placeholder="Type product detail heading here..."
            value={detailKey.detailKey1}
            onChange={(e) =>
              setDetailKey({ ...detailKey, detailKey1: e.target.value })
            }
            className="input input-bordered input-secondary w-5/12 mb-1"
          />
          <input
            type="text"
            placeholder="Type product detail description here..."
            className="input input-bordered input-secondary w-5/12 mb-1"
            value={detailValue.detailValue1}
            onChange={(e) =>
              setDetailValue({ ...detailValue, detailValue1: e.target.value })
            }
          />
        </div>

        {/* Second key value pair input */}
        <div className="w-full flex justify-evenly items-center">
          <input
            type="text"
            placeholder="Type product detail heading here..."
            className="input input-bordered input-secondary w-5/12 mb-1"
            value={detailKey.detailKey2}
            onChange={(e) =>
              setDetailKey({ ...detailKey, detailKey2: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Type product detail description here..."
            className="input input-bordered input-secondary w-5/12 mb-1"
            value={detailValue.detailValue2}
            onChange={(e) =>
              setDetailValue({ ...detailValue, detailValue2: e.target.value })
            }
          />
        </div>

        <div className="w-full flex justify-evenly items-center">
          <input
            type="text"
            placeholder="Type product detail heading here..."
            className="input input-bordered input-secondary w-5/12 mb-1"
            value={detailKey.detailKey3}
            onChange={(e) =>
              setDetailKey({ ...detailKey, detailKey3: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Type product detail description here..."
            className="input input-bordered input-secondary w-5/12 mb-1"
            value={detailValue.detailValue3}
            onChange={(e) =>
              setDetailValue({ ...detailValue, detailValue3: e.target.value })
            }
          />
        </div>

        <div className="w-full flex justify-evenly items-center">
          <input
            type="text"
            placeholder="Type product detail heading here..."
            className="input input-bordered input-secondary w-5/12 mb-1"
            value={detailKey.detailKey4}
            onChange={(e) =>
              setDetailKey({ ...detailKey, detailKey4: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Type product detail description here..."
            className="input input-bordered input-secondary w-5/12 mb-1"
            value={detailValue.detailValue4}
            onChange={(e) =>
              setDetailValue({ ...detailValue, detailValue4: e.target.value })
            }
          />
        </div>

        <div className="w-full flex justify-evenly items-center">
          <input
            type="text"
            placeholder="Type product detail heading here..."
            className="input input-bordered input-secondary w-5/12 mb-1"
            value={detailKey.detailKey5}
            onChange={(e) =>
              setDetailKey({ ...detailKey, detailKey5: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Type product detail description here..."
            className="input input-bordered input-secondary w-5/12 mb-1"
            value={detailValue.detailValue5}
            onChange={(e) =>
              setDetailValue({ ...detailValue, detailValue5: e.target.value })
            }
          />
        </div>

        <div className="w-full flex justify-evenly items-center">
          <input
            type="text"
            placeholder="Type product detail heading here..."
            className="input input-bordered input-secondary w-5/12 mb-1"
            value={detailKey.detailKey6}
            onChange={(e) =>
              setDetailKey({ ...detailKey, detailKey6: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Type product detail description here..."
            className="input input-bordered input-secondary w-5/12 mb-1"
            value={detailValue.detailValue6}
            onChange={(e) =>
              setDetailValue({ ...detailValue, detailValue6: e.target.value })
            }
          />
        </div>

        <div className="w-full flex justify-evenly items-center">
          <input
            type="text"
            placeholder="Type product detail heading here..."
            className="input input-bordered input-secondary w-5/12 mb-1"
            value={detailKey.detailKey7}
            onChange={(e) =>
              setDetailKey({ ...detailKey, detailKey7: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Type product detail description here..."
            className="input input-bordered input-secondary w-5/12 mb-1"
            value={detailValue.detailValue7}
            onChange={(e) =>
              setDetailValue({ ...detailValue, detailValue7: e.target.value })
            }
          />
        </div>

        <div className="w-full flex justify-evenly items-center">
          <input
            type="text"
            placeholder="Type product detail heading here..."
            className="input input-bordered input-secondary w-5/12 mb-1"
            value={detailKey.detailKey8}
            onChange={(e) =>
              setDetailKey({ ...detailKey, detailKey8: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Type product detail description here..."
            className="input input-bordered input-secondary w-5/12 mb-1"
            value={detailValue.detailValue8}
            onChange={(e) =>
              setDetailValue({ ...detailValue, detailValue8: e.target.value })
            }
          />
        </div>

        <div className="w-full flex justify-evenly items-center">
          <input
            type="text"
            placeholder="Type product detail heading here..."
            className="input input-bordered input-secondary w-5/12 mb-1"
            value={detailKey.detailKey9}
            onChange={(e) =>
              setDetailKey({ ...detailKey, detailKey9: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Type product detail description here..."
            className="input input-bordered input-secondary w-5/12 mb-1"
            value={detailValue.detailValue9}
            onChange={(e) =>
              setDetailValue({ ...detailValue, detailValue9: e.target.value })
            }
          />
        </div>

        <div className="w-full flex justify-evenly items-center">
          <input
            type="text"
            placeholder="Type product detail heading here..."
            className="input input-bordered input-secondary w-5/12 mb-1"
            value={detailKey.detailKey10}
            onChange={(e) =>
              setDetailKey({ ...detailKey, detailKey10: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Type product detail description here..."
            className="input input-bordered input-secondary w-5/12 mb-1"
            value={detailValue.detailValue10}
            onChange={(e) =>
              setDetailValue({ ...detailValue, detailValue10: e.target.value })
            }
          />
        </div>
      </label>

      {/* Input of key value pair of additional detail */}
      <label className="form-control w-full max-w-full mb-5">
        <div className="font-extrabold text-base mb-2 flex items-center justify-between">
          Additional Details{" "}
          <div
            className="tooltip tooltip-left tooltip-info"
            data-tip="Enter detail heading on left and its description on right"
          >
            <button className="btn btn-info ml-1 btn-circle" disabled>
              <img src={hintImg} className="w-10" />
            </button>
          </div>
        </div>
        <div className="w-full flex justify-evenly items-center">
          <input
            type="text"
            placeholder="Type additional detail heading here..."
            className="input input-bordered input-primary w-5/12 mb-1"
            value={additionalKey.additionalKey1}
            onChange={(e) =>
              setAdditionalKey({
                ...additionalKey,
                additionalKey1: e.target.value,
              })
            }
          />
          <input
            type="text"
            placeholder="Type additional detail description here..."
            className="input input-bordered input-primary w-5/12 mb-1"
            value={additionalValue.additionalValue1}
            onChange={(e) =>
              setAdditionalValue({
                ...additionalValue,
                additionalValue1: e.target.value,
              })
            }
          />
        </div>

        <div className="w-full flex justify-evenly items-center">
          <input
            type="text"
            placeholder="Type additional detail heading here..."
            className="input input-bordered input-primary w-5/12 mb-1"
            value={additionalKey.additionalKey2}
            onChange={(e) =>
              setAdditionalKey({
                ...additionalKey,
                additionalKey2: e.target.value,
              })
            }
          />
          <input
            type="text"
            placeholder="Type additional detail description here..."
            className="input input-bordered input-primary w-5/12 mb-1"
            value={additionalValue.additionalValue2}
            onChange={(e) =>
              setAdditionalValue({
                ...additionalValue,
                additionalValue2: e.target.value,
              })
            }
          />
        </div>

        <div className="w-full flex justify-evenly items-center">
          <input
            type="text"
            placeholder="Type additional detail heading here..."
            className="input input-bordered input-primary w-5/12 mb-1"
            value={additionalKey.additionalKey3}
            onChange={(e) =>
              setAdditionalKey({
                ...additionalKey,
                additionalKey3: e.target.value,
              })
            }
          />
          <input
            type="text"
            placeholder="Type additional detail description here..."
            className="input input-bordered input-primary w-5/12 mb-1"
            value={additionalValue.additionalValue3}
            onChange={(e) =>
              setAdditionalValue({
                ...additionalValue,
                additionalValue3: e.target.value,
              })
            }
          />
        </div>

        <div className="w-full flex justify-evenly items-center">
          <input
            type="text"
            placeholder="Type additional detail heading here..."
            className="input input-bordered input-primary w-5/12 mb-1"
            value={additionalKey.additionalKey4}
            onChange={(e) =>
              setAdditionalKey({
                ...additionalKey,
                additionalKey4: e.target.value,
              })
            }
          />
          <input
            type="text"
            placeholder="Type additional detail description here..."
            className="input input-bordered input-primary w-5/12 mb-1"
            value={additionalValue.additionalValue4}
            onChange={(e) =>
              setAdditionalValue({
                ...additionalValue,
                additionalValue4: e.target.value,
              })
            }
          />
        </div>

        <div className="w-full flex justify-evenly items-center">
          <input
            type="text"
            placeholder="Type additional detail heading here..."
            className="input input-bordered input-primary w-5/12 mb-1"
            value={additionalKey.additionalKey5}
            onChange={(e) =>
              setAdditionalKey({
                ...additionalKey,
                additionalKey5: e.target.value,
              })
            }
          />
          <input
            type="text"
            placeholder="Type additional detail description here..."
            className="input input-bordered input-primary w-5/12 mb-1"
            value={additionalValue.additionalValue5}
            onChange={(e) =>
              setAdditionalValue({
                ...additionalValue,
                additionalValue5: e.target.value,
              })
            }
          />
        </div>

        <div className="w-full flex justify-evenly items-center">
          <input
            type="text"
            placeholder="Type additional detail heading here..."
            className="input input-bordered input-primary w-5/12 mb-1"
            value={additionalKey.additionalKey6}
            onChange={(e) =>
              setAdditionalKey({
                ...additionalKey,
                additionalKey6: e.target.value,
              })
            }
          />
          <input
            type="text"
            placeholder="Type additional detail description here..."
            className="input input-bordered input-primary w-5/12 mb-1"
            value={additionalValue.additionalValue6}
            onChange={(e) =>
              setAdditionalValue({
                ...additionalValue,
                additionalValue6: e.target.value,
              })
            }
          />
        </div>

        <div className="w-full flex justify-evenly items-center">
          <input
            type="text"
            placeholder="Type additional detail heading here..."
            className="input input-bordered input-primary w-5/12 mb-1"
            value={additionalKey.additionalKey7}
            onChange={(e) =>
              setAdditionalKey({
                ...additionalKey,
                additionalKey7: e.target.value,
              })
            }
          />
          <input
            type="text"
            placeholder="Type additional detail description here..."
            className="input input-bordered input-primary w-5/12 mb-1"
            value={additionalValue.additionalValue7}
            onChange={(e) =>
              setAdditionalValue({
                ...additionalValue,
                additionalValue7: e.target.value,
              })
            }
          />
        </div>

        <div className="w-full flex justify-evenly items-center">
          <input
            type="text"
            placeholder="Type additional detail heading here..."
            className="input input-bordered input-primary w-5/12 mb-1"
            value={additionalKey.additionalKey8}
            onChange={(e) =>
              setAdditionalKey({
                ...additionalKey,
                additionalKey8: e.target.value,
              })
            }
          />
          <input
            type="text"
            placeholder="Type additional detail description here..."
            className="input input-bordered input-primary w-5/12 mb-1"
            value={additionalValue.additionalValue8}
            onChange={(e) =>
              setAdditionalValue({
                ...additionalValue,
                additionalValue8: e.target.value,
              })
            }
          />
        </div>

        <div className="w-full flex justify-evenly items-center">
          <input
            type="text"
            placeholder="Type additional detail heading here..."
            className="input input-bordered input-primary w-5/12 mb-1"
            value={additionalKey.additionalKey9}
            onChange={(e) =>
              setAdditionalKey({
                ...additionalKey,
                additionalKey9: e.target.value,
              })
            }
          />
          <input
            type="text"
            placeholder="Type additional detail description here..."
            className="input input-bordered input-primary w-5/12 mb-1"
            value={additionalValue.additionalValue9}
            onChange={(e) =>
              setAdditionalValue({
                ...additionalValue,
                additionalValue9: e.target.value,
              })
            }
          />
        </div>

        <div className="w-full flex justify-evenly items-center">
          <input
            type="text"
            placeholder="Type additional detail heading here..."
            className="input input-bordered input-primary w-5/12 mb-1"
            value={additionalKey.additionalKey10}
            onChange={(e) =>
              setAdditionalKey({
                ...additionalKey,
                additionalKey10: e.target.value,
              })
            }
          />
          <input
            type="text"
            placeholder="Type additional detail description here..."
            className="input input-bordered input-primary w-5/12 mb-1"
            value={additionalValue.additionalValue10}
            onChange={(e) =>
              setAdditionalValue({
                ...additionalValue,
                additionalValue10: e.target.value,
              })
            }
          />
        </div>
      </label>
      <div className="w-full flex justify-center items-center">
        {loading ? (
          <PropagateLoader color="blue" />
        ) : (
          <button
            className="btn btn-active btn-primary w-3/12 font-extrabold text-lg"
            type="submit"
          >
            Add Product
          </button>
        )}
      </div>
    </form>
  );
}

export default AddForm;
