export interface AuthContextType {
    userToken: string | null;
    login: (token: string) => void;
    logout: () => void;
}