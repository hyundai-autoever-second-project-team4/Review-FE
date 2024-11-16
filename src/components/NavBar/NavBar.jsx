import React, { useEffect, useState, useLayoutEffect } from "react";
import styled from "styled-components";
import theme from "../../styles/theme";
import Button from "../Button/Button";
import DynamicSVG from "../DynamicSVG/DynamicSVG";
import svgLogo from "/src/assets/svg/svgLogo.svg";
import { useNavigate, useLocation } from "react-router-dom";
import searchLogo from "../../assets/svg/search.svg";
import { Tooltip } from "@mui/material";
import { setCookies, deleteAllCookies } from "../../api/cookie";
import useUserStore from "../../store/userStore";
import { useGetUserInfo } from "../../hooks/useGetUserInfo";
import ProfileTooltip from "./ProfileTooltip";
import Fade from "@mui/material/Fade";
import LoginModal from "../LoginModal/LoginModal";

const Container = styled.div`
  position: fixed;
  z-index: 1000;
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: center;
  height: 60px;
  background-color: ${({ $variant }) =>
    $variant ? `${theme.colors.black}1C` : "#ffffff"};
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);

  transition: 0.5s;
`;
const InerContainer = styled.div`
  display: flex;
  width: 1320px;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 1320px) {
    padding: 0 8px;
  }
`;
const LeftWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;
const NavItem = styled.a`
  font-size: 16px;
  font-weight: ${theme.fontWeight.bold};
  color: ${({ $variant, $isSelected }) =>
    $variant ? "#ffffff" : $isSelected ? theme.colors.black : "#A1A1A1"};
  text-shadow: ${({ $variant }) =>
    $variant && `0px 0px 4px rgba(0, 0, 0, 0.25);`};
  /* transition: color 0.3s ease; */

  &:hover {
    transform: scale(1.03);
    cursor: pointer;
  }
`;

const SearchInput = styled.input`
  @media (max-width: 960px) {
    width: 200px;
  }

  @media (max-width: 640px) {
    display: none;
  }
  transition: 0.3s;
  width: 500px;
  padding: 8px 16px 8px 36px;
  margin-right: 16px;
  border-radius: ${theme.borderRadius.sm};
  border: none;
  background-color: ${theme.colors.review};
  font-size: ${theme.fontSizes.sub1};
  opacity: ${({ $variant }) => $variant && `0.8`};

  &:focus {
    outline: none;
    border: none;
  }
`;
const StyledDynamicSvg = styled(DynamicSVG)`
  position: absolute;
  left: 8px;
  top: 50%;
  transform: translateY(-50%);
  @media (max-width: 640px) {
    display: none;
  }
`;

const StyledButton = styled(Button)`
  opacity: ${({ $variant }) => $variant && `0.6`};
`;

const ProfileImg = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  cursor: pointer;
`;

function NavBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isVariant, setIsVariant] = useState(false);
  const [searchKey, setSearchKey] = useState("");
  const { data, isLoading, refetch } = useGetUserInfo();
  const { user, setUser, logOut } = useUserStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedNav, setSelectedNav] = useState(""); // 현재 선택된 Nav 상태 추가

  useEffect(() => {
    setCookies(
      "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJuYW1lIjoi7Jik7KCV7ZmYIiwic29jaWFsIjoia2FrYW8iLCJlbWFpbCI6IndqZGdoa3MwMzE2QG5hdmVyLmNvbSIsInByb2ZpbGVJbWFnZSI6Imh0dHA6Ly9pbWcxLmtha2FvY2RuLm5ldC90aHVtYi9SNjQweDY0MC5xNzAvP2ZuYW1lPWh0dHA6Ly90MS5rYWthb2Nkbi5uZXQvYWNjb3VudF9pbWFnZXMvZGVmYXVsdF9wcm9maWxlLmpwZWciLCJyb2xlIjoiTUVNQkVSIiwiaWF0IjoxNzMxNDc0NTQzLCJleHAiOjE3MzE0NzgxNDN9.5GyVN3RXfQiUcryzX7I6mTEW2jt_YMhLOP5HjEuL3XU",
      "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE3MzE0NzQ1NDMsImV4cCI6MTczMjA3OTM0MywiZW1haWwiOiJ3amRnaGtzMDMxNkBuYXZlci5jb20ifQ.wzsRVHHHNUCah-fNTNjatSltAMKYeauXO4yL661JrSQ",
      60
    );
  }, []);

  useEffect(() => {
    if (data) {
      setUser(data);
    }
  }, [data]);

  useEffect(() => {
    // 페이지 로드 시 스크롤을 최상단으로 설정
    window.scrollTo(0, 0);

    const handleScroll = () => {
      // MovieDetail 페이지에서만 동작
      if (
        location.pathname.split("/")[1] === "movieDetail" &&
        window.scrollY <= 200
      ) {
        //setIsVariant(window.scrollY <= 200); // 스크롤 위치에 따라 업데이트
        setIsVariant(true);
      } else {
        setIsVariant(false);
      }
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [location]);

  const moveToMain = () => {
    navigate("/");
  };

  const moveToPlaying = () => {
    navigate("/movieList/nowPlaying");
  };

  const moveToPopular = () => {
    navigate("/movieList/popular");
  };

  const moveToRanking = () => {
    navigate("/ranking");
  };

  const moveToMyPage = () => {
    navigate(`/userPage/${user.id}`);
  };

  const isPlayingSelected = location.pathname === "/movieList/nowPlaying";
  const isPopularSelected = location.pathname === "/movieList/popular";
  const isRankingSelected = location.pathname === "/ranking";

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && searchKey.trim() !== "") {
      navigate(`/search/search?query=${searchKey}`, {
        state: { keyword: searchKey },
      });
      setSearchKey("");
    }
  };

  const handleLogin = () => {
    //  https://api.theaterup.site/oauth2/authorization/kakao 으로 이동시켜줘.
    window.location.href =
      "https://api.theaterup.site/oauth2/authorization/kakao";
    handleModalClose();
  };

  const handleLogOut = () => {
    alert("로그아웃 되었습니다.");
    logOut();
    deleteAllCookies();
    navigate("/");
  };

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <Container $variant={isVariant}>
      <InerContainer>
        <LeftWrap>
          <img
            src={svgLogo}
            alt=""
            onClick={moveToMain}
            style={{ cursor: "pointer" }}
          />
          {/* <DynamicSVG svgUrl={svglogo} color={theme.colors.primary} /> */}
          <NavItem
            onClick={moveToPlaying}
            $variant={isVariant}
            $isSelected={isPlayingSelected}
          >
            현재상영작
          </NavItem>
          <NavItem
            onClick={moveToPopular}
            $variant={isVariant}
            $isSelected={isPopularSelected}
          >
            인기영화
          </NavItem>
          <NavItem
            onClick={moveToRanking}
            $variant={isVariant}
            $isSelected={isRankingSelected}
          >
            랭킹
          </NavItem>
        </LeftWrap>
        <div>
          <div
            style={{
              position: "relative",
              width: "100%",
              display: "flex",
              alignItems: "center",
            }}
          >
            <StyledDynamicSvg svgUrl={searchLogo} color={theme.colors.gray3} />
            <SearchInput
              $variant={isVariant}
              value={searchKey}
              onChange={(e) => setSearchKey(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            {user?.id === null ? (
              <StyledButton $variant={isVariant} onClick={handleModalOpen}>
                로그인
              </StyledButton>
            ) : (
              <Tooltip
                title={
                  <ProfileTooltip
                    name={user?.name}
                    img={user?.profileImage}
                    level="movieGod"
                    primaryBadge="unbreakable"
                    moveToMyPage={moveToMyPage}
                    handleLogOut={handleLogOut}
                  />
                }
                placement="bottom-end"
                TransitionComponent={Fade}
                TransitionProps={{ timeout: 650 }}
                // open={true}
                componentsProps={{
                  tooltip: {
                    sx: {
                      padding: "0px",
                      backgroundColor: "#fff",
                      color: "black",
                      boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.5)",
                      borderRadius: theme.borderRadius.sm,
                    },
                  },
                }}
              >
                <div
                  style={{
                    width: "48px",
                    height: "48px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  // onClick={moveToMyPage}
                >
                  <ProfileImg src={user?.profileImage} alt="" />
                </div>
              </Tooltip>
            )}
          </div>
        </div>
      </InerContainer>
      <LoginModal
        modalOpen={isModalOpen}
        modalClose={handleModalClose}
        handleLogin={handleLogin}
      />
    </Container>
  );
}

export default NavBar;
