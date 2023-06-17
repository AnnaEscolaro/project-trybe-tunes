import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import loading from '../loading';
import { getUser } from '../services/userAPI';

function Header() {
  const [userName, setUserName] = useState<string>();
  const [isLoading, setIsLoading] = useState(false);

  const getUserName = async () => {
    setIsLoading(true);
    const data = await getUser();
    setUserName(data.name);
    setIsLoading(false);
  };

  useEffect(() => {
    getUserName();
  }, []);

  if (isLoading) {
    return loading();
  }

  return (
    <header data-testid="header-component">
      <h1 data-testid="header-user-name">{userName}</h1>
      <NavLink to="/search" data-testid="link-to-search">Search</NavLink>
      <NavLink to="/favorites" data-testid="link-to-favorites">Favorites</NavLink>
      <NavLink to="/profile" data-testid="link-to-profile">Profile</NavLink>
    </header>
  );
}

export default Header;
