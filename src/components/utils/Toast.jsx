import React from 'react';
import { Toaster } from 'react-hot-toast';

function Toast() {
  return <Toaster position="bottom-center" toastOptions={{ duration: 2000 }} />;
}

export default Toast;
