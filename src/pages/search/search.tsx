import { useState } from 'react';
import { Link } from 'react-router-dom';
import searchAlbumsAPI from '../../services/searchAlbumsAPI';
import loading from '../../loading';
import { AlbumType } from '../../types';

function Search() {
  const [artistName, setArtistName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [album, setAlbum] = useState<AlbumType[]>([]);
  const [haveSearched, setHaveSearched] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setArtistName(event.target.value);
    if (artistName.length === 0) {
      setHaveSearched(false);
    }
  };

  const handleClick = async (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    setIsLoading(true);
    const albums = await searchAlbumsAPI(artistName);
    // setArtistName('');
    setIsLoading(false);
    setAlbum(albums);
    setHaveSearched(true);
  };

  if (isLoading) {
    return loading();
  }

  return (
    <>
      <form>
        <label>
          <input
            type="text"
            data-testid="search-artist-input"
            onChange={ handleChange }
          />
        </label>
        <button
          disabled={ artistName.length < 2 }
          data-testid="search-artist-button"
          onClick={ handleClick }
        >
          Pesquisar
        </button>
      </form>
      { album.length > 0 && (
        <h2>
          {`Resultado de álbuns de: ${artistName}`}
        </h2>
      )}
      { album.map((item) => (
        <Link
          to={ `/album/${item.collectionId}` }
          key={ item.collectionId }
          data-testid={ `link-to-album-${item.collectionId}` }
        >
          <div>
            <p>{item.collectionName}</p>
            <p>{item.artistName}</p>
            <img src={ item.artworkUrl100 } alt={ item.collectionName } />
          </div>
        </Link>)) }
      { album.length === 0 && artistName.length > 0 && haveSearched && (
        <h2>
          Nenhum álbum foi encontrado
        </h2>
      )}
      {/* <h2>
        { `Resultado de álbuns de: ${artistName}` }
      </h2> */}
    </>
  );
}

export default Search;
