import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getAuthToken } from './auth';
import  '../css/ProductType.css';
function ProductType() {
  const [productTypes, setProductTypes] = useState([]);
  const [newProductType, setNewProductType] = useState({
    name: '',
  });
  const [editingProductType, setEditingProductType] = useState(null);

  useEffect(() => {
    const authToken = getAuthToken();

    async function fetchProductTypes() {
      try {
        const response = await axios.get('http://localhost:3001/api/admin/product-types', {
          headers: {
            Authorization: `Bearer ${authToken}`,
            'Content-Type': 'application/json',
          },
        });

        setProductTypes(response.data);
      } catch (error) {
        console.error('Error fetching product types:', error);
      }
    }

    fetchProductTypes();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProductType({
      ...newProductType,
      [name]: value,
    });
  };

  const handleAddProductType = () => {
    const authToken = getAuthToken();

    axios
      .post('http://localhost:3001/api/admin/product-types', newProductType, {
        headers: {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        setProductTypes([...productTypes, response.data]);
        setNewProductType({ name: '' });
      })
      .catch((error) => {
        console.error('Error adding product type:', error);
      });
  };

  const handleEditProductType = (productTypeId) => {
    setEditingProductType(productTypeId);
  };

  const handleSaveProductType = (productType) => {
    const authToken = getAuthToken();

    axios
      .put(`http://localhost:3001/api/admin/product-types/${productType._id}`, productType, {
        headers: {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
      })
      .then(() => {
        setEditingProductType(null);
      })
      .catch((error) => {
        console.error('Error updating product type:', error);
      });
  };

  const handleDeleteProductType = (productTypeId) => {
    const authToken = getAuthToken();

    axios
      .delete(`http://localhost:3001/api/admin/product-types/${productTypeId}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .then(() => {
        const updatedProductTypes = productTypes.filter((type) => type._id !== productTypeId);
        setProductTypes(updatedProductTypes);
      })
      .catch((error) => {
        console.error('Error deleting product type:', error);
      });
  };

  return (
    <div className="product-type-page"> 
      <h2>Product Types</h2>
      <div>
        <h3>Add a New Product Type</h3>
        <input
          type="text"
          name="name"
          placeholder="Product Type Name"
          value={newProductType.name}
          onChange={handleInputChange}
          className="new-product-type-input"
        />
        <button onClick={handleAddProductType} className="add-product-type-button">Add Product Type</button> {/* Apply the CSS class */}
      </div>
      <table className="product-types-table"> 
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
                        productTypes.map((t) =>
                          t._id === type._id ? { ...t, name: e.target.value } : t
                        )
                      )
                    }
                    className="new-product-type-input" 
                  />
                ) : (
                  type.name
                )}
              </td>
              <td>
                {editingProductType === type._id ? (
                  <button onClick={() => handleSaveProductType(type)} className="save-button">Save</button> 
                ) : (
                  <>
                    <button onClick={() => handleEditProductType(type._id)} className="edit-button">Edit</button> 
                    <button onClick={() => handleDeleteProductType(type._id)} className="delete-button">Delete</button> 
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

export default ProductType;
