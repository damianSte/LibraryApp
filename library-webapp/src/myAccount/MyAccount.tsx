import React, { useEffect, useState } from 'react';
import MenuAppBar from '../menu-app-bar/MenuAppBar';
import { Box, Grid, Typography, Paper, Button } from '@mui/material';
import { useApi } from '../api/ApiProvider';
import { getUserLoansDto } from '../api/loan.dto';
import LoanComponent from '../api/loans-form/LoanComponent';

export default function MyAccount() {
  return <LoanComponent></LoanComponent>;
}
