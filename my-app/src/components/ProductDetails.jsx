/* eslint-disable react/prop-types */
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const reteriveProdcut = async ({ queryKey }) => {
  const response = await axios.get(
    `http://localhost:3000/${queryKey[0]}/${queryKey[1]}`
  );
  return response.data;
};
const ProductDetails = ({ id }) => {
  const {
    data: product,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["products", id],
    queryFn: reteriveProdcut,
  });

  if (isLoading) return <div>Fetching product Details...</div>;
  if (error) return <div>An error occured: {error.message}</div>;
  return (
    <div className="w-1/5">
      <h2 className=" text-3xl my-1">Product Details</h2>
      <div className="border bg-gray-100 p-1 text-md rounded flex flex-col">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="object-cover h-24 w-24 border rounded-full m-auto"
        />
        <p>{product.title}</p>
        <p>{product.description}</p>
        <p>{product.price}$</p>
        <p>{product.rating}/5</p>
      </div>
    </div>
  );
};

export default ProductDetails;
