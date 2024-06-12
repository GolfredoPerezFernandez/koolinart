import { useContext, useEffect } from "react";
import { HomeContext } from "@/context/Home/HomeContext";
import { UserContext } from "@/context/User/UserContext";
import { SubscriptionsContext } from "@/context/Subscriptions/SubscriptionsContext";
import { useBoundStore } from "@/store/index";
import { shallow } from "zustand/shallow";
const useDataRenderHome = () => {
  const {
    GetCarouselInit,
    GetCarouselLive,
    GetCarouselTopSellers,
    GetCarouselExplore,
    GetCarouselCollection,
  } = useContext(HomeContext);
  const { SubscriptionNftCarouselLive } = useContext(SubscriptionsContext);
  const { clearDataUser } = useContext(UserContext);
  const { UserRender } = useBoundStore((state) => state, shallow);
  useEffect(() => {
    if (!UserRender) {
      clearDataUser();
    }
    async function fetchData() {
      await SubscriptionNftCarouselLive();
      await GetCarouselInit();
      await GetCarouselLive();
      await GetCarouselTopSellers();
      await GetCarouselExplore();
      await GetCarouselCollection();
    }
    fetchData();
  }, []);
};
export default useDataRenderHome;
