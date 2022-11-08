export const getCookie = () => {
  const cookies = document.cookie ? document.cookie : null;
  if (!cookies) return false;

  const cookie = cookies
    .split("; ")
    .find((cookie) => cookie.startsWith("userId"))
    ? cookies
        .split("; ")
        .find((cookie) => cookie.startsWith("userId"))
        .split("=")[1]
    : null;

  if (!cookie) return false;
  return cookie;
};
