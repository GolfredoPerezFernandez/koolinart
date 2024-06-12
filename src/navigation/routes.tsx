import * as React from "react";
import { Route, Routes } from "react-router-dom";
import { Grid, CircularProgress, CardMedia, Toolbar } from "@mui/material";
import { PrivateRoutes, PublicRoutes } from "@/models";
import { AuthGuard } from "@/guard";

import ModalSteppper from "@/components/modals/modalStepper";

import AlertGlobal from "@/components/alert/alert";
import Navbar from "@/components/navBar/navBar";
import Footer from "@/components/footer/footer";

const Home = React.lazy(() => import("@/screens/home"));
const Explore = React.lazy(() => import("@/screens/explore"));
const Activity = React.lazy(() => import("@/screens/activity"));
const Nfts = React.lazy(() => import("@/screens/Nfts"));
const Collections = React.lazy(() => import("@/screens/collections"));
const Artists = React.lazy(() => import("@/screens/artists"));
const ProfileUser = React.lazy(() => import("@/screens/profileUser"));
const HowItWorks = React.lazy(() => import("@/screens/how-it-works"));
const PrivacyAndTerms = React.lazy(() => import("@/screens/privacy-and-terms"));
const CreateNft = React.lazy(() => import("@/screens/createNft"));
const SignIn = React.lazy(() => import("@/screens/signIn"));
const SignUp = React.lazy(() => import("@/screens/signUp"));
const ProfileNft = React.lazy(() => import("@/screens/profileNft/profileNft"));
const ProfileCollection = React.lazy(
  () => import("@/screens/profileCollection")
);
const ProfileArtist = React.lazy(() => import("@/screens/profileArtist"));
const RecoverPassword = React.lazy(() => import("@/screens/recoverPassword"));
const CertificateMovement = React.lazy(
  () => import("@/screens/certificateMovement")
);

const PaymentSuccess = React.lazy(() => import("@/screens/payment-success"));
const PaymentError = React.lazy(() => import("@/screens/payment-failed"));
const Payments = React.lazy(() => import("@/screens/payments"));

export default function Navigator() {
  let logotipo_koolinart_v1 =
    "https://ipfs.moralis.io:2053/ipfs/QmciCp2vBFZz3Hh9GuKBQdWdgvsS3DMUNMdMdsVzZ6r2US/0xE568887Bf75AeA78147730CC4101aDf09626759E/logotipo_koolinart_v1.svg";

  return (
    <React.Suspense
      fallback={
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justifyContent="center"
          sx={{
            backgroundColor: "common.tree",
            width: "100%",
            height: "100vh",
          }}
        >
          <CardMedia
            component="img"
            image={logotipo_koolinart_v1}
            alt="Koolinart Logo"
            sx={{
              width: { xs: 150, sm: 150, md: 200, lg: "497px", xl: 300 },
              objectFit: "cover",
            }}
          />
          <CircularProgress
            style={{ color: "#C02327" }}
            sx={{ m: 2 }}
            size="68px"
          />
        </Grid>
      }
    >
      <Toolbar
        sx={{
          m: "10px",
        }}
      />
      <Navbar />
      <AlertGlobal />
      <ModalSteppper />
      <Routes>
        <Route path={PublicRoutes.Home} element={<Home />} />
        <Route path={PublicRoutes.Explore} element={<Explore />} />
        <Route path={PublicRoutes.Activity} element={<Activity />} />
        <Route path={PublicRoutes.Nfts} element={<Nfts />} />
        <Route path={PublicRoutes.collections} element={<Collections />} />
        <Route path={PublicRoutes.Artists} element={<Artists />} />
        <Route path={PublicRoutes.profileArtist} element={<ProfileArtist />} />
        <Route
          path={PublicRoutes.profileCollection}
          element={<ProfileCollection />}
        />
        <Route path={PublicRoutes.profileNft} element={<ProfileNft />} />
        <Route path={PublicRoutes.HowItWorks} element={<HowItWorks />} />
        <Route
          path={PublicRoutes.PrivacyAndTerms}
          element={<PrivacyAndTerms />}
        />
        <Route path={PublicRoutes.SignIn} element={<SignIn />} />
        <Route path={PublicRoutes.SignUp} element={<SignUp />} />
        <Route
          path={PublicRoutes.RecoverPassword}
          element={<RecoverPassword />}
        />
        <Route
          path={PublicRoutes.CertificateMovement}
          element={<CertificateMovement />}
        />
        <Route element={<AuthGuard />}>
          <Route path={PrivateRoutes.User} element={<ProfileUser />} />
          <Route
            path={PrivateRoutes.PaymentFailed}
            element={<PaymentError />}
          />
          <Route
            path={PrivateRoutes.PaymentSuccess}
            element={<PaymentSuccess />}
          />
          <Route path={PrivateRoutes.Payment} element={<Payments />} />
          <Route path={PrivateRoutes.CreateNft} element={<CreateNft />} />
        </Route>
      </Routes>
      <Footer />
    </React.Suspense>
  );
}
