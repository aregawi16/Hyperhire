import { useAuth } from './AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

const LogoutButton = () => {
    const { isLoggedIn, logout } = useAuth();

    if (!isLoggedIn) return null;

    return (
        <button onClick={logout} style={{ border: 'none', background: 'none', cursor: 'pointer' }}>
            <FontAwesomeIcon icon={faSignOutAlt} /> Logout
        </button>
    );
};
export default LogoutButton