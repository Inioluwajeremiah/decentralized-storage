
import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddFile from './AddFile'
import AllFiles from './AllFiles'
import { Header } from './Header'
import MyFiles from './MyFiles'

const AllRoutes = () => {
  return (
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path='/' element={<MyFiles />}  />
        <Route path='allfiles' element={<AllFiles />}  />
        <Route path='addfile' element={<AddFile />}  />
      </Routes>
    </BrowserRouter>
  )
}

export default AllRoutes