import React, { useContext } from 'react'
import { DecStorageContext } from '../DecContext'
import './allfiles.css'

const MyFiles = () => {

  const {decStorageContract, walletAccount, authorFIles, allFIles} = useContext(DecStorageContext)

  const my_files = allFIles.filter((address) => address.uploader_address.toLowerCase() == walletAccount.toLowerCase())

  console.log("my files", my_files);

      // console.log('uploader_address => ', file_metadata.uploader_address.toLowerCase());
      // console.log('wallet account => ', walletAccount);

  return (
    <main>
      <p>My Files</p>
    
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
            my_files ? 
            my_files.map((dataItem, index) => 
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

export default MyFiles