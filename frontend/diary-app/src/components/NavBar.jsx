import { Link } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { useLogout } from "../hooks/useLogout.js";

const NavBar = () => {
    const { user } = useAuthContext();
    const { logout } = useLogout();

    return (
        <header>
            {!user && (
                <nav>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                    </ul>
                </nav>
            )}

<span className="center-title">Entangled</span>

            {user ? (
                <div className="user-info">
                    <span className="user-email">{user.email}</span>
                    <button onClick={logout}>Logout</button>
                </div>
            ) : (
                <div className="auth-links">
                    <Link to="/login">Login</Link>
                    <Link to="/signup">Signup</Link>
                </div>
            )}
        </header>
    );
};

export default NavBar;
