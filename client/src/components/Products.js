import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getAuthToken } from './auth';

function Products() {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: 0,
  });
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    const authToken = getAuthToken();
    console.log('Authentication token:', authToken);
    axios
      .get('http://localhost:3001/api/admin/products', {
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        // Handle the response here
        setProducts(response.data);
      })
      .catch((error) => {
        // Handle errors here
        console.error('Error fetching products:', error);
      });
  }, []);

  // Handle input changes for the new product
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({
      ...newProduct,
      [name]: value,
    });
  };

  // Handle submission of the new product
  const handleAddProduct = () => {
    const authToken = getAuthToken();

    axios
      .post('http://localhost:3001/api/admin/products', newProduct, {
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        // Handle success, e.g., update the list of products
        setProducts([...products, response.data]);
        // Clear the form fields
        setNewProduct({ name: '', price: 0 });
      })
      .catch((error) => {
        // Handle errors, e.g., display an error message
        console.error('Error adding product:', error);
      });
  };

  const handleEditProduct = (productId) => {
    setEditingProduct(productId);
  };

  const handleSaveProduct = (product) => {
    const authToken = getAuthToken();

    axios
      .put(
        `http://localhost:3001/api/admin/products/${product._id}`,
        product,
        {
          headers: {
            'Authorization': `Bearer ${authToken}`,
            'Content-Type': 'application/json',
          },
        }
      )
      .then(() => {
        // Handle success, e.g., update the list of products
        setEditingProduct(null);
      })
      .catch((error) => {
        // Handle errors, e.g., display an error message
        console.error('Error updating product:', error);
      });
  };

  const handleDeleteProduct = (productId) => {
    const authToken = getAuthToken();

    axios
      .delete(`http://localhost:3001/api/admin/products/${productId}`, {
        headers: {
          'Authorization': `Bearer ${authToken}`,
        },
      })
      .then(() => {
        // Handle success, e.g., update the list of products by removing the deleted one
        const updatedProducts = products.filter((product) => product._id !== productId);
        setProducts(updatedProducts);
      })
      .catch((error) => {
        // Handle errors, e.g., display an error message
        console.error('Error deleting product:', error);
      });
  };

  return (
    <div>
      <h2>Products</h2>
      {/* Add a form to add a new product */}
      <div>
        <h3>Add a New Product</h3>
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={newProduct.name}
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="price"
          placeholder="Product Price"
          value={newProduct.price}
          onChange={handleInputChange}
        />
        <button onClick={handleAddProduct}>Add Product</button>
      </div>
      {/* Existing table of products */}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td>{product._id}</td>
              <td>
                {editingProduct === product._id ? (
                  <input
                    type="text"
                    name="name"
                    value={product.name}
                    onChange={(e) =>
                      setProducts(
                        products.map((p) =>
                          p._id === product._id ? { ...p, name: e.target.value } : p
                        )
                      )
                    }
                  />
                ) : (
                  product.name
                )}
              </td>
              <td>
                {editingProduct === product._id ? (
                  <input
                    type="number"
                    name="price"
                    value={product.price}
                    onChange={(e) =>
                      setProducts(
                        products.map((p) =>
                          p._id === product._id ? { ...p, price: parseFloat(e.target.value) } : p
                        )
                      )
                    }
                  />
                ) : (
                  product.price
                )}
              </td>
              <td>
                {editingProduct === product._id ? (
                  <button onClick={() => handleSaveProduct(product)}>Save</button>
                ) : (
                  <>
                    <button onClick={() => handleEditProduct(product._id)}>Edit</button>
                    <button onClick={() => handleDeleteProduct(product._id)}>Delete</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Products;
