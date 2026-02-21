<<<<<<< HEAD
  const [balance, setBalance] = useState('0');
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchBalance = async () => {
=======
import React, { useState, useEffect } from 'react';
import { useStacks } from '../../providers/StacksProvider';
import { formatBalance } from '../../utils/formatters';
export default function DashboardOverview() {
  const { userData, userSession } = useStacks();
>>>>>>> de3c4be8ce32138b2dae7ef32a4cfe3d9d6e027d
      if (userData) {
