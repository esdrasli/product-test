import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {NumericFormat} from 'react-number-format';
import { Button, TextField, Box, Grid } from '@mui/material';

const ProductForm = ({ product, onClose, onSaveSuccess}) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    if (product) {
      setName(product.name);
      setPrice(product.price);
      setQuantity(product.quantity);
    }
  }, [product]);

  const clearFormAndRefreshList = () => {
    setName('');
    setPrice(0);
    setQuantity(0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = product ? `http://localhost:3000/products/${product.id}` : 'http://localhost:3000/products';
      const method = product ? 'put' : 'post';
      await axios[method](url, {
        name,
        price,
        quantity,
      });
      onClose(); 
      clearFormAndRefreshList();    
      onSaveSuccess(); 
      if(method == 'put')
      alert('Produto editado com sucesso.');
    else{
      alert('Produto inserido com sucesso.');

    }

    } catch (error) {
      console.error('Error creating/updating product:', error);
      alert('Erro ao cadastrar o produto.');
    }
    
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={4}>
          <TextField
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={3}>
          <NumericFormat
            label="Price"
            value={price}
            onValueChange={(values) => setPrice(values.floatValue || 0)}
            customInput={TextField}
            thousandSeparator={true}
            prefix={'$'}
            fullWidth
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            label="Quantity"
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value, 10))}
            fullWidth
          />
        </Grid>
        <Grid item xs={2}>
          <Box display="flex" justifyContent="flex-end" style={{  gap: '8px' }}>
            <Button type="submit" variant="contained" color="primary">
              {product ? 'Update' : 'Create'}
            </Button>
            <Button onClick={clearFormAndRefreshList} variant="contained" color="secondary">
              Cancel
            </Button>
          </Box>
        </Grid>
      </Grid>
    </form>
  );
};

export default ProductForm;
