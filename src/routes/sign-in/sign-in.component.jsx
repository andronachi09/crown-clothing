import { signInWithGooglePopup, signInWithGoogleRedirect, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";
import SignUpForm from "../../components/sign-up-form/sign-up-form.component";
import CustomButton from "../../components/custom-button/custom-button.component";

const SignIn = () => {
    const logGoogleUser = async () => {
        const { user } = await signInWithGooglePopup();
        const userDocRef = await createUserDocumentFromAuth(user);
    };

    return (
        <div>
            <h1>Sign in page</h1>
            <CustomButton onClick={logGoogleUser}>Sign in</CustomButton>
            <SignUpForm />
        </div>
    );
};

export default SignIn;