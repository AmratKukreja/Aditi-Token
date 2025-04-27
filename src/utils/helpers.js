// src/utils/helpers.js
import { ethers } from 'ethers';
import AditiTokenABI from '../abi/AditiTokenABI.json';

const contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS;

// Get provider (MetaMask)
export const getProvider = () => {
  if (!window.ethereum) throw new Error('MetaMask not found');
  return new ethers.BrowserProvider(window.ethereum); // For ethers v6
};

// Get signer (connected user)
export const getSigner = async () => {
  const provider = getProvider();
  return await provider.getSigner();
};

// Get contract instance
export const getContract = async () => {
  const signer = await getSigner();
  return new ethers.Contract(contractAddress, AditiTokenABI, signer);
};
