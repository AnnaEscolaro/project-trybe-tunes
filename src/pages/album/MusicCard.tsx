import { useEffect, useState } from 'react';
import { SongType } from '../../types';
import emptyHeart from '../../images/empty_heart.png';
import fullHeart from '../../images/checked_heart.png';
import { addSong, removeSong } from '../../services/favoriteSongsAPI';

function MusicCard(props: SongType | any) {
  const [checkBox, setCheckBox] = useState(false);
  const { trackName, previewUrl, trackId, isFavorite } = props;

  useEffect(() => {
    const handleFavoriteSong = async () => {
      if (checkBox) {
        const addData = await addSong({ trackId, trackName, previewUrl });
        return addData;
      }
      const removeData = await removeSong({ trackId, trackName, previewUrl });
      return removeData;
    };
    handleFavoriteSong();
  }, [checkBox, previewUrl, trackId, trackName]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCheckBox(event.target.checked);
  };

  return (
    <div>
      <h3>{trackName}</h3>
      <audio data-testid="audio-component" src={ previewUrl } controls>
        <track kind="captions" />
        O seu navegador não suporta o elemento
        {' '}
        {' '}
        <code>audio</code>
        .
      </audio>
      <label data-testid={ `checkbox-music-${trackId}` }>
        {
          checkBox || isFavorite
            ? <img src={ fullHeart } alt="favorite" />
            : <img src={ emptyHeart } alt="favorite" />
        }
        <input
          type="checkbox"
          defaultChecked={ isFavorite }
          onChange={ handleChange }
        />
      </label>
    </div>
  );
}

export default MusicCard;
