import './App.css';
import CombinedJokeDisplay from './CombinedJokeDisplay.js'
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <CombinedJokeDisplay/>
    </AuthProvider>
  );
}

export default App;
