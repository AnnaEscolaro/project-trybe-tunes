import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import loading from '../../loading';
import { getUser } from '../../services/userAPI';
import { UserType } from '../../types';

function Profile() {
  const [isLoading, setIsLoading] = useState(false);
  const [profileData, setProfileData] = useState<UserType>();

  const fetchData = async () => {
    setIsLoading(true);
    const userData = await getUser();
    setProfileData(userData);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (isLoading) {
    return loading();
  }

  return (
    <>
      <p>{profileData?.name}</p>
      <p>{profileData?.description}</p>
      <p>{profileData?.email}</p>
      <img
        data-testid="profile-image"
        src={ profileData?.image }
        alt={ profileData?.name }
      />
      <Link to="/profile/edit">Editar perfil</Link>
    </>
  );
}

export default Profile;
