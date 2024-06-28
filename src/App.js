import Register from './components/Register';
import Login from './components/Login';
import Home from './components/Home';
import Layout from './components/Layout';
import Editor from './components/Editor';
import Admin from './components/Admin';
import Missing from './components/Missing';
import Unauthorized from './components/Unauthorized';
import Lounge from './components/Lounge';
import LinkPage from './components/LinkPage';
import RequireAuth from './components/RequireAuth';
import PersistLogin from './components/PersistLogin';
import { Routes, Route } from 'react-router-dom';

import Login_old from './components/Login_old';
// import 'rsuite/dist/rsuite.min.css';
// import 'react-toastify/dist/ReactToastify.min.css';
// import 'react-datetime/css/react-datetime.css';
// import 'react-image-lightbox/style.css';
import Footer from './components/Footer';
// import NavbarTop from './components/NavbarTop';
import './assets/scss/theme-dark.scss';


import Datatest from './components/Datatest';
// import Schedulers from './components/Schedulers';

// import { init } from 'firebase/react-proj';
// import { init } from 'firebase';


const ROLES = {
  'User': 2001,
  'Editor': 1984,
  'Admin': 5150
}

function App() {

  return (
    <>
      {/* <NavbarTop/> */}
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* public routes */}
          <Route path="login" element={<Login />} />
          <Route path="loginold" element={<Login_old />} />
          <Route path="register" element={<Register />} />
          <Route path="linkpage" element={<LinkPage />} />
          <Route path="unauthorized" element={<Unauthorized />} />
          
          <Route path="datatest" element={<Datatest />} />
          {/* <Route path="schedulers" element={<Schedulers />} /> */}

          {/* we want to protect these routes */}
          <Route element={<PersistLogin />}>
            <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
              <Route path="/" element={<Home />} />
            </Route>

            <Route element={<RequireAuth allowedRoles={[ROLES.Editor]} />}>
              <Route path="editor" element={<Editor />} />
            </Route>


            <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
              <Route path="admin" element={<Admin />} />
            </Route>

            <Route element={<RequireAuth allowedRoles={[ROLES.Editor, ROLES.Admin]} />}>
              <Route path="lounge" element={<Lounge />} />
            </Route>
          </Route>

          {/* catch all */}
          <Route path="*" element={<Missing />} />
        </Route>
      </Routes>
      <Footer/>
    </>
  
  );
}

export default App;