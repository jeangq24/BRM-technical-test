import toast from "react-hot-toast"
import axios from "axios";
export const loginFunction = async (email, password) => {
    try {
        const loginToken = await axios({
            method: 'post',
            url: 'http://127.0.0.1:3001/auth',
            data: {
              email, password
            }
          });
          console.log(loginToken?.data)
        if (loginToken?.data?.error) {
            toast.error(loginToken?.data?.error);
        } else {
            localStorage.setItem('userData', JSON.stringify(loginToken?.data));
        };

        return loginToken?.data;

    } catch (error) {
        console.log("loginFunction error: ", error);
        return {error: error};
    };
};

export const registerFunction = async (email, username, name, lastName, password) => {
    try {
      
        const userRegistred = await axios({
            method: 'post',
            url: 'http://127.0.0.1:3001/users',
            data: {
              email, password, username, name, last_name: lastName, birthdate: '24/03/1999'
            }
          });

        if (userRegistred.data.error) {
            toast.error(userRegistred.data.error);
        };


        return userRegistred.data;

    } catch (error) {
        console.log("registerFunction error: ", error)
        return {error: error}
    };
};