  import React, { useState, useEffect } from 'react';
  import axios from 'axios';
  import { getAuthToken } from './auth';

  function Products() {
    const [products, setProducts] = useState([]);
    const [newProduct, setNewProduct] = useState({
      name: '',
      price: 0,
      description: '',
      productType: '',
    });
    const [editingProduct, setEditingProduct] = useState(null);
    const [productTypes, setProductTypes] = useState([]); // Initialize productTypes state

    useEffect(() => {
      const authToken = getAuthToken();
      console.log('Authentication token:', authToken);

      // Fetch product types data
      axios
        .get('http://localhost:3001/api/admin/product-types', {
          headers: {
            'Authorization': `Bearer ${authToken}`,
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

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setNewProduct({
        ...newProduct,
        [name]: value,
      });
    };

    const handleAddProduct = () => {
      const authToken = getAuthToken();
    
      // Find the selected product type by _id
      const selectedProductType = productTypes.find((type) => type._id === newProduct.productType);
    
      // Use the selected product type's _id if it exists, otherwise use newProduct.productType
      const productTypeToAdd = selectedProductType ? selectedProductType._id : newProduct.productType;
    
      const productToAdd = {
        ...newProduct,
        productType: productTypeToAdd,
      };
    
      axios
        .post('http://localhost:3001/api/admin/products', productToAdd, {
          headers: {
            'Authorization': `Bearer ${authToken}`,
            'Content-Type': 'application/json',
          },
        })
        .then((response) => {
          setProducts([...products, response.data]);
          setNewProduct({ name: '', price: 0, description: '', productType: '', quantity: 0 });
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
            'Authorization': `Bearer ${authToken}`,
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
            name="price"
            placeholder="Product Price"
            value={newProduct.price}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="description"
            placeholder="Product Description"
            value={newProduct.description}
            onChange={handleInputChange}
          />
          <input
            type="number"  
            name="quantity"
            placeholder="Product Quantity"
            value={newProduct.quantity}
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
              <th>Price</th>
              <th>Description</th>
              <th>Quantity</th>
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
                  {productTypes.find(type => type._id === product.productType)?.name || 'Unknown'}
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
