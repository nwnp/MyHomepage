export const deleteCookie = (name) => {
  const cookies = document.cookie ? document.cookie : null;
  if (!cookies) return false;

  document.cookie = name + "=;exprires=Thu, 01 Jan 1970 00:00:01 GMT;";
  return true;
};
