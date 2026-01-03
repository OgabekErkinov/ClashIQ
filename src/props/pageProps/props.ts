
export interface LoginPageProps {
  onLogin: (email: string, password: string, isAdmin: boolean) => void;
  onGuest: () => void;
}