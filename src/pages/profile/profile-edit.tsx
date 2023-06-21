import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUser, updateUser } from '../../services/userAPI';
import loading from '../../loading';

function ProfileEdit() {
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const navigate = useNavigate();

  const fetchData = async () => {
    setIsLoading(true);
    const userData = await getUser();
    setName(userData.name);
    setEmail(userData.email);
    setDescription(userData.description);
    setImage(userData.image);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (isLoading) {
    return loading();
  }

  const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setName(event.target.value);
  };

  const handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setEmail(event.target.value);
  };

  const handleChangeDescription = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setDescription(event.target.value);
  };

  const handleChangeImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setImage(event.target.value);
  };

  const handleClick = async (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    setIsLoading(true);
    await updateUser({
      name,
      email,
      image,
      description,
    });
    setIsLoading(false);
    navigate('/profile');
  };

  const handleEnableDisable = () => {
    return !(name.length > 0
      && email.length > 0
      && email.split('').includes('@')
      && email.split('.').includes('com')
      && description.length > 0
      && image.length > 0);
  };

  return (
    <form>
      <input
        type="text"
        value={ name }
        placeholder={ name }
        data-testid="edit-input-name"
        onChange={ handleChangeName }
      />
      <input
        type="text"
        value={ email }
        placeholder={ email }
        data-testid="edit-input-email"
        onChange={ handleChangeEmail }
      />
      <input
        type="text"
        value={ description }
        placeholder={ description }
        data-testid="edit-input-description"
        onChange={ handleChangeDescription }
      />
      <input
        type="text"
        value={ image }
        placeholder={ image }
        data-testid="edit-input-image"
        onChange={ handleChangeImage }
      />
      <button
        data-testid="edit-button-save"
        onClick={ handleClick }
        disabled={ handleEnableDisable() }
      >
        Salvar
      </button>
    </form>
  );
}

export default ProfileEdit;
