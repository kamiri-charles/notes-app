import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Notes from './components/Notes'
import SignIn from './components/Sign-in'
import 'boxicons/css/boxicons.min.css'
import './App.scss'


function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={ <Notes />} />
        <Route exact path="/sign-in" element={ <SignIn /> } />
      </Routes>
    </Router>
  );
}

export default App;
