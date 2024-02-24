import { useState } from "react";
import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const AddProduct = () => {
  const [state, setState] = useState({
    title: "",
    description: "",
    price: 0,
    rating: 5,
    thumbnail: "",
  });

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (newProduct) =>
      axios.post("http://localhost:3000/products", newProduct),
    onSuccess: (data, variables, context) => {
      console.log(context);
      queryClient.invalidateQueries(["products"]);
    },
    onMutate: (variables) => {
      return { greeting: "say hello" };
    },
  });
  const handleChange = (e) => {
    const name = e.target.name;
    const value =
      e.target.type === "number" ? e.target.valueAsNumber : e.target.value;

    setState({
      ...state,
      [name]: value,
    });
  };

  if (mutation.isLoading) {
    return <span>Submitting...</span>;
  }

  if (mutation.isError) {
    return <span>Error: {mutation.error.message}</span>;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const newData = { ...state, id: crypto.randomUUID().toString() };
    mutation.mutate(newData);
    console.log(newData);
  };

  return (
    <div className="m-2 p-2 bg-gray-100 w-1/5 h-1/2">
      <h2 className="text-2xl my-2">Add a Product</h2>
      {mutation.isSuccess && <p>Product Added!</p>}
      <form className="flex flex-col" action="" onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          onChange={handleChange}
          placeholder="Enter the porduct title"
          value={state.title}
          className="my-2 border p-2 rounded"
        />
        <textarea
          value={state.description}
          name="description"
          className="my-2 border p-2 rounded"
          placeholder="Enter a product description"
          onChange={handleChange}
        />

        <input
          type="number"
          name="price"
          value={state.price}
          onChange={handleChange}
          className="my-2 border p-2 rounded"
        />

        {/* <input
          type="number"
          name="number"
          value={state.rating}
          onChange={handleChange}
          className="my-2 border p-2 rounded"
        /> */}
        <input
          type="text"
          name="thumbnail"
          value={state.thumbnail}
          onChange={handleChange}
          className="my-2 border p-2 rounded"
          placeholder="Enter a product thumbnail URL"
        />
        <button
          type="submit"
          className="bg-black m-auto text-white text-xl p-1 rounded-md"
        >
          Add
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
