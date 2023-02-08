import { Link } from 'react-router-dom'

const Navbar = () => {
    return (  
        <nav className="navbar">
            <h1>SUPER BASED BALL </h1>
            <h2></h2>
            <div className="links">
                <Link to="/">Home</Link>
                <Link to="/play">Play</Link>
            </div>
        </nav>
    );
}
 
export default Navbar;