import { Route, Routes } from "react-router-dom";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Main from "./pages/Main";
import MovieDetail from "./pages/MovieDetail";
import MovieList from "./pages/MovieList";
import MovieReview from "./pages/MovieReview";
import MyPage from "./pages/MyPage";
import Ranking from "./pages/Ranking";
import Search from "./pages/Search/index.";
import MyReview from "./pages/MyReview";
import UserPage from "./pages/UserPage";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/movieDetail/:movieiId" element={<MovieDetail />} />
        <Route path="/movieList/:type" element={<MovieList />} />
        <Route path="/movieReview/:movieId" element={<MovieReview />} />
        <Route path="/myPage" element={<MyPage />} />
        <Route path="/ranking" element={<Ranking />} />
        <Route path="/search/:searchTerm" element={<Search />} />
        <Route path="/myReview" element={<MyReview />} />
        <Route path="/userPage/:userId" element={<UserPage />} />
      </Routes>
      <ReactQueryDevtools initialIsOpen={true} />
    </div>
  );
}

export default App;
