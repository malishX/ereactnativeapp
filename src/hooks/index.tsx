import { useSelector } from "react-redux";

function getHooks() {
  const signup = useSelector((state: any) => state.auth.signup)
  const user = useSelector((state: any) => state.auth.loginUser);
  const location = useSelector((state: any) => state.auth.location)
  const address = useSelector((state: any) => state.auth.mapAddress)
  const retailer_id = useSelector((state: any) => state.auth.retailer_id)
  const isLogin = useSelector((state: any) => state.auth.isLogin)

  const staticValue = useSelector(
    (state: any) => state.home.staticValue
  );
  const activeCart = useSelector(
    (state: any) => state.home.activeCart
  );
  const categoryList = useSelector(
    (state: any) => state.home.categoryList
  );
  const addressList = useSelector(
    (state: any) => state.home.addressList
  );

  const homePageBanner = useSelector(
    (state: any) => state.home.homePageBanner
  );

  const getProduct = useSelector(
    (state: any) => state.home.productDetail
  )

  const storeProduct = useSelector(
    (state: any) => state.home.storeProduct
  )

  const marketProduct = useSelector(
    (state: any) => state.home.marketProduct
  )

  const cartList = useSelector(
    (state: any) => state.home.cartList
  )

  const cartRes = useSelector(
    (state: any) => state.home.cartRes
  )

  const paymentMethod = useSelector(
    (state: any) => state.home.paymentMethod
  )

  const rewardPointsCases = useSelector(
    (state: any) => state.home.rewardPointsCases
  )

  const selectedAddId = useSelector(
    (state: any) => state.home.selectedAddId
  )

  const subCategory = useSelector(
    (state: any) => state.home.subCategory
  )

  const recentlyViewed = useSelector(
    (state: any) => state.home.recentlyViewed
  )

  const terms = useSelector(
    (state: any) => state.home.terms
  )

  const recentlySearch = useSelector(
    (state: any) => state.home.recentlySearch
  )

  const spotiiToken = useSelector(
    (state: any) => state.home.spotiiToken
  )

  return {
    isLogin,
    retailer_id,
    user,
    signup,
    location,
    address,
    staticValue,
    activeCart,
    categoryList,
    addressList,
    homePageBanner,
    getProduct,
    storeProduct,
    marketProduct,
    cartList,
    cartRes,
    paymentMethod,
    rewardPointsCases,
    selectedAddId,
    subCategory,
    recentlyViewed,
    terms,
    recentlySearch,
    spotiiToken
  };
}

export default getHooks;
