//import logo from './logo.svg';
import './App.css';
import Header from './components/Header'
import Home from './components/Home';
import About from './components/About';
import Login from './components/Login';
import Register from './components/Register';
import ToDo from './components/ToDo';
import { useDispatch} from "react-redux";
  
import { authActions } from "./storage/storage";
//import { FcAbout } from 'react-icons/fc';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import { useEffect } from 'react';


function App() {
  const dispatch=useDispatch();
  useEffect(()=>{
    const id=sessionStorage.getItem("id");
    if(id){
    dispatch(authActions.login())
    }
  })
  return (
    <div className="App min-w-[100vw] min-h-[100vh]">
     <Router>
      <Header/>
      <Routes>
        <Route exact path='/' element={<Home/>}/>
        <Route exact path='/about' element={<About/>}/>
        <Route exact path='/login' element={<Login/>}/>
        <Route exact path='/register' element={<Register/>}/>
        <Route exact path='/todo' element={<ToDo/>}/>
      </Routes>
      
     </Router>
    </div>
  );
}

export default App;
