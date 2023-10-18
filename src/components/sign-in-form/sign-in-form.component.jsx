import { useState, useContext } from "react";

import {
    signInWithEmailAndPasswordFirebase,
    signInWithGooglePopup,
    createUserDocumentFromAuth
} from "../../utils/firebase/firebase.utils";

import CustomButton from "../custom-button/custom-button.component";
import FormInput from "../form-input/form-input.component";

import { UserContext } from "../../contexts/user.context";

import "../sign-in-form/sign-in-form.style.scss"

const defaultFormFields = {
    email: '',
    password: ''
};

const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;

    const { setCurrentUser } = useContext(UserContext);

     const logGoogleUser = async () => {
        const { user } = await signInWithGooglePopup();
        setCurrentUser(user);
        await createUserDocumentFromAuth(user);
     };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields({ ...formFields, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const { user } = await signInWithEmailAndPasswordFirebase(email, password);
            setCurrentUser(user);
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
        <div className="sign-in-container">
            <h2>Already have an account</h2>
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
                 <div className="buttons-container">
                    <CustomButton type="submit">Sign in</CustomButton>
                    <CustomButton onClick={logGoogleUser} buttonType="google" type="button">Google Sign In</CustomButton>
                </div>
            </form>

        </div>
    );
};

export default SignInForm;