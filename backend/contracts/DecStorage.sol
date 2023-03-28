// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract DecStorage {

    uint public fileCount;
    address payable public immutable contractOwnerAccount;

    // create a constructor
    constructor () {
        contractOwnerAccount = payable(msg.sender);
    }
    
    // struct to collect data
    struct File {
        uint id; // id of each file
        string filemetadata; // hash of ipfs.. consider using bytes
    }

    // file event
    event MyFile (uint id, string filemetadata, string status);


    //mapping of address and files that are in address
    mapping(uint => File) public files;

    // function to add file
    function addFile(string memory _filemetadata) public {

        // increment filecount
        fileCount += 1;
        // add file to storage
        files[fileCount] = File(fileCount, _filemetadata);
        // emit myFile
        emit MyFile(fileCount, _filemetadata, "file added");
    }

}