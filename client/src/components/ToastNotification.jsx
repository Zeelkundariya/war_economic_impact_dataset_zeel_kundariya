import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { hideToast } from '../store/slices/uiSlice';

const ToastNotification = () => {
  const dispatch = useDispatch();
  const { open, message, severity } = useSelector((state) => state.ui.toast);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    dispatch(hideToast());
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={4000}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      className="z-50"
    >
      <Alert
        onClose={handleClose}
        severity={severity || 'info'}
        variant="filled"
        sx={{ 
          width: '100%',
          borderRadius: '12px',
          fontFamily: "'Outfit', 'Inter', sans-serif",
          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
        }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default ToastNotification;
