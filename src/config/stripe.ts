import { loadStripe } from '@stripe/stripe-js';
import { stripePubKey, stripeProducKNRT, stripeProducMatic, stripeProducTestToken } from "@/config/moralis-connect";

const getStripe = loadStripe(stripePubKey);
const stripeProducts = {
    token: {
        KNRT: stripeProducKNRT,
        CNRT: stripeProducTestToken,
    },
    matic: stripeProducMatic,
}
const stripeRedirections = {
    success: `http://${window.location.hostname}${window.location.port ? ':'+window.location.port:''}/payment/success`,
    cancel: `http://${window.location.hostname}${window.location.port ? ':'+window.location.port:''}/payment/failed`
}

export { getStripe, stripeProducts,stripeRedirections }