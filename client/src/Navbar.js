import { Link } from 'react-router-dom'

const Navbar = () => {
    return (  
        <div className="navbar">
            <Link className='mx-auto d-block'  to="/"><img src="/img/LOGOTEST.png" alt="test logo" /></Link>
        </div>
    );
}
export default Navbar;