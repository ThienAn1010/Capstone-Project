const authProvider = {
  // called when the user attempts to log in
  login: (arg: { username: string; password: string }) => {
    const { username, password } = arg;
    localStorage.setItem("username", username);
    if (username === "admin" && password === "123456") {
      return Promise.resolve();
    } else return Promise.reject("Wrong username or password");
  },
  // called when the user clicks on the logout button
  logout: () => {
    localStorage.removeItem("username");
    return Promise.resolve();
  },
  // called when the API returns an error
  checkError: ({ status }: { status: number }) => {
    if (status === 401 || status === 403) {
      localStorage.removeItem("username");
      return Promise.reject();
    }
    return Promise.resolve();
  },
  // called when the user navigates to a new location, to check for authentication
  checkAuth: () => {
    return localStorage.getItem("username")
      ? Promise.resolve()
      : Promise.reject();
  },
  // called when the user navigates to a new location, to check for permissions / roles
  getPermissions: () => Promise.resolve(),
};

export default authProvider;
