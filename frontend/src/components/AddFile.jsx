import React, { useState } from 'react'
import { useContext } from 'react'
import { DecStorageContext } from '../DecContext'
import './addfile.css'
import axios from 'axios';

const AddFile = () => {

  const {decStorageContract, walletAccount} = useContext(DecStorageContext)

  const [fileUri, setFileUri] = useState(null)
  const [loading, setLoading] = useState(false)
  const [fileHashResult, setFileHashResult] = useState('');
  const [name, setName] = useState('')
  const [fileName, setFileName] = useState('');
  const [description, setDescription] = useState('')


 // get image file
 const PickFile = async (event) => {

  event.preventDefault()
  const selectedFile = event.target.files[0];
  setFileUri(selectedFile);

  if (fileUri)  {
      setLoading(true)
      console.log("file uri =>", fileUri);
      try {
          const formData = new FormData();
          formData.append("file", fileUri); 

          const uploadFileToIPFS = await axios({
              method: "post",
              url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
              data: formData,
              headers: {
                  "Content-Type": "multipart/form-data",
                  "Authorization": 'Bearer ' + process.env.REACT_APP_PINATA_API_JWT
              },
          });
          const file_hash = "https://gateway.pinata.cloud/ipfs/" + uploadFileToIPFS.data.IpfsHash
          console.log(uploadFileToIPFS.data.IpfsHash);
          console.log("hash => ", file_hash);
          setFileHashResult(file_hash)
          console.log("image hash => ", fileHashResult);  
          setLoading(false)  
      } catch (error) {
          console.log("Error sending File to IPFS: ")
          console.log(error.message, error.request, error.response)
          setLoading(false);
      }
  }
}

  const UploadFileMetaData = async(e) => {
    e.preventDefault()
    setLoading(true)
    if ( !name || !fileName || !fileHashResult || !description || !walletAccount) {

       alert("Input all fields")
       setLoading(false)
    } else {
      try {

        const file_data = JSON.stringify({
          "pinataOptions": {
            "cidVersion": 1
          },
          "pinataMetadata": {
            "name": "AgtToken",
            "keyvalues": {
              customeKey1: 'customValue1',
              customKey2: 'customValue2'
            }
          },
          "pinataContent": {
            'file_name': fileName,
            'file_uploader': name,
            'file_description': description,
            'file_ipfs_hash': fileHashResult,
            'uploader_address': walletAccount,  
            'date': new Date()
          }
        });

        console.log("data data => ", file_data);

        const config = {
          method: 'post',
          url: 'https://api.pinata.cloud/pinning/pinJSONToIPFS',
          headers: { 
            'Content-Type': 'application/json', 
            "Authorization": 'Bearer ' + process.env.REACT_APP_PINATA_API_JWT
          },
          data : file_data
        };
        
        const result = await axios(config);
        
        console.log("result data => ", result.data);
        
        const file_uri = "https://gateway.pinata.cloud/ipfs/" + result.data.IpfsHash;
        console.log("final file uri =>", file_uri);
        await decStorageContract.addFile( file_uri);   
        setLoading(false)     
      } catch (error) {
        alert(error)
        setLoading(false)
      }
    }
  }

  return (
    <>
      <div className='form'>
        <p>Add New File</p>
        <input type="text" placeholder='Name of uploader' onChange={(evt) => setName(evt.target.value)}/> <br />
        <input type="text" placeholder='File name' onChange={(evt) => setFileName(evt.target.value)}/> <br />
        <input type="file" onChange={PickFile}/> <br />
        <textarea name="description" id="description" cols="30" rows="10" placeholder='Description' onChange={(evt) => setDescription(evt.target.value)}></textarea>
        <button onClick={UploadFileMetaData}>Upload</button>
        {
          loading ? <div>Uploading file to IPFS</div> : ""
        }
      </div>
    </>
 
  )
}

export default AddFile