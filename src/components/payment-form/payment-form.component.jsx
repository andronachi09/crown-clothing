import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

import CustomButton, { BUTTON_TYPE_CLASSES } from "../custom-button/custom-button.component";

import { FormContainer, PaymentFormContainer } from "./payment-form.style";

const PaymentForm = () => {
    const stripe = useStripe();
    const elements = useElements();

    const paymentHandler = async (e) => {
        e.preventDefault();


    }

    return (
        <PaymentFormContainer>
            <FormContainer>
                <h2>Credit Card Payment:</h2>
                <CardElement />
                <CustomButton buttonType={BUTTON_TYPE_CLASSES.inverted}> Pay now </CustomButton>
            </FormContainer>
        </PaymentFormContainer>
    )
};

export default PaymentForm;