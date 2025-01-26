import React, { useState } from 'react';

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  IconButton,
  Button,
  Stack,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

const InventoryTable = ({ items, onEdit, onDelete, setItems }) => {
  const [filterCategory, setFilterCategory] = useState('All');
  const [sortOrder, setSortOrder] = useState(null); // 'asc' or 'desc'

  // Get unique categories from items
  const categories = ['All', ...new Set(items.map((item) => item.category))];

  // Handle filter by category
  const handleFilterChange = (e) => {
    setFilterCategory(e.target.value);
  };

  // Filtered items based on selected category
  const filteredItems = filterCategory === 'All'
    ? items
    : items.filter((item) => item.category === filterCategory);

  // Handle sort by quantity
  const handleSort = () => {
    let newOrder = null;
    if (!sortOrder) {
      newOrder = 'asc';
    } else if (sortOrder === 'asc') {
      newOrder = 'desc';
    } else {
      newOrder = null;
    }
    setSortOrder(newOrder);

    if (newOrder) {
      const sorted = [...filteredItems].sort((a, b) => {
        if (newOrder === 'asc') return a.quantity - b.quantity;
        return b.quantity - a.quantity;
      });
      setItems(sorted);
    } else {
      // If user toggles sort to null, do no sorting
      // (In a real app, you might revert to original order or keep last sorted state.)
    }
  };

  return (
    <Paper>
      <Stack direction="row" spacing={2} sx={{ p: 2, alignItems: 'center' }}>
        {/* Category Filter */}
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel id="category-filter-label">Category</InputLabel>
          <Select
            labelId="category-filter-label"
            value={filterCategory}
            label="Category"
            onChange={handleFilterChange}
          >
            {categories.map((cat, index) => (
              <MenuItem key={index} value={cat}>
                {cat}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Sort by Quantity Button */}
        <Button variant="outlined" onClick={handleSort}>
          Sort by Quantity
          {sortOrder === 'asc' && <ArrowUpwardIcon fontSize="small" sx={{ ml: 1 }} />}
          {sortOrder === 'desc' && <ArrowDownwardIcon fontSize="small" sx={{ ml: 1 }} />}
        </Button>
      </Stack>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Item Name</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {filteredItems.map((item) => (
              <TableRow
                key={item.id}
                sx={{
                  backgroundColor: item.quantity < 10 ? 'rgba(255, 230, 230, 0.7)' : 'inherit',
                }}
              >
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.category}</TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell align="right">
                  <IconButton
                    color="primary"
                    onClick={() => onEdit(item)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => onDelete(item.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}

            {filteredItems.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  No items found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default InventoryTable;
