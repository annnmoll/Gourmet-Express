import './App.css';
import Home from './screens/Home';
import { Routes , Route } from 'react-router-dom';
import Login from './screens/Login';
import SignUp from './screens/SignUp';
import Cart from './screens/Cart';
import Otp from './screens/Otp';


function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route exact path='/login' element={<Login />} />
        <Route exact path='/signup' element={<SignUp />} />
        <Route exact path='/otp' element={<Otp />} />
        <Route exact path='/cart' element={<Cart />} />
      </Routes>
    </div>
  );
}

export default App;
