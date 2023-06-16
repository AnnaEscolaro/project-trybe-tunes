import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import getMusics from '../../services/musicsAPI';
import loading from '../../loading';
import { AlbumType, SongType } from '../../types';
import MusicCard from './MusicCard';

function Album() {
  const [isLoading, setIsLoading] = useState(true);
  const [album, setAlbum] = useState<AlbumType>();
  const [songs, setSongs] = useState<SongType[]>([]);
  const { id } = useParams();

  const fetchData = async () => {
    const data = await getMusics(`${id}`);
    console.log(data);
    setIsLoading(false);
    setAlbum(data[0]);
    setSongs(data.filter((el, index) => (index !== 0)) as SongType[]);
  };

  useEffect(() => {
    if (!album && songs.length === 0) {
      fetchData();
    }
  });

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

      { songs.map((el) => (
        <MusicCard
          key={ el.trackId }
          previewUrl={ el.previewUrl }
          trackId={ el.trackId }
          trackName={ el.trackName }
        />
      ))}
    </>
  );
}

export default Album;
