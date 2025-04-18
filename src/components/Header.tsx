import { useState, useEffect, useRef } from 'react';
import ProfileDetailsPopup from './ProfileDetailsPopup';

interface HeaderProps {
  onLogout: () => void;  
  userEmail: string;
  profileIcon: string | undefined;
}

const Header = ({ onLogout,  userEmail, profileIcon }: HeaderProps) => {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const profileMenuRef = useRef<HTMLDivElement | null>(null);

  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
  };

  const firstName = userEmail ? userEmail.split('@')[0] : 'User';

  // Close the profile menu if clicked outside
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(e.target as Node)) {
        setIsProfileMenuOpen(false); 
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  return (
    <div className="header">
      <p className="logo">QuickShopper</p>
      <div className="profile-container">
        <div onClick={toggleProfileMenu} className="profile-icon-container">
          <img
            src={profileIcon}
            alt="User profile"
            style={{ width: '60px', borderRadius: '50%' }}
          />
        </div>

        {isProfileMenuOpen && (
          <div ref={profileMenuRef} className={`profile-menu ${isProfileMenuOpen ? 'open' : ''}`}>
            <ProfileDetailsPopup firstName={firstName} userEmail={userEmail} onLogout={onLogout} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;

