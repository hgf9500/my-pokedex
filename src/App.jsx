import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Main from './pages/Main';
import Detail from './pages/Detail';
import Search from './pages/Search';
import Favorites from './pages/Favorites';

function App() {
  return (
    // 1. Router가 전체 앱을 감싸서 라우팅 기능을 활성화합니다.
    <Router>
      <div className="min-h-screen bg-gray-100 font-sans">
        {/* 2. 모든 페이지에 공통으로 보일 헤더 (네비게이션) */}
        <header className="bg-red-600 text-white shadow-md">
          <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
            <Link to="/" className="text-2xl font-bold">포켓몬 도감</Link>
            <div className="space-x-4">
              <Link to="/" className="hover:text-yellow-300">홈</Link>
              <Link to="/search" className="hover:text-yellow-300">검색</Link>
              <Link to="/favorites" className="hover:text-yellow-300">찜목록</Link>
            </div>
          </nav>
        </header>

        {/* 3. 주소 경로에 따라 이 부분의 내용만 바뀝니다. */}
        <main className="container mx-auto p-6">
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/pokemon/:pokemonId" element={<Detail />} />
            <Route path="/search" element={<Search />} />
            <Route path="/favorites"element={<Favorites />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;

