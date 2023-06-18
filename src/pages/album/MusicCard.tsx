import { useState } from 'react';
import { SongType } from '../../types';
import emptyHeart from '../../images/empty_heart.png';
import fullHeart from '../../images/checked_heart.png';

function MusicCard(props: SongType) {
  const [checkBox, setCheckBox] = useState(false);
  const { trackName, previewUrl, trackId } = props;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCheckBox(event.target.checked);
  };

  console.log(checkBox);

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
          checkBox
            ? <img src={ fullHeart } alt="favorite" />
            : <img src={ emptyHeart } alt="favorite" />
        }
        <input
          type="checkbox"
          onChange={ handleChange }
        />
      </label>
    </div>
  );
}

export default MusicCard;
