export const isAuthMiddleware = () => {
  const cookies = document.cookie ? document.cookie : null;
  if (!cookies) return false;

  const cookie = cookies
    .split("; ")
    .find((cookie) => cookie.startsWith("token"))
    ? cookies
        .split("; ")
        .find((cookie) => cookie.startsWith("token"))
        .split("=")[1]
    : null;

  if (!cookie) return cookie;
  return true;
};
