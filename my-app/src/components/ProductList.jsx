import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

const reteriveProdcuts = async ({ queryKey }) => {
  const response = await axios.get(
    `http://localhost:3000/products?_page=${queryKey[1].page}&_per_page=2`
  );
  return response.data;
};
const ProductList = ({onSaveId}) => {
  const [page, setPage] = useState(1);
  const {
    data: products,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["products", { page }],
    queryFn: reteriveProdcuts,
    retry: false,
    refetchInterval: 1000,
  });

  if (isLoading) return <div>Fetching products...</div>;
  if (error) return <div>An error occured: {error.message}</div>;

  const handleClicked = (id) => {
   onSaveId(id)
    
  };

  return (
    <div className="flex flex-col justify-center items-center w-2/5">
      <h2 className="text-3xl my-2  text-green-900">
        <u>Product List</u>
      </h2>
      <ul className="flex flex-wrap justify-center items-center">
        {products.data &&
          products.data.map((product) => (
            <li
              key={product.id}
              className="flex flex-col  m-2 border rounded-sm"
            >
              <img
                className="object-cover h-64 w-96 rounded-sm"
                src={product.thumbnail}
                alt={product.title}
              />
              <div className="flex justify-between">
                <p className=" text-xl my-3">{product.title}</p>
                <button
                  onClick={()=>handleClicked(product.id)}
                  className="bg-gray-200 rounded-md m-2 p-1"
                >
                  Show Details
                </button>
              </div>
            </li>
          ))}
      </ul>
      <div className="flex">
        {products.prev && (
          <button
            className="p-1 mx-1 bg-gray-100 border cursor-pointer rounded-sm"
            onClick={() => setPage(products.prev)}
          >
            Prev
          </button>
        )}
        {products.next && (
          <button
            className="p-1 mx-1 bg-gray-100 border cursor-pointer rounded-sm"
            onClick={() => setPage(products.next)}
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductList;
