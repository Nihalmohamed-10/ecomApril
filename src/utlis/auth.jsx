// Save user info and token to localStorage
export const saveUserToLocalStorage = (user, token) => {
  localStorage.setItem("user", JSON.stringify(user));
  localStorage.setItem("token", token);
};

// Get token from localStorage
export const getToken = () => {
  return localStorage.getItem("token");
};

// Get user role from localStorage
export const getUserRole = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return user?.role;
};

// Get user info 
export const getUserInfo = () => {
  return JSON.parse(localStorage.getItem("user"));
};

// logout
export const clearUserFromLocalStorage = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
};
