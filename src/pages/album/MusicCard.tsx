import { useEffect, useState } from 'react';
// import { SongType } from '../../types';
import emptyHeart from '../../images/empty_heart.png';
import fullHeart from '../../images/checked_heart.png';
import { addSong, removeSong } from '../../services/favoriteSongsAPI';

function MusicCard(props: any) {
  const { trackName, previewUrl, trackId, isFavorite, reloadSongsFn } = props;
  const [checkBox, setCheckBox] = useState(isFavorite);

  //   useEffect(() => {
  //     const handleFavoriteSong = async () => {
  //     //   if (checkBox && !isFavorite) {
  //     //     const addData = await addSong({ trackId, trackName, previewUrl });
  //     //     return addData;
  //     //   }
  //     //   await removeSong({ trackId, trackName, previewUrl });
  //     //   await removeFavorite();
  //     };
  //     console.log(checkBox, 'before handleFavSong');
  //     handleFavoriteSong();
  //   }, [checkBox, previewUrl, trackId, trackName]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!checkBox) {
      setCheckBox(event.target.checked);
      addSong({ trackId, trackName, previewUrl });
    } else {
      setCheckBox(false);
      removeSong({ trackId, trackName, previewUrl });
      if (reloadSongsFn) reloadSongsFn();
    }
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
          checkBox
            ? <img src={ fullHeart } alt="favorite" />
            : <img src={ emptyHeart } alt="favorite" />
        }
        <input
          type="checkbox"
          defaultChecked={ checkBox }
          onChange={ handleChange }
        />
      </label>
    </div>
  );
}

export default MusicCard;
