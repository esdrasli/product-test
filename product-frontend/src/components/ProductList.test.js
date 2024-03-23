import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ProductList from './ProductList';

test('renders ProductList component', () => {
  render(<ProductList />);
  const productListElementId = screen.getByText('ID');
  const productListElementName= screen.getByText('Name');
  const productListElementPrice = screen.getByText('Price');
  const productListElementQuantity = screen.getByText('Quantity');
  expect(productListElementId).toBeInTheDocument();
  expect(productListElementName).toBeInTheDocument();
  expect(productListElementPrice).toBeInTheDocument();
  expect(productListElementQuantity).toBeInTheDocument();
});
