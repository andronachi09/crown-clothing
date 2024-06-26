import { useDispatch } from "react-redux";
import { ChangeEvent, FormEvent, useState } from "react";

import CustomButton from "../custom-button/custom-button.component";
import FormInput from "../form-input/form-input.component";

import "./sign-up-form.style";
import { SignUpContainer, Title } from "./sign-up-form.style";
import { signUpStart } from "../../store/user/user.action";
import { AuthError, AuthErrorCodes } from "firebase/auth";

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
};

const SignUpForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { displayName, email, password, confirmPassword } = formFields;
    const dispatch = useDispatch();

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;

        setFormFields({ ...formFields, [name]: value });
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        };

        try {
            dispatch(signUpStart(email, password, displayName));
            setFormFields(defaultFormFields);
        } catch (error) {
            if ((error as AuthError).code === AuthErrorCodes.EMAIL_EXISTS) {
                alert("Email already in use");
            } else {
                console.log('user creation encountered an error', error);
            }
        };
    };

    return (
        <SignUpContainer>
            <Title>Don't have an account?</Title>
            <span>Sign up with your email and password:</span>
            <form onSubmit={handleSubmit}>
                <FormInput
                    label="Display name:"
                    type="text"
                    required name="displayName"
                    onChange={handleChange}
                    value={displayName}
                />
                <FormInput
                    label="Email:"
                    type="email"
                    required name="email"
                    onChange={handleChange}
                    value={email}
                />
                <FormInput
                    label="Password:"
                    type="password"
                    required name="password"
                    onChange={handleChange}
                    value={password}
                />
                <FormInput
                    label="Confirm password:"
                    type="password"
                    required name="confirmPassword"
                    onChange={handleChange}
                    value={confirmPassword}
                />
                <CustomButton type="submit">Sign up</CustomButton>
            </form>
        </SignUpContainer>
    )
};

export default SignUpForm;