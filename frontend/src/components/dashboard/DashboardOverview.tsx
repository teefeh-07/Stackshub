<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
  const [balance, setBalance] = useState('0');
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchBalance = async () => {
=======
=======
>>>>>>> de3c4be8ce32138b2dae7ef32a4cfe3d9d6e027d
=======
>>>>>>> de3c4be8ce32138b2dae7ef32a4cfe3d9d6e027d
import React, { useState, useEffect } from 'react';
import { useStacks } from '../../providers/StacksProvider';
import { formatBalance } from '../../utils/formatters';
export default function DashboardOverview() {
  const { userData, userSession } = useStacks();
<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> de3c4be8ce32138b2dae7ef32a4cfe3d9d6e027d
      if (userData) {
        try {
          // Simulated fetch for robustness
          const res = await fetch(`https://api.mainnet.hiro.so/extended/v1/address/${userData.profile.stxAddress.mainnet}/balances`);
          const data = await res.json();
          setBalance(data.stx.balance);
        } catch (e) {
          console.error('Failed to fetch balance', e);
        } finally {
=======
>>>>>>> de3c4be8ce32138b2dae7ef32a4cfe3d9d6e027d
          setIsLoading(false);
        }
      }
    };
    fetchBalance();
  }, [userData]);
  if (!userData) return <div className='p-8 text-center text-gray-500'>Please connect your wallet to view the dashboard.</div>;
  return (
    <div className='bg-white shadow rounded-lg p-6'>
=======
>>>>>>> de3c4be8ce32138b2dae7ef32a4cfe3d9d6e027d
      <h2 className='text-3xl font-bold mb-4 text-gray-800'>Overview</h2>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
        <div className='bg-blue-50 p-4 rounded-lg border border-blue-100'>
          <p className='text-sm text-blue-600 font-medium'>Total STX Balance</p>
