import * as yup from "yup";

const usernameSignUp = /^(\S+$)/g;
const passwordRules =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#.*%&@\$%\^&\*])(?=.{8,})/;
const minPriceVerify = /^[0-9]*$/;
const usernameMatch =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#.*\$%\^&\*])(?=.{8,})/;

export const SignInValidation = yup.object().shape({
  username: yup
    .string()
    .min(5, "User Name must be at least 5 characters long")
    .max(25, "User name  must contain a maximum of 25 characters")
    .matches(usernameSignUp, "spaces not allowed")
    .required("Required, Please Enter your User Name"),
  password: yup
    .string()
    .matches(
      passwordRules,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
    )
    .required("Required, Please Enter your password"),
});
export const SignUpValidation = yup.object().shape({
  fullname: yup
    .string()
    .min(5, "Full Name must be at least 5 characters long")
    .max(65, "Full name  must contain a maximum of 65 characters")
    .required("Required, Please Enter your Full Name"),
  username: yup
    .string()
    .min(5, "User Name must be at least 5 characters long")
    .max(25, "User name  must contain a maximum of 25 characters")
    .matches(usernameSignUp, "spaces not allowed")
    .required("Required, Please Enter your User Name"),
  email: yup
    .string()
    .max(255)
    .required("Email is required")
    .matches(/^[^@]+@[^@]+\.[^@]+$/, "Email must contain '@' before '.'"),
  password: yup
    .string()
    .required("Please Enter your password")
    .matches(
      passwordRules,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character: ! @ # . * % & @"
    ),
  repeatPassword: yup
    .string()
    .required("Repeat Password is required")
    .when("password", {
      is: (val: string | any[]) => (val && val.length > 0 ? true : false),
      then: yup
        .string()
        .oneOf([yup.ref("password")], "Both password need to be the same"),
    }),
});
export const CreateCollectionValidation = yup.object().shape({
  theFile: yup.mixed().nullable().required("Required"),

  nameCollection: yup
    .string()
    .min(3, "Name Collection must be at least 3 characters long")
    .max(25, "Name Collection must contain a maximum of 20 characters")
    .required("Required, Please Enter your Name Collection"),

  symbol: yup
    .string()
    .min(3, "symbol must contain at least 3 characters")
    .max(6, "symbol must contain a maximum of 6 characters")
    .matches(usernameSignUp, "spaces not allowed")
    .required("Required, Please Enter symbol"),

  descriptionCollection: yup
    .string()
    .min(15, "Decription Collection must be at least 15 characters long")
    .max(200, "Decription Collection must contain a maximum of 200 characters")
    .required("Required, Please Enter decription Collection"),
});
export const CreateNftValidation = yup.object().shape({
  identificationImgNft: yup.mixed().required("Required"),

  NftData: yup.mixed().required("Required"),

  typeFile: yup.string(),

  extensionFileType: yup.string(),

  marketType: yup.mixed().nullable(),

  nameNftField: yup
    .string()
    .min(7, "Name must be at least 7 characters long")
    .max(25, "name must contain a maximum 20 characters")
    .required("Required"),

  descriptionNft: yup
    .string()
    .min(10, "Description must be at least 10 characters long")
    .max(200, "Description must contain maximum 200 characters")
    .required("Required"),

  price: yup
    .number()
    .max(10000000, "amount not allowed maximum 10.000.000")
    .min(0, "The price cannot be negative"),

  minimumBid: yup
    .number()
    .max(10000000, "amount not allowed maximum 10.000.000")
    .min(0, "The price cannot be negative")
    .test(
      "minimumBid",
      "The minimum bid must be at least 80% of the price.",
      function (value) {
        const price = this.parent.price; // Access the price field value
        if (value && price) {
          const minimumBidPercentage = Math.floor((value / price) * 100);
          return minimumBidPercentage <= 80;
        }
        return true;
      }
    ),
});
export const PlaceForSaleBIdsValidation = yup.object().shape({
  price: yup
    .number()
    .max(10000000000, "amount not allowed maximum 10.000.000.000")
    .min(0, "The price cannot be negative")
    .required(`Required`),

  minimumBid: yup
    .number()
    .max(10000000000, "amount not allowed maximum 10.000.000.000")
    .min(0, "The price cannot be negative")
    .test(
      "minimumBid",
      "The minimum bid must be at least 80% of the price.",
      function (value) {
        const price = this.parent.price; // Access the price field value
        if (value && price) {
          const minimumBidPercentage = Math.floor((value / price) * 100);
          return minimumBidPercentage <= 80;
        }
        return true;
      }
    ),
});
export const SettingsValidation = yup.object().shape({
  userAvatar: yup.mixed().nullable(),
  userBanner: yup.mixed().nullable(),
  fullname: yup
    .string()
    .min(5, "Full Name must be at least 5 characters long")
    .max(65, "Full name  must contain a maximum of 65 characters"),
  username: yup
    .string()
    .min(5, "User Name must be at least 5 characters long")
    .max(25, "User name  must contain a maximum of 25 characters")
    .matches(usernameSignUp, "spaces not allowed"),
  email: yup
    .string()
    .max(255)
    .matches(/^[^@]+@[^@]+\.[^@]+$/, "Email must contain '@' before '.'"),
  biography: yup
    .string()
    .min(10, "Description must be at least 10 characters long")
    .max(200, "Description must contain maximum 200 characters"),
});
export const RecoverPasswordInValidation = yup.object().shape({
  email: yup.string().email("Must be a valid email").max(255),
});

/* The code `export const createNftPerfilNft = yup.object().shape({ ... })` is defining a Yup
validation schema for creating a NFT (Non-Fungible Token) in a user's profile. The schema includes
validation rules for the fields `price`, `minimumBid`, and `minPrice`. */
export const createNftPerfilNft = yup.object().shape({
  price: yup
    .string()
    .max(11, "amount not allowed maximum 10.000.000.000")
    .matches(minPriceVerify, "negative numbers are not allowed"),

  minimumBid: yup.lazy((value: any) => {
    if (
      value !== undefined &&
      value !== null &&
      value !== "" &&
      value !== "0"
    ) {
      return yup
        .string()
        .max(11, "amount not allowed maximum 10.000.000.000")
        .matches(minPriceVerify, "negative numbers are not allowed")
        .test(
          "minimumBid",
          "The minimum bid must be at least 80% of the price.",
          function (value: any) {
            const price = this.resolve(yup.ref("price")) as string;
            if (value && price) {
              const minimumBid = parseFloat(value);
              const priceValue = parseFloat(price);
              const minimumBidPercentage = Math.floor(
                (minimumBid / priceValue) * 100
              );
              return minimumBidPercentage <= 80;
            }
            return true;
          }
        );
    }
    return yup.string();
  }),

  minPrice: yup.number(),
});

/* The code `export const RecoverEmail = yup.object().shape({ email: yup.string().email("Must be a
valid email").max(255), });` is defining a Yup validation schema for validating the input value of
an email field in a form related to email recovery. */

export const RecoverEmail = yup.object().shape({
  email: yup.string().email("Must be a valid email").max(255),
});

export const CreateBids = yup.object().shape({
  minBids: yup
    .string()
    .matches(minPriceVerify, "negative numbers are not allowed"),
});
