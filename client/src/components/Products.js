import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getAuthToken } from './auth';
import '../css/Products.css';

function Products() {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: '',
    quantity: 0, // Updated from "price"
    description: '',
    productType: '', // Product Type ID
  });
  const [editingProduct, setEditingProduct] = useState(null);
  const [productTypes, setProductTypes] = useState([]);

  useEffect(() => {
    const authToken = getAuthToken();

    // Fetch product types data
    axios
      .get('http://localhost:3001/api/admin/product-types', {
        headers: {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        setProductTypes(response.data);
      })
      .catch((error) => {
        console.error('Error fetching product types:', error);
      });

    // Fetch products data
    axios
      .get('http://localhost:3001/api/admin/products', {
        headers: {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
      });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({
      ...newProduct,
      [name]: value,
    });
  };

  const handleAddProduct = () => {
    const authToken = getAuthToken();

    // Only include product type if it's selected in the dropdown
    const postData = { ...newProduct };
    if (postData.productType === '') {
      delete postData.productType;
    }

    axios
      .post('http://localhost:3001/api/admin/products', postData, {
        headers: {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        setProducts([...products, response.data]);
        setNewProduct({ name: '', quantity: 0, description: '', productType: '' });
      })
      .catch((error) => {
        console.error('Error adding product:', error);
      });
  };

  const handleEditProduct = (productId) => {
    setEditingProduct(productId);
  };

  const handleSaveProduct = (product) => {
    const authToken = getAuthToken();

    axios
      .put(`http://localhost:3001/api/admin/products/${product._id}`, product, {
        headers: {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
      })
      .then(() => {
        setEditingProduct(null);
      })
      .catch((error) => {
        console.error('Error updating product:', error);
      });
  };

  const handleDeleteProduct = (productId) => {
    const authToken = getAuthToken();

    axios
      .delete(`http://localhost:3001/api/admin/products/${productId}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .then(() => {
        const updatedProducts = products.filter((product) => product._id !== productId);
        setProducts(updatedProducts);
      })
      .catch((error) => {
        console.error('Error deleting product:', error);
      });
  };

  return (
    <div>
      <h2>Products</h2>
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
          name="quantity" // Updated from "price"
          placeholder="Product Quantity"
          value={newProduct.quantity}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="description"
          placeholder="Product Description"
          value={newProduct.description}
          onChange={handleInputChange}
        />
        <select
          name="productType"
          value={newProduct.productType}
          onChange={handleInputChange}
        >
          <option value="">Select Product Type</option>
          {productTypes.map((type) => (
            <option key={type._id} value={type._id}>
              {type.name}
            </option>
          ))}
        </select>
        <button onClick={handleAddProduct}>Add Product</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Quantity</th> {/* Updated from "Price" */}
            <th>Description</th>
            <th>Product Type</th>
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
                    name="quantity"
                    value={product.quantity}
                    onChange={(e) =>
                      setProducts(
                        products.map((p) =>
                          p._id === product._id ? { ...p, quantity: parseFloat(e.target.value) } : p
                        )
                      )
                    }
                  />
                ) : (
                  product.quantity
                )}
              </td>
              <td>
                {editingProduct === product._id ? (
                  <input
                    type="text"
                    name="description"
                    value={product.description}
                    onChange={(e) =>
                      setProducts(
                        products.map((p) =>
                          p._id === product._id ? { ...p, description: e.target.value } : p
                        )
                      )
                    }
                  />
                ) : (
                  product.description
                )}
              </td>
              <td>
                {productTypes.find((type) => type._id === product.productType)?.name || 'Unknown'}
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
