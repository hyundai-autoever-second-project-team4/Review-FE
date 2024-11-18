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
import { Helmet } from "react-helmet-async";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Helmet>
        <title>ThearUp</title>
        <meta
          name="description"
          content="ThearUp에서 즐겁게 영화 리뷰를 해보세요. ThearUp에서는 여러 사람들의 리뷰를 통해 영화에 대한 다양한 정보를 얻을 수 있습니다."
        />
        <meta property="og:url" content="https://theaterup.site/" />
        <meta property="og:title" content="ThearUp - 즐거운 영화 리뷰 서비스" />
        <meta property="og:type" content="website" />
        <meta
          property="og:image"
          content="https://theaterup.site/ThearUpImg.png"
        />
        <meta property="og:description" content="영화 리뷰, ThearUp과 함께!" />
      </Helmet>
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
