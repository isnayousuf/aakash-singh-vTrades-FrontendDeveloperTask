
interface ProfileDetailProps {
  firstName: string,
  userEmail: string,
  onLogout: () => void;
}

const ProfileDetailsPopup = ( {firstName, userEmail, onLogout}:ProfileDetailProps ) => {
  
 
  return (
    <div className="profile-menu-container">
            <div className="d-flex flex-col gap-6">
                <p><strong>{firstName}</strong></p>
                <p>{userEmail}</p>
            </div>
            <button onClick={onLogout} className="logout-button">
              Logout
            </button>
    </div>
  );
};

export default ProfileDetailsPopup;

