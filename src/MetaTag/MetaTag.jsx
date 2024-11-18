import React from "react";
import { Helmet } from "react-helmet-async";
const IMG_BASE_URL = "https://image.tmdb.org/t/p/w500"; // 이미지 베이스 URL

function MetaTag({ title, description, imgsrc, url }) {
  return (
    <Helmet>
      <title>{title + " - ThearUp"}</title>

      <meta name="description" content={description} />
      {/* <meta name="keywords" content={keywords} /> */}

      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:site_name" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={IMG_BASE_URL + `${imgsrc}`} />
      <meta property="og:url" content={url} />

      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={IMG_BASE_URL + `${imgsrc}`} />

      <link rel="canonical" href={url} />
    </Helmet>
  );
}

export default MetaTag;
