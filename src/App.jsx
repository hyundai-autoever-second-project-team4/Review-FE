import { Route, Routes } from "react-router-dom";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Main from "./pages/Main";
import MovieDetail from "./pages/MovieDetail";
import MovieList from "./pages/MovieList";
import MovieReview from "./pages/MovieReview";
import Ranking from "./pages/Ranking";
import Search from "./pages/Search";
import MyReview from "./pages/MyReview";
import UserPage from "./pages/UserPage";

import Test from "./pages/Test";
import NavBar from "./components/NavBar/NavBar";
import styled from "styled-components";
import "swiper/css";
import "swiper/css/pagination";

const Container = styled.div`
  font-family: "Noto Sans KR", sans-serif;
`;

function App() {
  return (
    <Container
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <NavBar />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/movieDetail/:movieiId" element={<MovieDetail />} />
        <Route path="/movieList/:type" element={<MovieList />} />
        <Route path="/movieReview/:movieId" element={<MovieReview />} />
        <Route path="/ranking" element={<Ranking />} />
        <Route path="/search/:searchTerm" element={<Search />} />
        <Route path="/myReview" element={<MyReview />} />
        <Route path="/userPage/:userId" element={<UserPage />} />
        {/* test 추가 */}
        <Route path="/test" element={<Test />} />
      </Routes>
      <ReactQueryDevtools initialIsOpen={true} />
    </Container>
  );
}

export default App;
