import Cookies from "cookies-js";
 export   const verify  =  async  ()=> {
    const cookieValue = Cookies.get("accessToken");
    console.log("Cookie Value:", cookieValue);
 }