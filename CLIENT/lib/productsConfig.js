import axios from "axios";
import toast from "react-hot-toast";

export const getAllProducts = async(token) => {
    try {

        console.log('token: ', token)
        
        const listProducts = await axios.get("http://127.0.0.1:3001/products", {
            headers: { authorization: token },
          });    
         listProducts.data.error && toast.error(listProducts.data.error);

          return listProducts.data;
    } catch (error) {
        console.log(error);
        return {error: error}
    }
}