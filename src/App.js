import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Notes from './components/Notes'
import Note from './components/Note'
import SignIn from './components/Sign-in'
import SignUp from './components/Sign-up'
import 'boxicons/css/boxicons.min.css'
import './App.scss'


function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={ <Notes />} />
        <Route exact path='/note/:noteId' element={ <Note /> } />
        <Route exact path="/sign-in" element={ <SignIn /> } />
        <Route exact path='/sign-up' element={ <SignUp /> } />
      </Routes>
    </Router>
  );
}

export default App;
