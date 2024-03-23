import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ProductForm from './ProductForm';

test('renders ProductForm component', () => {
  render(<ProductForm />);
  // Verifica se os campos do formulário estão presentes
  const nameField = screen.getByLabelText('Name');
  const priceField = screen.getByLabelText('Price');
  const quantityField = screen.getByLabelText('Quantity');
  const createButton = screen.getByText('Create');
  const cancelButton = screen.getByText('Cancel');

  expect(nameField).toBeInTheDocument();
  expect(priceField).toBeInTheDocument();
  expect(quantityField).toBeInTheDocument();
  expect(createButton).toBeInTheDocument();
  expect(cancelButton).toBeInTheDocument();
});

test('submitting the form', async () => {
  const onSaveSuccess = jest.fn();
  render(<ProductForm onSaveSuccess={onSaveSuccess} />);

  // Preenche os campos do formulário
  const nameInput = screen.getByLabelText('Name');
  const priceInput = screen.getByLabelText('Price');
  const quantityInput = screen.getByLabelText('Quantity');
  const createButton = screen.getByText('Create');

  fireEvent.change(nameInput, { target: { value: 'Product Name' } });
  fireEvent.change(priceInput, { target: { value: '10' } });
  fireEvent.change(quantityInput, { target: { value: '5' } });

  // Simula o envio do formulário
  fireEvent.click(createButton);

  // Verifica se a função onSaveSuccess foi chamada
  expect(onSaveSuccess).toHaveBeenCalled();
});
