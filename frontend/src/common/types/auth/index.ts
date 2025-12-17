export interface LoginPageProps {
  setEmail: (value: string) => void;
  setPassword: (value: string) => void;
}

export interface RegisterPageProps {
  setFirstName: (value: string) => void;
  setUsername: (value: string) => void;
  setEmail: (value: string) => void;
  setPassword: (value: string) => void;
  setRepeatPassword: (value: string) => void;
}
