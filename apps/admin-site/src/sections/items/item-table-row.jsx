/* eslint-disable import/no-unresolved */
import { useState } from 'react';
import PropTypes from 'prop-types';

import {
  Stack,
  TableRow,
  MenuItem,
  Checkbox,
  TableCell,
  TextField,
  Typography,
  IconButton,
} from '@mui/material';

import Iconify from 'src/components/iconify';

export default function ItemTableRow({
  row,
  selected,
  handleClick,
  onSaveChanges,
  itemTypes = [],
  setDirty
}) {
  const [editedRow, setEditedRow] = useState({ ...row });
  const [isEditing, setIsEditing] = useState(false);
  const [errors, setErrors] = useState({});

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setEditedRow(row);
    setIsEditing(false);
  };

  const handleSave = () => {
    // Validate form fields before saving changes
    const newErrors = {};
    if (!editedRow.name) {
      newErrors.name = 'Name is required';
    }
    if (!editedRow.price) {
      newErrors.price = 'Price is required';
    }
    if (!editedRow.itemTypeId) {
      newErrors.itemTypeId = 'Item Type is required';
    }

    // If there are errors, prevent saving changes
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // If no errors, proceed with saving changes
    onSaveChanges(editedRow);
    setIsEditing(false);
    setDirty();
    // Additional logic for saving changes...
  };

  const handleChange = (prop) => (event) => {
    setEditedRow({ ...editedRow, [prop]: event.target.value });
    // Clear the error message when the field value changes
    setErrors({ ...errors, [prop]: '' });
  };

  const getItemType = () => {
    let result = {
      name: ''
    };
    if (row?.itemTypeId === editedRow?.itemTypeId) {
      result = itemTypes.find((itemType) => itemType.id === row?.itemTypeId)
    } else {
      result = itemTypes.find((itemType) => itemType.id === editedRow?.itemTypeId)
    }
    result = result ? `${result.name} - ${result.quantity} - $${result.price}` : '';
    return result;
  }

  return (
    <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox
            disableRipple
            id={editedRow.name}
            name={editedRow.name}
            checked={selected}
            onChange={handleClick} />
        </TableCell>

        <TableCell component="th" scope="row" padding="none">
          {isEditing ? (
            <TextField
              fullWidth
              id={editedRow.name}
              name={editedRow.name}
              value={editedRow.name}
              onChange={handleChange('name')}
              error={!!errors.name}
              helperText={errors.name}
              required
            />
          ) : (
            <Stack direction="row" alignItems="center" spacing={2}>
              <Typography variant="subtitle2" noWrap>
                {row.name === editedRow.name ? row.name : editedRow.name}
              </Typography>
            </Stack>
          )}
        </TableCell>

        <TableCell>
          {isEditing ? (
            <TextField
              fullWidth
              id={editedRow.name}
              name={editedRow.name}
              value={editedRow.price}
              onChange={handleChange('price')}
              error={!!errors.price}
              helperText={errors.price}
              required
            />
        ) : (
          <Stack direction="row" alignItems="center" spacing={2}>
            <Typography variant="subtitle2" noWrap>
              {`$${parseFloat(row.price === editedRow.price ? row.price : editedRow.price).toFixed(2)}`}
            </Typography>
          </Stack>
          )}
        </TableCell>

        <TableCell>
          {isEditing ? (
            <TextField
              select
              fullWidth
              id={editedRow.name}
              name={editedRow.name}
              value={editedRow.itemTypeId ? editedRow.itemTypeId : ''}
              onChange={handleChange('itemTypeId')}
              error={!!errors.itemTypeId}
              helperText={errors.itemTypeId}
              required
            >
              {itemTypes.map((itemType) => (
                <MenuItem key={itemType.id} value={itemType.id}>
                  {`${itemType.name} - ${itemType.quantity} - $${itemType.price}`}
                </MenuItem>
              ))}
            </TextField>
          ) : (
            <Stack direction="row" alignItems="center" spacing={2}>
              <Typography variant="subtitle2" noWrap>
                {getItemType()}
              </Typography>
            </Stack>
          )}
        </TableCell>

        <TableCell align="right">
          {isEditing ? (
            <>
              <IconButton onClick={handleSave}>
                <Iconify icon="eva:save-fill" sx={{ mr: 2 }} />
              </IconButton>
              <IconButton onClick={handleCancel}>
                <Iconify icon="eva:close-fill" sx={{ mr: 2 }} />
              </IconButton>
            </>
          ) : (
            <IconButton onClick={handleEdit}>
              <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
            </IconButton>
          )}
        </TableCell>
      </TableRow>
  );
}

ItemTableRow.propTypes = {
  row: PropTypes.any,
  handleClick: PropTypes.func,
  onSaveChanges: PropTypes.func,
  itemTypes: PropTypes.array,
  selected: PropTypes.any,
  setDirty: PropTypes.any,
};
