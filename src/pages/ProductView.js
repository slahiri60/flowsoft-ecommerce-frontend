import { useState, useEffect } from 'react';
import moment from 'moment';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Badge } from 'antd';
import { FaRegClock } from 'react-icons/fa';

export default function ProductView() {
  // state
  const [product, setProduct] = useState({});
  // hooks
  const params = useParams();

  useEffect(() => {
    if (params?.slug) loadProduct();
  }, [params?.slug]);

  const loadProduct = async (req, res) => {
    try {
      const { data } = await axios.get(`/product/${params.slug}`);
      setProduct(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-9">
          <div className="card mb-3 hoverable">
            <Badge.Ribbon text={`${product?.sold} sold`} color="red">
              <Badge.Ribbon
                text={`${
                  product?.quantity >= 1
                    ? `${product?.quantity - product?.sold} in stock`
                    : 'Out of stock'
                }`}
                placement="start"
                color="green"
              >
                <img
                  className="mx-auto d-block"
                  src={`${process.env.REACT_APP_API}/product/photo/${product._id}`}
                  alt={product.name}
                  style={{
                    height: '200px',
                    width: '200px',
                    objectFit: 'cover',
                  }}
                />
              </Badge.Ribbon>
            </Badge.Ribbon>

            <div className="card-body">
              <h1 className="fw-bold">{product?.name}</h1>

              <h4 className="fw-bold">
                {product?.price?.toLocaleString('en-US', {
                  style: 'currency',
                  currency: 'USD',
                })}
              </h4>

              <p>
                <FaRegClock /> Added: {moment(product.createdAt).fromNow()}
              </p>

              <p className="card-text lead">{product?.description}</p>
            </div>

            <button
              className="btn btn-outline-primary col card-button"
              style={{
                borderBottomRightRadius: '5px',
                borderBottomLeftRadius: '5px',
              }}
            >
              Add to Cart
            </button>
          </div>
        </div>

        <div className="col-md-3">
          <h2>Related Products</h2>
        </div>
      </div>
    </div>
  );
}
