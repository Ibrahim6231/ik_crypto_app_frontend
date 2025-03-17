export interface UserSignUpInterface {
  email: string;
  name: {
    first: string;
    last: string;
  };
  confirmPassword: string;
  password: string;
}

export interface UserLoginInterface {
  email: string;
  password: string;
}


export interface UserInterface {
  name: {
    first: string;
    last: string;
  };
  roles: string;
  email: string;
  isVisible:boolean
  _id: string;
}

export interface AuthUserStateInterface {
  authUser: UserInterface;
  isLoggedIn: boolean;
  token: string;
}