import React, { useEffect } from "react";
import { useHistory, Redirect} from "react-router-dom";

function Logout() {
  const history = useHistory();
  

  useEffect(() => {
    // Xóa accessToken và refreshToken khi đăng xuất
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    
    
    
  });
  
  
  return <Redirect to="/auth/sign-in" />;
}

export default Logout;
