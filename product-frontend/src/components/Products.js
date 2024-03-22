import React, { useState } from 'react';
import { Container, Typography } from '@mui/material';
import axios from 'axios';
import ProductList from './ProductList';

const Products = () => {
  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Products
      </Typography>      
      <ProductList />
    </Container>
  );
};

export default Products;
