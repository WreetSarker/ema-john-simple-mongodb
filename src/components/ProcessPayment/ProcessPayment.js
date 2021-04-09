import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import SimpleCardForm from './SimpleCardForm';
const stripePromise = loadStripe('pk_test_51Ie2pFCHSoFXu73r0HajToKjG0Aba75eJIS76I86Pr2c8jnGbbGZPwbIA6NrC97yTGZRmvFxjBM5MN275qSFixhb00DLpNMqF1');

const ProcessPayment = () => {
    return (
        <Elements stripe={stripePromise}>
            <SimpleCardForm></SimpleCardForm>
        </Elements>
    );
};

export default ProcessPayment;