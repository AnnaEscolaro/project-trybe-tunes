import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { createUser } from '../../services/userAPI';
import loading from '../../loading';

function Login() {
  const [username, setUsername] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setUsername(event.target.value);
  };

  const handleClick = async (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    setIsLoading(true);
    await createUser({ name: username });
    setIsLoading(false);
    navigate('/search');
  };

  if (isLoading) {
    return loading();
  }

  return (
    <form>
      <label>
        Name:
        <input type="text" data-testid="login-name-input" onChange={ handleChange } />
      </label>
      <button
        disabled={ username.length < 3 }
        data-testid="login-submit-button"
        onClick={ handleClick }
      >
        Entrar
      </button>
    </form>
  );
}

export default Login;
