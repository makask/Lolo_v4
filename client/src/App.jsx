import Navbar from './components/Navbar';
import "./App.css";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Main from './components/Main';

import AppContextProvider from './context/AppContext';

function App(){
  return(
    <div>
    <AppContextProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Main />} />
        </Routes>
      </Router>
    </AppContextProvider>
    </div>
  );
}

export default App
