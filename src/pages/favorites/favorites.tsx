import { useState, useEffect } from 'react';
import { getFavoriteSongs } from '../../services/favoriteSongsAPI';
import { SongType } from '../../types';
import loading from '../../loading';
import MusicCard from '../album/MusicCard';

function Favorites() {
  const [isLoading, setIsLoading] = useState(true);
  const [favoritedSongs, setFavoritedSongs] = useState<SongType[]>([]);
  //   const [statusFavorite, setStatusFavorite] = useState(true);

  const handleFavoriteSongs = async () => {
    setIsLoading(true);
    const favSongs = await getFavoriteSongs();
    setFavoritedSongs(favSongs);
    setIsLoading(false);
  };

  useEffect(() => {
    if (favoritedSongs.length === 0) {
      handleFavoriteSongs();
    }
  });

  if (isLoading) {
    return loading();
  }

  console.log(favoritedSongs);

  return (
    <>
      { favoritedSongs.map((song) => (
        <MusicCard
          key={ song.trackId }
          previewUrl={ song.previewUrl }
          trackId={ song.trackId }
          trackName={ song.trackName }
          isFavorite={ favoritedSongs.some((el) => el.trackId === song.trackId) }
          reloadSongsFn={ () => handleFavoriteSongs() }
        />
      ))}
    </>
  );
}

export default Favorites;
