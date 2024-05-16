import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { RootState } from "../../redux/Store";

interface IUnAuthProvider {
  children: JSX.Element;
}

const UnAuthProvider = ({ children }: IUnAuthProvider) => {
  // ** Hooks **
  const authData = useSelector((state: RootState) => state.auth);

  const { isAuthenticated } = authData;

  // ** Not Logged In **
  if (isAuthenticated) {
    return <Navigate to={"/"} />;
  }

  return children;
};

export default UnAuthProvider;
