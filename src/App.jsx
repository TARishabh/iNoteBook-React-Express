import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import About from './components/About';
import Home from './components/Home';
import NoteState from './context/notes/NoteState';
import UserState from './context/notes/user/UserState';
import Alert from './components/Alert';
import Login from './components/Login';
import Register from './components/Register';
import UserDetails from './components/UserDetails';


function App() {
  const [alert, updatedAlert] = useState(null);
  const SetAlert = (message, type) => {
    updatedAlert({
      message: message,
      type: type
    })

    setTimeout(() => {
      updatedAlert(null);
    }, 1000);
  }
  return (
    <NoteState>
      <UserState>
        <Router>
          <Navbar></Navbar>
          <Alert alert={alert}></Alert>
          <Routes>
            <Route exact path="/" element={<Home SetAlert={SetAlert} />} />
            <Route exact path="/about" element={<About />} />
            <Route exact path="/login" element={<Login SetAlert={SetAlert} />} />
            <Route exact path="/register" element={<Register SetAlert={SetAlert} />} />
            <Route exact path="/userdetails" element={<UserDetails SetAlert={SetAlert} />} />
          </Routes>
        </Router>
      </UserState>
    </NoteState>
  )
}

export default App
