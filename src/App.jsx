import { Route, Routes } from "react-router-dom";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Main from "./pages/Main";
import MovieDetail from "./pages/MovieDetail";
import MovieList from "./pages/MovieList";
import MovieReview from "./pages/MovieReview";
import Ranking from "./pages/Ranking";
import Search from "./pages/Search";
import UserPage from "./pages/UserPage";
import Test from "./pages/Test";
import NavBar from "./components/NavBar/NavBar";
import styled from "styled-components";
import "swiper/css";
import "swiper/css/pagination";
import UserReviewListPage from "./pages/UserReviewListPage";
import useDetectMobile from "./hooks/useDetectMobile";

const Container = styled.div`
  font-family: "Noto Sans KR", sans-serif;
  margin-bottom: ${({ $isMobile }) => $isMobile && "60px"};
`;

function App() {
  const isMobile = useDetectMobile();
  return (
    <Container
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
      $isMobile={isMobile}
    >
      <NavBar />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/movieDetail/:movieId" element={<MovieDetail />} />
        <Route path="/movieList/:type" element={<MovieList />} />
        <Route path="/movieReview/:movieId" element={<MovieReview />} />
        <Route path="/ranking" element={<Ranking />} />
        <Route path="/search/:searchTerm" element={<Search />} />
        <Route path="/userReview/:userId" element={<UserReviewListPage />} />
        <Route path="/userPage/:userId" element={<UserPage />} />
        {/* test 추가 */}
        <Route path="/test" element={<Test />} />
      </Routes>
      <ReactQueryDevtools initialIsOpen={true} />
    </Container>
  );
}

export default App;
