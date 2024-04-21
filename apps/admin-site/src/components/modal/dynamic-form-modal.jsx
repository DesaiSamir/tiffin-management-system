import PropTypes from 'prop-types';
import React, { useState } from 'react';

import { Box, Modal, Button, MenuItem, TextField } from '@mui/material';

const DynamicFormModal = ({ isOpen, onClose, formFields = [], onSubmit }) => {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});

  const handleChange = (field) => (event) => {
    setFormData({ ...formData, [field.name]: event.target.value });
    // Clear the error message when the field value changes
    setErrors({ ...errors, [field.name]: '' });
  };

  const handleSubmit = () => {
    // Validate form fields before submission
    const newErrors = {};
    formFields.forEach((field) => {
      if (field.required && !formData[field.name]) {
        newErrors[field.name] = `${field.label} is required`;
      }
    });
    // If there are errors, prevent form submission
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // If no errors, submit the form data
    onSubmit(formData);
    setFormData({});
    onClose();
  };

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          borderRadius: 4,
          boxShadow: 24,
          p: 4,
        }}
      >
        <div>
          <h2>Add New Item</h2>
          {formFields.map((field) => (
            <TextField
              key={field.name}
              id={field.name}
              name={field.name}
              label={field.label}
              select={field.select}
              value={formData[field.name] || ''}
              onChange={handleChange(field)}
              fullWidth
              margin="normal"
              error={!!errors[field.name]}
              helperText={errors[field.name]}
              required={field.required}
            >
              {field.select &&
                field.options.map((itemType) => (
                  <MenuItem key={itemType.id} value={itemType.id}>
                    {`${itemType.name} - ${itemType.quantity} - $${itemType.price}`}
                  </MenuItem>
                ))}
            </TextField>
          ))}
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Save
          </Button>
        </div>
      </Box>
    </Modal>
  );
};

DynamicFormModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  formFields: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      select: PropTypes.bool.isRequired,
      options: PropTypes.array,
      required: PropTypes.bool.isRequired,
    })
  ),
  onSubmit: PropTypes.func.isRequired,
};

export default DynamicFormModal;
