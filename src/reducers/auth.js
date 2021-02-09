const auth = (
  state = {
    token: null,
    user: null,
    logged_in: false,
    isFetching: false,
  },
  action,
) => {
  switch (action.type) {
    case 'USER_LOGIN':
      switch (action.status) {
        case 'request':
          return {
            ...state,
            isFetching: true,
          };
        case 'recieve':
          localStorage.setItem('token', action.token);
          localStorage.setItem('user', JSON.stringify(action.data));
          return {
            ...state,
            token: action.token,
            user: action.data,
            logged_in: true,
            isFetching: false,
          };
          break;
        case 'error':
          return {
            ...state,
            isFetching: false,
          };
        default:
          return state;
      }
    case 'USER_LOGOUT':
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      return {
        ...state,
        token: null,
        user: null,
        logged_in: false,
        isFetching: false,
      };
    case 'PROFILE_UPDATE':
      localStorage.setItem('user', JSON.stringify(action.data));
      return {
        ...state,
        user: action.data,
      };
    default:
      const token = localStorage.getItem('token');
      const user = localStorage.getItem('user');
      if (token && user) {
        return {
          ...state,
          token,
          user: JSON.parse(user),
          isFetching: false,
          logged_in: true,
        };
      }
      return state;
  }
};

export default auth;
