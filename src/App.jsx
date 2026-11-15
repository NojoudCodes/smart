import './App.css'
import { Route, Routes } from 'react-router'
import Navbar from './components/layout/Navbar'
import Home from './pages/Home'
import Search from './pages/Search'
import Profile from './pages/Profile'

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element= { <Home /> } />
        <Route path='/search' element= { <Search /> } />
        <Route path='/profile' element= { <Profile /> } />
      </Routes>
    </>
  )
}
