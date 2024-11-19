import React, { useState, useEffect } from "react";
import Pagination from "@mui/material/Pagination";

const CustomPagination = ({ count, page, onChange }) => {
  const [siblingCount, setSiblingCount] = useState(5);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 480) {
        setSiblingCount(1);
      } else if (window.innerWidth <= 640) {
        setSiblingCount(2);
      } else if (window.innerWidth <= 960) {
        setSiblingCount(3);
      } else if (window.innerWidth <= 1320) {
        setSiblingCount(4);
      } else {
        setSiblingCount(5);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      {count !== 0 && (
        <Pagination
          count={count}
          page={page}
          onChange={onChange}
          siblingCount={siblingCount}
          sx={{
            ".MuiPaginationItem-root.Mui-selected": {
              backgroundColor: "#F2B705",
            },
          }}
        />
      )}
    </>
  );
};

export default CustomPagination;
