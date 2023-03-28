import React from 'react'
import { useContext } from 'react';
import { Link } from "react-router-dom";
import { DecStorageContext } from '../DecContext';
import './header.css'
export const Header = () => {

  const {walletAccount, connectWallet} = useContext(DecStorageContext)
  return (
    <div className='header'>
        <div className='logo'>
            <p>STORAGE <span>BOX</span></p>
        </div>
        <ul className='menu-list'>
          <Link to="/addfile" className='menu-item'>Add File</Link>
          <Link to="/" className='menu-item'>My Files</Link>
          <Link to="/allfiles" className='menu-item'>All Files </Link>
          {walletAccount ? 
            <p style={{color:"#FFF"}}>{walletAccount.slice(0,5)}...{walletAccount.slice(walletAccount.length-5, walletAccount.length)}</p>
            : <p style={{border: '1px solid #fff'}} onClick={connectWallet}>Connect Wallet</p>
          }
        </ul>    
    </div>
  )
}
