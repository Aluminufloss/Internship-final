// import React from "react";
// import { Navigate } from "react-router-dom";
// import { useAppSelector } from "../hooks/hook";

// type ProtectedRouteProps = {
//   children: React.ReactNode;
// };

// const ProtectedRoute: React.FC<ProtectedRouteProps> = (props) => {
//   const isAuth = useAppSelector((state) => state.authentication.isAuth);
//   console.log("Is auth = ", isAuth);

//   if (!isAuth) {
//     return <Navigate to="/login" replace />;
//   }

//   return <>{props.children}</>;
// };

// export default ProtectedRoute;
