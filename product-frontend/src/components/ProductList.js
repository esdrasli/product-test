import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import { Button, Box } from '@mui/material';
import ProductForm from './ProductForm';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [editingProductId, setEditingProductId] = useState(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await axios.get('http://localhost:3000/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    }

    fetchProducts();
  }, []);

  const handleProductCreate = async (newProduct) => {
    try {
      const response = await axios.post('http://localhost:3000/products', newProduct);
      const createdProduct = response.data;
      setProducts([...products, createdProduct]);
      fetchProducts();
    } catch (error) {
      console.error('Error creating product:', error);
      alert('Erro ao criar o produto.');
    }
  };

  const handleProductEdit = async (updatedProduct) => {
    try {
      await axios.put(`http://localhost:3000/products/${updatedProduct.id}`, updatedProduct);
      const updatedProducts = products.map(product =>
        product.id === updatedProduct.id ? updatedProduct : product
      );
      setProducts(updatedProducts);
      setEditingProductId(null);
      fetchProducts();
      alert('Produto atualizado com sucesso.');
    } catch (error) {
      console.error('Error updating product:', error);
      alert('Erro ao atualizar o produto.');
    }
  };

  const handleProductDelete = async (productId) => {
    try {
      await axios.delete(`http://localhost:3000/products/${productId}`);
      setProducts(products.filter(product => product.id !== productId));
      alert('Produto excluído com sucesso.');
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Erro ao excluir o produto.');
    }
  };

  const handleProductFormClose = () => {
    setEditingProductId(null);
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'name', headerName: 'Name', width: 500, editable: true },
    { field: 'price', headerName: 'Price', width: 150, editable: true },
    { field: 'quantity', headerName: 'Quantity', width: 150, editable: true },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 200,
      renderCell: (params) => (
        editingProductId === params.row.id ? (
          <Box>
            <Button variant="contained" color="primary" onClick={() => handleProductEdit(params.row)}>Save</Button>
            <Button variant="contained" color="secondary" onClick={handleProductFormClose}>Cancel</Button>
          </Box>
        ) : (
          <div>
            <Button variant="contained" color="primary" onClick={() => setEditingProductId(params.row.id)}>Edit</Button>
            <Button variant="contained" color="secondary" onClick={() => handleProductDelete(params.row.id)}>Delete</Button>
          </div>
        )
        
      ),
    },
  ];
  
  return (
    <div style={{ height: '100%', width: '100%' }}>
      <DataGrid
        rows={products}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5, 10, 20]}
        checkboxSelection
        disableSelectionOnClick
        isCellEditable={(params) => editingProductId === params.id}
      />
      <Box mt={2}>
        <ProductForm
          product={products.find(product => product.id === editingProductId)}
          onSaveSuccess={handleProductCreate}
          onUpdate={handleProductEdit}
          onClose={handleProductFormClose}
        />
      </Box>
    </div>
  );
};

export default ProductList;
