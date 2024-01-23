import { ChangeEvent, FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

// import { googleSignInStart, emailSignInStart } from "../../store/user/user.action.js";
import { googleSignInStart, emailSignInStart } from "../../store/user/user.action";

import CustomButton, { BUTTON_TYPE_CLASSES } from "../custom-button/custom-button.component";
import FormInput from "../form-input/form-input.component";

import { ButtonsContainer, SignInContainer, Title } from "./sign-in-form.style";

const defaultFormFields = {
    email: '',
    password: ''
};

const SignInForm = () => {
    const dispatch = useDispatch();
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;
    const navigate = useNavigate();

     const logGoogleUser = async () => {
        // await signInWithGooglePopup();
        dispatch(googleSignInStart());
        navigate("/");
     };

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormFields({ ...formFields, [name]: value });
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            // const { user } = await signInWithEmailAndPasswordFirebase(email, password);
            dispatch(emailSignInStart(email, password));
            setFormFields(defaultFormFields);
        } catch (error ) {
            console.log(error as Error);
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