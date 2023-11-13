export const useGetUserInfo = () => {
  const user = JSON.parse(localStorage.getItem("auth"));
  if (!user) return { userID: null, userName: "", userImg: "", isAuth: false };
  const { userID, userName, userImg, isAuth } = user;
  return { userID, userName, userImg, isAuth };
};
