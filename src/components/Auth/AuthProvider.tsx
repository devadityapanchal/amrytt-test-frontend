import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { RootState } from "../../redux/Store";

interface IAuthProvider {
  children: JSX.Element;
}

const AuthProvider = ({ children }: IAuthProvider) => {
  // ** Hooks **
  const authData = useSelector((state: RootState) => state.auth);

  const { isAuthenticated } = authData;

  // ** Not Logged In **
  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }

  return children;
};

export default AuthProvider;
