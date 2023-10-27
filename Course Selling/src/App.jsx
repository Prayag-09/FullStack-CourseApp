import {BrowserRouter as Router,Routes,Route, BrowserRouter} from 'react-router-dom';
import SignUp from './SignUp';
import SignIn from './SignIn';
import AppBar from './AppBar';

function App() {
  return (
    <div style={{
      width:"100vw",
      backgroundColor:"#eeeeee"
    }}>

      <AppBar />
      
    <BrowserRouter>
      <Routes>

        <Route path="/signIn" element={<SignIn />} />
        <Route path="/signUp" element={<SignUp />} />

      </Routes>
    </BrowserRouter>
    </div>
  )
}

export default App;