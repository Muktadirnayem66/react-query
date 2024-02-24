
import { useState } from 'react';
import AddProduct from './components/AddProduct';
import ProductDetails from './components/ProductDetails';
import ProductList from './components/ProductList';

const App = () => {
  const [data, setData]=useState("")

  const handleId = (id)=>{
    setData(id)
  }

  return (
    <div className='flex m-2'>
      <AddProduct/>
      <ProductList  onSaveId={handleId} />
      <ProductDetails id={data}/>
    </div>
  );
};

export default App;