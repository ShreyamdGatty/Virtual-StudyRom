import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <div className="home-overlay"></div>
      <div className="home-content">
        <h1 className="home-title">Welcome to Virtual Study Rooms</h1>
        <p className="home-description" style={{ color: 'black' }}>
          Create or join study rooms, stay focused, and collaborate with others.
        </p>
        <div className="home-buttons">
          <Link to="Register" className="home-btn register-btn">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;


