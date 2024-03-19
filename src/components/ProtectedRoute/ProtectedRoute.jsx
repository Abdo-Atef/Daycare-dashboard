import React from 'react'
import { Navigate } from 'react-router-dom';
export default function ProtectedRoute({children}) {
  
  const token = false;
  if (token) {
    return children
  }
  else{
    return <Navigate to='login' />
  }
}
