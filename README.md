# Frontend

🚀 Welcome! This project represents the frontend of the nft market place application. Below you'll find instructions for local development and deployment.

## Project Structure

- **`public/`:** Public assets.
- **`src/`:** Source code of the frontend application.
- **`vite.config.js`:** Vite configuration file.

## Getting Started Locally

Follow these steps to set up and run the frontend locally on your machine:

1. **Clone the Repository:** Download or clone this frontend project to your local machine.

2. **Install Dependencies:** Ensure you have `yarn` or `npm` installed. Run the following command to install project dependencies:

    ```bash
    yarn install
    # or
    npm install
    ```

3. **Set Up Environment Variables:** Create a `.env` file in the root of the frontend directory and fill in the required values from the provided `.env` example.

- **`VITE_MORALIS_APP_ID`:** The application ID for Moralis, a blockchain development platform.
- **`VITE_MORALIS_MASTER_KEY`:** The master key for Moralis, used for authentication and access control.
- **`VITE_MORALIS_API_KEY`:** An API key for Moralis, used for interacting with Moralis services.
- **`VITE_MORALIS_SERVER_URL`:** The URL of the Moralis server where your backend services are hosted.
- **`VITE_ALCHEMY_PRIVATE_API_KEY`:** A private API key from Alchemy, a blockchain developer platform.
- **`VITE_ALCHEMY_URL_PROVIDER`:** The URL endpoint for the Alchemy provider, used for blockchain data access.
- **`VITE_STRIPE_PUBLIC_KEY`:** The public key for Stripe, a payment processing platform.
- **`VITE_STRIPE_PRIVATE_KEY`:** The private key for Stripe, used for secure interactions with the Stripe API.
- **`VITE_STRIPE_PRODUCT_KNRT`:** The price ID associated with the KNRT product in your Stripe account.
- **`VITE_STRIPE_PRODUCT_MATIC`:** The price ID associated with the MATIC product in your Stripe account.
- **`VITE_STRIPE_PRODUCT_KNRT_TEST_CNRT`:** The price ID associated with the KNRT Test CNRT product in your Stripe account.
- **`VITE_CHAIN_ID_MAINNET`:** The chain ID for the Ethereum Mainnet.
- **`VITE_CHAIN_ID_TESTNET`:** The chain ID for the Ethereum Testnet.

    Ensure to replace placeholders like `your-moralis-api-key` with the actual API keys.

4. **Run the Development Server:** Start the development server locally using the following command:

    ```bash
    yarn dev
    ```

    The frontend will be accessible at `http://localhost:3000` or any other port specified in your Vite configuration.

5. **Building the Project:** If you need to build the project for production, run:

    ```bash
    yarn build
    ```

    The optimized build will be available in the `dist/` directory.

## Project Dependencies

The frontend project utilizes various dependencies including React, Vite, and several UI libraries. You can find the full list in the `package.json` file.

### Dev Dependencies

- `vite`: Build tool and development server.
- `typescript`: TypeScript for type safety.
- `@types/react`, `@types/react-dom`, `@types/web3`: Type declarations for React and Web3.
- `@vitejs/plugin-react`: Vite plugin for React.

### Dependencies

- `@emotion/core`, `@emotion/react`, `@emotion/styled`: CSS-in-JS styling libraries.
- `@mui/base`, `@mui/icons-material`, `@mui/lab`, `@mui/material`: Material-UI components.
- `@stripe/stripe-js`: Stripe SDK for payment processing.
- `@walletconnect/web3-provider`: Web3 provider for WalletConnect integration.
- `axios`: HTTP client for making requests.
- `formik`: Form library for React.
- `magic-sdk`: Magic SDK for passwordless authentication.
- `moralis`, `moralis-v1`: Moralis SDK for blockchain integration.
- `react-dropzone`, `react-lazy-load-image-component`, `react-multi-carousel`, `react-responsive-carousel`, `react-share`, `react-stickynode`, `react-time-ago`: React components for various functionalities.
- `web3`: Ethereum JavaScript API.
- `yup`: Schema validation library.
- `zustand`: State management library.

Ensure to keep your API keys and sensitive information secure. Do not share them in public files or repositories.

---

That's it! You're ready to start working with this project frontend. Happy coding! 🎉
