import { useState, useEffect } from 'react';
import Jumbotron from '../components/cards/Jumbotron';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

export default function CategoryView() {
  // state
  const [products, setProducts] = useState([]);
  // hooks
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    if (params?.slug) loadProductsByCatgory();
  }, [params?.slug]);

  const loadProductsByCatgory = async () => {
    try {
      const { data } = await axios.get(`/products-by-category/${params.slug}`);
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Jumbotron title="Category" subTitle={`X products found in category`} />
    </>
  );
}
