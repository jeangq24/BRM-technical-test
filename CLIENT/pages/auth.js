import { CiMail } from "react-icons/ci";
import { CiUser } from "react-icons/ci";
import InputText from "@/components/InputText";
import InputPassword from "@/components/InputPassword";
import Button from "@/components/Button";
import toast from "react-hot-toast";
import { useState } from "react";
import { loginFunction, registerFunction } from "@/lib/auth";
import Router from 'next/router';


export default () => {

    return (
        <>
            <RegisterUser />
            <LoginUser />
        </>
    )
};


const RegisterUser = () => {
    const [emailValue, setEmailValue] = useState('');
    const [nameValue, setNameValue] = useState('');
    const [lastNameValue, setLastNameValue] = useState('');
    const [userNameValue, setUserNameValue] = useState('');
    const [passwordValue, setPasswordValue] = useState('');

    const handleChangeEmail = (e) => {
        const { value } = e.target;
        setEmailValue(value)
    };

    const handleChangeName = (e) => {
        const { value } = e.target;
        setNameValue(value);
    };

    const handleChangeUserName = (e) => {
        const { value } = e.target;
        setUserNameValue(value);
    };

    const handleChangeLastName = (e) => {
        const { value } = e.target;
        setLastNameValue(value);
    };

    const handleChangePassword = (e) => {
        const { value } = e.target;
        setPasswordValue(value);
    };

    const classNameIcons = "w-6 h-6 text-gray-400 absolute left-3 inset-y-0 my-auto";
    return (
        <div >
            <InputText placeholder={"Enter your name"} textLabel={'Name'} value={nameValue} onChange={handleChangeName}>
                <CiUser className={classNameIcons} />
            </InputText>
            <InputText placeholder={"Enter your last name"} textLabel={'Last name'} value={lastNameValue} onChange={handleChangeLastName}>
                <CiUser className={classNameIcons} />
            </InputText>
            <InputText placeholder={"Enter your username"} textLabel={'Username'} value={userNameValue} onChange={handleChangeUserName}>
                <CiUser className={classNameIcons} />
            </InputText>
            <InputText placeholder={"Enter your email"} textLabel={'Email'} value={emailValue} onChange={handleChangeEmail}>
                <CiMail className={classNameIcons} />
            </InputText>
            <InputPassword value={passwordValue} onChange={handleChangePassword} />
            <Button text={'Register'} onClick={async () => {

                let result = await registerFunction(emailValue, userNameValue, nameValue, lastNameValue, passwordValue);

                if(!result?.error) {
                    setEmailValue('');
                    setLastNameValue('')
                    setNameValue('')
                    setPasswordValue('')
                    setUserNameValue('');
                    toast.success('Successful registration');
                };
            }} />

        </div>
    )
};

const LoginUser = () => {
    const [emailValue, setEmailValue] = useState('');
    const [passwordValue, setPasswordValue] = useState('');

    const handleChangeEmail = (e) => {
        const { value } = e.target;
        setEmailValue(value)
    };

    const handleChangePassword = (e) => {
        const { value } = e.target;
        setPasswordValue(value);
    };

    const classNameIcons = "w-6 h-6 text-gray-400 absolute left-3 inset-y-0 my-auto";
    return (
        <div>
            <InputText placeholder={"Enter your email"} textLabel={'Email'} onChange={handleChangeEmail} value={emailValue}>
                <CiMail className={classNameIcons} />
            </InputText>
            <InputPassword onChange={handleChangePassword} value={passwordValue} />
            <Button text={'Login'} onClick={async() => {
               let result = await loginFunction(emailValue, passwordValue);
               if(!result?.error) {
                setEmailValue('');
                setPasswordValue('')
                toast.success('Successful login');
                Router.push('/');
            };
            }}
            />
        </div>
    )
}