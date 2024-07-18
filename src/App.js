//import logo from './logo.svg';
import './App.css';
import Header from './components/Header'
//import Home from './components/Home';
import About from './components/About';
//import { FcAbout } from 'react-icons/fc';


function App() {
  return (
    <div className="App min-w-[100vw] min-h-[100vh]">
    <Header/>
     <About/>
    </div>
  );
}

export default App;
