import { createWithEqualityFn } from "zustand/traditional";
import { storeTheme } from "@/store/Actions/theme/storeTheme";
import { storeUser } from "@/store/User/storeUser";
import { storeCarouselHome } from "@/store/Actions/homeCarousel/storeCarouselHome";
import { storeAlert } from "@/store/Actions/alert/storeAlert";
import { storeNfts } from "@/store/Actions/nfts/storeNfts";
import { storeLikes } from "@/store/Actions/likes/storeLikes";
import { storeUserAndOwnNft } from "@/store/Actions/userAndOwnNft/storeUserAndOwnNft";
import { storeFollow } from "@/store/Actions/follow/storeFollow";
import { storeInputSearch } from "@/store/Actions/inputSearch/storeInputSearch";
import { storeCertificates } from "@/store/Actions/certificates/storeCertificates";
import { storeCreateNft } from "@/store/Actions/createNft/storeCreateNft";
import { storeArtist } from "@/store/Actions/artist/storeArtist";
import { storeStepper } from "@/store/Actions/stepper/storeStepper";
import { storeCollection } from "@/store/Actions/collection/storeCollection";

export const useBoundStore = createWithEqualityFn((...a) => ({
  ...storeTheme(...a),
  ...storeUser(...a),
  ...storeCarouselHome(...a),
  ...storeAlert(...a),
  ...storeNfts(...a),
  ...storeLikes(...a),
  ...storeUserAndOwnNft(...a),
  ...storeFollow(...a),
  ...storeInputSearch(...a),
  ...storeCertificates(...a),
  ...storeCreateNft(...a),
  ...storeArtist(...a),
  ...storeStepper(...a),
  ...storeCollection(...a),
}));
