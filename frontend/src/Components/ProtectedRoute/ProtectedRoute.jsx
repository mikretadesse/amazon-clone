import { useContext, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { DataContext } from "../../Components/DataProvider/DataProvider";

function ProtectedRoute({ children, msg }) {
  const { state } = useContext(DataContext);
  const user = state.user;
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!user) {
      navigate("/auth", { state: { redirect: location.pathname, msg } });
    }
  }, [user, navigate, location, msg]);

  return user ? children : null;
}

export default ProtectedRoute;
