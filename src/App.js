/* eslint-disable no-unused-vars */
import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
} from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import { Button, Container } from 'reactstrap';
import Home from './pages/Home';
import SearchedModelBoard from './pages/SearchedModelBoard';
import SearchedModelDetail from './pages/SearchedModelDetail';
import ArticlesSection from './pages/SearchedModelBoard/Contents/ArticlesSection/ArticlesSection';
import { useEffect } from 'react';

const App = () => {

  const PageNotFoundError = () => {
    return (
      <div>
        <h1 className='mb-1'>Page Not Found</h1>
        <p className='mb-2'>The page you are looking for could not be found.</p>
        <p><Link to="/">Home</Link></p>
      </div>
    )
  }

  return (
    <div className="App">

      <Container fluid>
        <BrowserRouter>
          <Link to="/"><Button className='px-1 py-0' color='primary'>Home</Button></Link>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/searched-model-view' element={<SearchedModelBoard />} />
            <Route path='/articles-list' element={<ArticlesSection />} />
            <Route path='/searched-model-detail' element={<SearchedModelDetail />} />
            <Route path='*' element={PageNotFoundError()} />
          </Routes>
        </BrowserRouter>

      </Container>

      {/* --------- */}
      <ToastContainer />
    </div>
  );
}

export default App;
