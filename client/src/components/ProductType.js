import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getAuthToken } from './auth';

function ProductType() {
  const [productTypes, setProductTypes] = useState([]);
  const [newProductType, setNewProductType] = useState({
    name: '',
  });
  const [editingProductType, setEditingProductType] = useState(null);

  useEffect(() => {
    const authToken = getAuthToken();
    console.log('Authentication token:', authToken);
    axios
      .get('http://localhost:3001/api/admin/product-types', {
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        // Handle the response here
        setProductTypes(response.data);
      })
      .catch((error) => {
        // Handle errors here
        console.error('Error fetching product types:', error);
      });
  }, []);

  // Handle input changes for the new product type
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProductType({
      ...newProductType,
      [name]: value,
    });
  };

  // Handle submission of the new product type
  const handleAddProductType = () => {
    const authToken = getAuthToken();

    axios
      .post('http://localhost:3001/api/admin/product-types', newProductType, {
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        // Handle success, e.g., update the list of product types
        setProductTypes([...productTypes, response.data]);
        // Clear the form fields
        setNewProductType({ name: '' });
      })
      .catch((error) => {
        // Handle errors, e.g., display an error message
        console.error('Error adding product type:', error);
      });
  };

  const handleEditProductType = (productTypeId) => {
    setEditingProductType(productTypeId);
  };

  const handleSaveProductType = (productType) => {
    const authToken = getAuthToken();

    axios
      .put(
        `http://localhost:3001/api/admin/product-types/${productType._id}`,
        productType,
        {
          headers: {
            'Authorization': `Bearer ${authToken}`,
            'Content-Type': 'application/json',
          },
        }
      )
      .then(() => {
        // Handle success, e.g., update the list of product types
        setEditingProductType(null);
      })
      .catch((error) => {
        // Handle errors, e.g., display an error message
        console.error('Error updating product type:', error);
      });
  };

  const handleDeleteProductType = (productTypeId) => {
    const authToken = getAuthToken();

    axios
      .delete(`http://localhost:3001/api/admin/product-types/${productTypeId}`, {
        headers: {
          'Authorization': `Bearer ${authToken}`,
        },
      })
      .then(() => {
        // Handle success, e.g., update the list of product types by removing the deleted one
        const updatedProductTypes = productTypes.filter((type) => type._id !== productTypeId);
        setProductTypes(updatedProductTypes);
      })
      .catch((error) => {
        // Handle errors, e.g., display an error message
        console.error('Error deleting product type:', error);
      });
  };

  return (
    <div>
      <h2>Product Types</h2>
      {/* Add a form to add a new product type */}
      <div>
        <h3>Add a New Product Type</h3>
        <input
          type="text"
          name="name"
          placeholder="Product Type Name"
          value={newProductType.name}
          onChange={handleInputChange}
        />
        <button onClick={handleAddProductType}>Add Product Type</button>
      </div>
      {/* Existing table of product types */}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {productTypes.map((type) => (
            <tr key={type._id}>
              <td>{type._id}</td>
              <td>
                {editingProductType === type._id ? (
                  <input
                    type="text"
                    name="name"
                    value={type.name}
                    onChange={(e) =>
                      setProductTypes(
                        productTypes.map((pt) =>
                          pt._id === type._id ? { ...pt, name: e.target.value } : pt
                        )
                      )
                    }
                  />
                ) : (
                  type.name
                )}
              </td>
              <td>
                {editingProductType === type._id ? (
                  <button onClick={() => handleSaveProductType(type)}>Save</button>
                ) : (
                  <button onClick={() => handleEditProductType(type._id)}>Edit</button>
                )}
                <button onClick={() => handleDeleteProductType(type._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProductType;
