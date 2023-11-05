import { useState } from "react";

import {
    signInWithEmailAndPasswordFirebase,
    signInWithGooglePopup,
} from "../../utils/firebase/firebase.utils";

import CustomButton, { BUTTON_TYPE_CLASSES } from "../custom-button/custom-button.component";
import FormInput from "../form-input/form-input.component";

import { ButtonsContainer, SignInContainer, Title } from "./sign-in-form.style.jsx";

const defaultFormFields = {
    email: '',
    password: ''
};

const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;

     const logGoogleUser = async () => {
        await signInWithGooglePopup();
     };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields({ ...formFields, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const { user } = await signInWithEmailAndPasswordFirebase(email, password);
            setFormFields(defaultFormFields);
        } catch (error) {
            switch (error.code) {
                case 'auth/wrong-password':
                    alert("Incorrect password for this email");
                    break
                case 'auth/user-not-found':
                    alert("Wrong email, user not found");
                    break
                 case 'auth/invalid-login-credentials':
                    alert("Invalid login credentials");
                    break
                default:
                    console.log(error);
            }
        }
    };

    return (
        <SignInContainer>
            <Title>Already have an account</Title>
            <span>Sign in with email and password.</span>
            <form onSubmit={handleSubmit}>
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
                 <ButtonsContainer>
                    <CustomButton type="submit">Sign in</CustomButton>
                    <CustomButton onClick={logGoogleUser} buttonType={BUTTON_TYPE_CLASSES.google} type="button">Google Sign In</CustomButton>
                </ButtonsContainer>
            </form>
        </SignInContainer>
    );
};

export default SignInForm;