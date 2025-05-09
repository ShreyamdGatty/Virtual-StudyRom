import { Link } from 'react-router-dom';

const NavbarDashboard = () => {
  return (
    <nav style={{ padding: '1rem', background: '#ddd' }}>
      <Link to="/TimeTable" style={{ marginRight: '1rem' }}>Study Room</Link>
      <Link to="/videoroom" style={{ marginRight: '1rem' }}>Video Room</Link>
      <Link to= "/Notes">Notes</Link>
    </nav>
  );
};

export default NavbarDashboard;
