export const getCookie = (key) => {
  const cookies = document.cookie ? document.cookie : null;
  if (!cookies) return false;

  const cookie = cookies.split("; ").find((cookie) => cookie.startsWith(key))
    ? cookies
        .split("; ")
        .find((cookie) => cookie.startsWith(key))
        .split("=")[1]
    : null;

  if (!cookie) return false;
  return cookie;
};
