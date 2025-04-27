import { ethers } from 'ethers';
import AditiTokenABI from '../abi/AditiTokenABI.json';

const contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS;

export const getContract = (providerOrSigner) => {
  return new ethers.Contract(contractAddress, AditiTokenABI, providerOrSigner);
};
