import './App.css';
import CombinedJokeDisplay from './components/CombinedJokeDisplay.js'
import { AuthProvider } from "./context/AuthContext";
import { Route, Routes } from "react-router-dom";
import Register from './components/Register';
import Login from './components/Login';
import PrivateRoute from './utils/PrivateRoute';

import JokeDisplay from './components/JokeDisplay';

function App() {
  return (

    <AuthProvider>
      
        <Routes>
          <Route element={<PrivateRoute/>} path="/jokes">
            <Route path='/jokes' element={<JokeDisplay/>}/>
          </Route>
          <Route element={<Login/>} path="/login" />
          <Route element={<Register/>} path="/register" />
          <Route element={<CombinedJokeDisplay/>} path="/" />
        </Routes>
      
    </AuthProvider>
  );
}

export default App;
