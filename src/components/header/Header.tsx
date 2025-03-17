import './Header.scss';
import { FaUserCircle, FaSignOutAlt } from 'react-icons/fa';
import { useAppDispatch, useAppSelector } from '../../app/reduxHooks';
import { logOutUser } from '../../app/slices/authSlice';
import { Link } from 'react-router-dom';
import appLogo from "../../assets/common/crypto_logo.jpg";

const tabs = [
  {title: "All Coins Live", path: "/home"},
  {title: "My Wallet", path: "/wallet"}
]
const Header = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.userState.user);
  const fullName = (user?.name?.first || "") + " " + (user?.name?.last || "");

  const handleLogout = () => {
    const isConfirm = window.confirm("you will be loggedout!")
    if (isConfirm) {
      dispatch(logOutUser());
    }
  }
  return (
    <div className="crypto-header">
      <div className="crypto-header-left">
        <img src={appLogo} className='logo' />
        <div className='text'>
          <h3>Crypto Attack</h3>
          <h3>*VISFORTECH*</h3>
        </div>
      </div>

      <div className='crypto-header-middle'>
          {tabs.map((ele, idx: number) => <div className="tab" key={idx}>
            <Link to={ele.path}> {ele.title} </Link>
          </div> )}
      </div>

      <div className="crypto-header-right">
        <div>
          <FaUserCircle className="user-avatar" />
        </div>
        <div className='user-name'>
          <span>{user?.name?.first || fullName}</span>
        </div>
        <FaSignOutAlt className="header-icon" onClick={handleLogout} title="Logout" />
      </div>
    </div>
  );
};

export default Header;
