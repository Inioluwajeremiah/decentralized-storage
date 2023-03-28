import React, { useEffect, useState } from 'react'
import { ethers } from "ethers";
import { ContractABI, ContractAddress } from './ContractData';

export const DecStorageContext = React.createContext();

const blockProvider = new ethers.providers.Web3Provider(window.ethereum);

const signer = blockProvider.getSigner()
console.log("signer => ", signer);
// connect ABI using the Contract abstraction layer
const decStorageContract = new ethers.Contract(ContractAddress, ContractABI, signer);

const DecContext = ({children}) => {

  const [walletAccount, setwalletAccount] = useState('');
  const [loading, setLoading] = useState(false);
  // const [decStorageContract, setDecStorageContract] = useState(null);
  const [loadingFiles, setLoadingFIles] = useState(false)
  const [allFIles, setAllFiles] = useState([]);
  const [authorFIles, setAuthorFiles] = useState([])

  // connect wallet
  const connectWallet = async() => {
    setLoading(true)

    if (window.ethereum) {

      const blockProvider = new ethers.providers.Web3Provider(window.ethereum);
      const accounts = await blockProvider.send("eth_requestAccounts", [])
      const account = accounts[0]
      setwalletAccount(account)
      console.log("wall account => ",account);

      const signer = blockProvider.getSigner()
      console.log("signer => ", signer);
      // connect ABI using the Contract abstraction layer
      const decContract = new ethers.Contract(ContractAddress, ContractABI, signer);
      // setDecStorageContract(decContract);
      console.log(decContract);

      
    } else {
        
        alert("Install metamask to write to DecStorage")
      
    }

  }

  // get uploaded files
  const getAllFiles = async () =>  {   
    
    let filesArray = [];
    let authorFilesArray = [];

    setLoadingFIles(true)
    try {
      const fileCounter=  await decStorageContract.fileCount();

      const fileCount = fileCounter.toString();
    
      console.log("file count", fileCount);

      for (let i = 1; i <= fileCount; i++) {
          console.log("index ", i);
          const file = await decStorageContract.files(i);
          console.log("file => ", file);
  
          const response = await fetch(file.filemetadata);
          const file_metadata = await response.json();
          
          let filedata = {
              id: file.id,
              file_name: file_metadata.file_name,
              file_uploader: file_metadata.uploader,
              file_description: file_metadata.file_description,
              file_ipfs_hash: file_metadata.file_ipfs_hash,
              uploader_address: file_metadata.uploader_address,
              date: file_metadata.date,
          }
          // save all files
          filesArray.push(filedata)
          // get articles posted by the author
          if (file_metadata.uploader_address.toLowerCase() == walletAccount.toLowerCase()) authorFilesArray.push(filedata);
          console.log('uploader_address => ', file_metadata.uploader_address.toLowerCase());
          console.log('wallet account => ', walletAccount);
          
        }
        
        setAllFiles(filesArray);
        setAuthorFiles(authorFilesArray)
        setLoadingFIles(false)
      
        
       
    } catch (error) {
        alert(error) 
        setLoadingFIles(false) 
    }
}

  useEffect( () => {
    connectWallet()
    getAllFiles()
  }, [])

  return (
    <DecStorageContext.Provider
      value = {{loading, loadingFiles, connectWallet, walletAccount, decStorageContract, getAllFiles, allFIles, authorFIles}}
    >
      {children}
    </DecStorageContext.Provider>
  )
}

export default DecContext