import { useEffect, useState } from "react"
import Router from 'next/router';
import { getAllProducts } from "./productsConfig";

export const useLogin = () => {
   
    const [userData, setUserData] = useState(null);
    useEffect(()=> {
        
        const userLocalStroage = localStorage.getItem('userData');
        if(!userData?.token) {
            setUserData(JSON.parse(userLocalStroage));
            console.log(userLocalStroage)
        }else {
            Router.push('/auth');
        }

    }, [])
    
   
    return [userData];
}; 

export const useProducts = (token) => {
    
    const [productsList, setProductsList] = useState([]);
    const [loadingProducts, setLoadingProducts] = useState(false);
    const getProducts = async () => {
        const userLocalStroage = localStorage.getItem('userData');
        setLoadingProducts(true);
        const result = await getAllProducts(token);
        !result?.error && setProductsList(result)
        setLoadingProducts(false);
    };
    useEffect(()=> {
        getProducts();
    }, [])

    return [productsList, loadingProducts];
}