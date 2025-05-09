import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import NavbarDashboard from './components/NavbarDashboard';
import NavbarInitial from './components/NavbarInitial';
import Home from './pages/Home';
import Register from './pages/Register';


import StudyRoom from './pages/Timetable';
import VideoRoom from './pages/VideoRoom';
import Notes from './pages/Notes';

const AppContent = () => {
  const location = useLocation();

  // Show different navbar based on the page
  const showInitialNavbar = location.pathname === '/' || location.pathname === '/register';

  return (
    <>
      {showInitialNavbar ? <NavbarInitial /> : <NavbarDashboard />}
      <Routes>
  <Route path="/" element={<Home />} />
  <Route path="/Register" element={<Register />}/>
  <Route path="/studyroom" element={<StudyRoom />} />
  <Route path="/videoroom" element={<VideoRoom />} />
  <Route path="/Notes" element={<Notes />} />
  
</Routes>

    </>
  );
};

const App = () => (
  <Router>
    <AppContent />
  </Router>
);

export default App;



