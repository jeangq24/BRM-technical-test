import { CiMail } from "react-icons/ci";
import { CiUser } from "react-icons/ci";
import InputText from "@/components/InputText";
import InputPassword from "@/components/InputPassword";
import Button from "@/components/Button";
import toast from "react-hot-toast";
import { useState } from "react";
import Router from 'next/router';
import { loginFunction, registerFunction } from '@/lib/auth';
import { useUser } from '@/lib/UserContext';
import Container from "@/components/Container";
import InputDate from "@/components/InputDate";

export default () => {
    const { login } = useUser();
    return (
        <Container>
            <div className="flex flex-col md:flex-row w-full h-full gap-10 py-20">
                <LoginUser login={login} />
                <div className="h-full bg-black w-[1px]"></div>
                <RegisterUser />

            </div>
        </Container>
    )
};


const RegisterUser = () => {
    const [emailValue, setEmailValue] = useState('');
    const [nameValue, setNameValue] = useState('');
    const [lastNameValue, setLastNameValue] = useState('');
    const [userNameValue, setUserNameValue] = useState('');
    const [passwordValue, setPasswordValue] = useState('');
    const [birthDateValue, setBirthDateValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
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

    const handleChangeBirthDate = (e) => {
        const { value } = e.target;
        setBirthDateValue(value);
    };

    const resetField = () => {
        setEmailValue('');
        setLastNameValue('')
        setNameValue('')
        setPasswordValue('')
        setUserNameValue('');
    }

    const classNameIcons = "w-6 h-6 text-gray-400 absolute left-3 inset-y-0 my-auto";
    return (
        <div className="flex flex-col gap-4 w-full md:w-1/2">
            <h1 className="text-2xl font-bold w-full text-center">Register</h1>
            <InputText placeholder={"Enter your name"} textLabel={'Name'} value={nameValue} onChange={handleChangeName}>
                <CiUser className={classNameIcons} />
            </InputText>
            <InputText placeholder={"Enter your last name"} textLabel={'Last name'} value={lastNameValue} onChange={handleChangeLastName}>
                <CiUser className={classNameIcons} />
            </InputText>
            <InputDate placeholder={"Enter your birth date"} textLabel={"Birt date"} value={birthDateValue} onChange={handleChangeBirthDate}>
                <CiUser className={classNameIcons} />
            </InputDate>
            <InputText placeholder={"Enter your username"} textLabel={'Username'} value={userNameValue} onChange={handleChangeUserName}>
                <CiUser className={classNameIcons} />
            </InputText>
            <InputText placeholder={"Enter your email"} textLabel={'Email'} value={emailValue} onChange={handleChangeEmail}>
                <CiMail className={classNameIcons} />
            </InputText>
            <InputPassword value={passwordValue} onChange={handleChangePassword} />
            <Button text={'Register'} onClick={() => {registerFunction({ emailValue, userNameValue, nameValue, lastNameValue, passwordValue, birthDateValue }, setIsLoading, resetField)}} />

        </div>
    )
};

const LoginUser = ({ login }) => {

    const [emailValue, setEmailValue] = useState('');
    const [passwordValue, setPasswordValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);

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

        <div className="flex flex-col gap-4 w-full md:w-1/2">
            <h1 className="text-2xl font-bold w-full text-center">Login</h1>
            <InputText placeholder={"Enter your email"} textLabel={'Email'} onChange={handleChangeEmail} value={emailValue}>
                <CiMail className={classNameIcons} />
            </InputText>
            <InputPassword onChange={handleChangePassword} value={passwordValue} />
            <Button text={'Login'} onClick={() => loginFunction(emailValue, passwordValue, setIsLoading, login, Router)}
            />

        </div>

    )
}