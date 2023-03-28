import { all } from 'axios'
import React from 'react'
import { useContext } from 'react'
import { DecStorageContext } from '../DecContext'
import './allfiles.css'
import axios from 'axios';
import { Buffer } from 'buffer';

// @ts-ignore
window.Buffer = Buffer;

const AllFiles = () => {

  const {decStorageContract, walletAccount, allFIles} = useContext(DecStorageContext);

  const downLoadFIle = (ipfs_hash) => {
    axios.get(ipfs_hash, {responseType: 'arraybuffer'})
  .then(response => {
    const fileContents = Buffer.from(response.data)
    console.log(fileContents)
    // Do something with the file contents
  })
  .catch(error => {
    console.error(error)
  })
  }

  console.log(allFIles);
  return (
    <main>
      <p>All Files</p>
      <table className='table'>
        <thead>
          <tr>
            <td>S/N</td>
            <td>File name</td>
            <td>Uploader name</td>
            <td>Description</td>
            <td>Uploader address</td>
            <td>Date uploaded</td>
            <td>Download</td>
          </tr>
        </thead>
        <tbody>
          {
            allFIles ? 
            allFIles.map((dataItem, index) => 
              <tr key={index}>
                <td>{index}</td>
                <td>{dataItem.file_name}</td>
                <td>{dataItem.file_uploader}</td>
                <td>{dataItem.file_description}</td>
                <td>{dataItem.uploader_address}</td>
                <td>{dataItem.date}</td>
                <td> <a className='btn' href={dataItem.file_ipfs_hash} download>Download</a></td>
                {/* onClick={() => downLoadFIle(dataItem.file_ipfs_hash)} */}
              </tr>
            ) : "You have not uploaded any file"
          }
        </tbody>
      </table>
    </main>
    
  )
}

export default AllFiles