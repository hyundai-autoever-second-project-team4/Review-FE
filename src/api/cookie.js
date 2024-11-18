export const getCookie = () => {
  const decodedCookie = decodeURIComponent(document.cookie);
  const cookieArray = decodedCookie.split("; ");

  const accessToken = cookieArray.find((cookie) =>
    cookie.startsWith("accessToken")
  );

  return accessToken ? accessToken.split("=")[1] : null;
};

export const getRefresh = () => {
  const decodedCookie = decodeURIComponent(document.cookie);
  const cookieArray = decodedCookie.split("; ");

  const refreshToken = cookieArray.find((cookie) =>
    cookie.startsWith("refreshToken")
  );
  return refreshToken ? refreshToken.split("=")[1] : null;
};

export const setCookies = (val, refresh, exp = 1000) => {
  const d = new Date();
  // Create a cookie
  document.cookie = "accessToken=; Max-Age=0";
  d.setTime(d.getTime() + exp * 24 * 60 * 60 * 1000);
  const expires = `expires=${d.toUTCString()};`;
  // Set a cookie
  document.cookie = `accessToken=${val.toString()};${expires}`;
  document.cookie = `refreshToken=${refresh.toString()};${expires}`;
};

export const deleteAllCookies = () => {
  const cookies = document.cookie.split(";");

  console.log(cookies);

  for (let i = 0; i < cookies.length; i += 1) {
    const cookie = cookies[i];
    const eqPos = cookie.indexOf("=");
    const name = eqPos > -1 ? cookie.substr(0, eqPos).trim() : cookie.trim();
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
  }
  console.log(document.cookie);
};
