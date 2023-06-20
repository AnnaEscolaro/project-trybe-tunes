import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import getMusics from '../../services/musicsAPI';
import loading from '../../loading';
import { AlbumType, SongType } from '../../types';
import MusicCard from './MusicCard';
import { getFavoriteSongs } from '../../services/favoriteSongsAPI';

function Album() {
  const [isLoading, setIsLoading] = useState(false);
  const [album, setAlbum] = useState<AlbumType>();
  const [songs, setSongs] = useState<SongType[]>([]);
  const [favoriteSongs, setFavoriteSongs] = useState<SongType[]>([]);
  const { id } = useParams();

  const fetchData = async () => {
    setIsLoading(true);
    await handleFavoriteSongs();
    const data = await getMusics(`${id}`);
    setIsLoading(false);
    setAlbum(data[0]);
    setSongs(data.filter((el, index) => (index !== 0)) as SongType[]);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleFavoriteSongs = async () => {
    const favSongs = await getFavoriteSongs();
    setFavoriteSongs(favSongs);
    console.log(favSongs);
  };

  if (isLoading) {
    return loading();
  }

  return (
    <>
      { album && (
        <>
          <h1 data-testid="artist-name">{ album.artistName }</h1>
          <h2 data-testid="album-name">{ album.collectionName }</h2>
        </>
      )}

      { songs.map((song) => (
        <MusicCard
          key={ song.trackId }
          previewUrl={ song.previewUrl }
          trackId={ song.trackId }
          trackName={ song.trackName }
          isFavorite={ favoriteSongs.some((favSong) => favSong.trackId === song.trackId) }
        />
      ))}
    </>
  );
}

export default Album;
