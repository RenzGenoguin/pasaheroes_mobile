/** auth-content.tsx */

// react
import React, {
  createContext,
  Dispatch,
  ReactElement,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";

type AuthContextType = {
  activeUsername: { [key: string]: any } | null;
  setActiveUsername: Dispatch<SetStateAction<{ [key: string]: any } | null>>;
  userData: { [key: string]: any } | null;
  setUserData: Dispatch<SetStateAction<{ [key: string]: any } | null>>;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export default function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

// const AuthProvider = (props: { children: ReactNode }): ReactElement => {
//     const [email, setEmail] = useState<{ [key: string]: any } | null>(null);

//     return <AuthContext.Provider {...props} value={{ email, setEmail }} />;
// };

export { useAuth };
