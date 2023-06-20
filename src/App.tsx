import { Route, Routes } from 'react-router-dom';
import Login from './pages/login';
import Search from './pages/search/search';
import Album from './pages/album/album';
import Layout from './components/Layout';
import Favorites from './pages/favorites/favorites';
import Profile from './pages/profile/profile';
import ProfileEdit from './pages/profile/profile-edit';

function App() {
  return (
    <>
      <p>Trybetunes</p>
      <Routes>
        <Route index element={ <Login /> } />
        <Route path="/" element={ <Layout /> }>
          <Route path="/search" element={ <Search /> } />
          <Route path="/album/:id" element={ <Album /> } />
          <Route path="/favorites" element={ <Favorites /> } />
          <Route path="/profile" element={ <Profile /> } />
          <Route path="/profile/edit" element={ <ProfileEdit /> } />
          {/* <Route path="/*" element={ <NotFound /> } /> */}
        </Route>
      </Routes>
    </>
  );
}

export default App;
