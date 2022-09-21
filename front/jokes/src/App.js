import './App.css';
import CombinedJokeDisplay from './components/CombinedJokeDisplay.js'
import { AuthProvider } from "./context/AuthContext";
import { Outlet, Route, Routes } from "react-router-dom";
import Register from './components/Register';
import Login from './components/Login';
import PrivateRoute from './utils/PrivateRoute';
import Navbar from './components/Navbar.js';

import { JokeDisplay, SingleJokeDisplay} from './components/JokeDisplay';

function App() {
  return (

    <AuthProvider>
        <Navbar/>
        <div id="content">
          <Routes>

            <Route element={<PrivateRoute/>} path="/jokes">
              <Route path='/jokes' element={<Outlet/>}>
                <Route path=":pk" element={ <SingleJokeDisplay /> } />
                <Route path="" element={ <JokeDisplay /> } />
              </Route>
            </Route>

            <Route element={<Login/>} path="/login" />
            <Route element={<Register/>} path="/register" />
            <Route element={<CombinedJokeDisplay/>} path="/" />
          </Routes>
        </div>
    </AuthProvider>
  );
}

export default App;
