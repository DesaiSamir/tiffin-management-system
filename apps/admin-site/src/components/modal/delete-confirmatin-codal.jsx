import PropTypes from 'prop-types';

import {
  Button,
  Dialog,
  Typography,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
} from '@mui/material';

const DeleteConfirmationModal = ({ isOpen, onClose, deletedItems, onDelete }) => {

  const handleClose = () => {
    onClose();
  };

  const handleConfirm = () => {
    onDelete();
    handleClose();
  };

  return (
    <Dialog open={isOpen} onClose={handleClose}>
      <DialogTitle>Delete Confirmation</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete the following items?
        </DialogContentText>
        {deletedItems.map((item) => (
          <Typography key={item.id} variant="body2">
            {item.name}
          </Typography>
        ))}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleConfirm} color="error">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

DeleteConfirmationModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  deletedItems: PropTypes.array.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default DeleteConfirmationModal;
