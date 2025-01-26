import React, { useState } from 'react';
import { Container, Typography, Box, Button, Stack } from '@mui/material';
import InventoryTable from './components/InventoryTable';
import InventoryForm from './components/InventoryForm';
import EditIcon from '@mui/icons-material/Edit';


function App() {
  // Sample data (You can replace or fetch from an API)
  const [items, setItems] = useState([
    { id: 1, name: 'Laptop', category: 'Electronics', quantity: 15 },
    { id: 2, name: 'Mouse', category: 'Electronics', quantity: 8 },
    { id: 3, name: 'T-Shirt', category: 'Clothing', quantity: 20 },
    { id: 4, name: 'Banana', category: 'Food', quantity: 5 },
  ]);

  // For controlling the Add/Edit form dialog
  const [openForm, setOpenForm] = useState(false);
  // Will hold the item to edit
  const [editItem, setEditItem] = useState(null);

  // Handle opening the form for a new item
  const handleAddNew = () => {
    setEditItem(null);
    setOpenForm(true);
  };

  // Handle opening the form for editing
  const handleEdit = (item) => {
    setEditItem(item);
    setOpenForm(true);
  };

  // Handle item deletion
  const handleDelete = (id) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  // Handle submission of Add/Edit form
  const handleFormSubmit = (formData) => {
    if (formData.id) {
      // Editing an existing item
      setItems((prev) =>
        prev.map((item) => (item.id === formData.id ? formData : item))
      );
    } else {
      // Adding a new item
      const newItem = {
        ...formData,
        id: Date.now(), // Generate a unique ID
      };
      setItems((prev) => [...prev, newItem]);
    }
    setOpenForm(false);
  };

  return (
    <Container sx={{ marginTop: 4 }}>
      <Typography variant="h4" gutterBottom>
        Inventory Management
      </Typography>
      <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
        <Button variant="contained" color="primary" onClick={handleAddNew}>
          Add New Item
        </Button>
      </Stack>

      <Box sx={{ marginBottom: 4 }}>
        <InventoryTable 
          items={items} 
          onEdit={handleEdit} 
          onDelete={handleDelete} 
          setItems={setItems}
        />
      </Box>

      {/* Add/Edit Form Dialog */}
      <InventoryForm
        open={openForm}
        onClose={() => setOpenForm(false)}
        onSubmit={handleFormSubmit}
        editItem={editItem}
      />
    </Container>
  );
}

export default App;
