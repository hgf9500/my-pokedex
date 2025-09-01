import React, { useState, Suspense, lazy, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';

const Main = lazy(() => import('./pages/Main'));
const Detail = lazy(() => import('./pages/Detail'));
const Search = lazy(() => import('./pages/Search'));
const Favorites = lazy(() => import('./pages/Favorites'));

// 검색창과 네비게이션을 위한 Layout 컴포넌트
const Layout = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  // 페이지 이동 시 검색창 초기화 (선택적)
  useEffect(() => {
    if (!location.pathname.startsWith('/search')) {
      setSearchTerm('');
    }
  }, [location]);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (value) {
      navigate(`/search?query=${value}`);
    } else {
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      <header className="bg-black text-white shadow-md sticky top-0 z-20 border-t-4 border-red-600">
        <nav className="container mx-auto px-6 py-4 flex flex-col sm:flex-row justify-between items-center">
          <Link to="/" className="text-3xl font-bold mb-2 sm:mb-0">포켓몬 도감</Link>
          <div className="flex items-center space-x-4">
            <input
              type="text"
              placeholder="포켓몬 검색..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-48 p-2 rounded-md text-black"
            />
            <Link to="/" className="hover:text-yellow-300 transition">홈</Link>
            <Link to="/favorites" className="hover:text-yellow-300 transition">찜목록</Link>
          </div>
        </nav>
      </header>
      <main className="container mx-auto p-6">
        {children}
      </main>
    </div>
  );
};

function App() {
  return (
    <Router>
      <Layout>
        <Suspense fallback={<div className="text-center mt-10 text-xl font-bold">페이지를 불러오는 중입니다...</div>}>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/pokemon/:pokemonId" element={<Detail />} />
            <Route path="/search" element={<Search />} />
            <Route path="/favorites" element={<Favorites />} />
          </Routes>
        </Suspense>
      </Layout>
    </Router>
  );
}

export default App;

