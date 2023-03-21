import { Link } from 'react-router-dom'

const Navbar = () => {
    return (  
        <div className="navbar">
            <Link to="/about"><h1 className="nav-element">About Us</h1></Link>
            <Link to="/"><h1 className="nav-element">Super BasedBall Evolved</h1></Link>
            <Link to="/menu"><h1 className="nav-element">Play Now</h1></Link>
        </div>
    );
}
export default Navbar;