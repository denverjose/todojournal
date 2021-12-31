                            
import './App.css';
import AddTask from './pages/AddTask';
import Navbar from './pages/Navbar';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import axios from 'axios';
import ViewTask from './pages/ViewTask';
import EditTask from './pages/EditTask';
axios.defaults.baseURL = "http://localhost:8000/"

function App() {
  return (
    <div className="App">
      <Router>
      <Navbar/>
      <Routes>
        <Route exact path ="/tasks" element={<ViewTask/>}></Route>
        <Route exact path ="/addtask" element={<AddTask/>}></Route>
        <Route exact path ="/tasks/edittask/:id" element={<EditTask/>}></Route>
      </Routes>
      </Router>
      
    </div>
  );
}

export default App;