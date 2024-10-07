import * as ActionTypes from "../action/ActionType";

const initialState = {
    staticValue: null,
    activeCart: null,
    activeOfferTime: 0,
    homePageBanner: [],
    categoryList: [],
    addressList: [],
    productDetail: [],
    storeProduct: [],
    marketProduct: [],
    cartList: [],
    rewardPointsCases: {},
    paymentMethod: null,
    cartRes: {},
    selectedAddId: null,
    subCategory: null,
    recentlyViewed: [],
    terms: {},
    recentlySearch: [],
    spotiiToken: null
};

export default (state = initialState, action: any = {}) => {


    switch (action.type) {
        case ActionTypes.STATICVALUE:
            console.log("action", action.data)
            return {
                ...state,
                staticValue: action.data
            }
        case ActionTypes.ACTIVECART:
            console.log("action activecart", action.data)
            return {
                ...state,
                activeCart: action.data
            }
        case ActionTypes.HOMEPAGE_BANNER:
            console.log("action", action.data)
            return {
                ...state,
                homePageBanner: action.data
            }
        case ActionTypes.CATEGORY_LIST:
            return {
                // console.log("action", action.data)
                ...state,
                categoryList: action.data
            }
        case ActionTypes.ADDRESS_LIST:
            return {
                ...state,
                addressList: action.data
            }
        case ActionTypes.GET_PRODUCT:
            return {
                ...state,
                productDetail: action.data
            }
        case ActionTypes.GET_STOREPRODUCT:
            return {
                ...state,
                storeProduct: action.data
            }
        case ActionTypes.GET_MARKETPRODUCT:
            return {
                ...state,
                marketProduct: action.data
            }
        case ActionTypes.CART_LIST:
            return {
                ...state,
                cartList: action.data
            }
        case ActionTypes.CART_RES:
            return {
                ...state,
                cartRes: action.data
            }
        case ActionTypes.PAYMENT_METHOD:
            return {
                ...state,
                paymentMethod: action.data
            }
        case ActionTypes.REWARDPOINTSCASES:
            return {
                ...state,
                rewardPointsCases: action.data
            }
        case ActionTypes.SELECTEDADD_ID:
            return {
                ...state,
                selectedAddId: action.data
            }
        case ActionTypes.SUBCATEGORY:
            return {
                ...state,
                subCategory: action.data
            }
        case ActionTypes.RECENTELYVIEWED:
            return {
                ...state,
                recentlyViewed: [...state.recentlyViewed, action.data]
            }
        case ActionTypes.TERMSANDCONDOTIONS:
            return {
                ...state,
                terms: action.data
            }
        case ActionTypes.RECENTLY_SEARCH:
            return {
                ...state,
                recentlySearch: [...state.recentlySearch, action.data]
            }
        case ActionTypes.SPOTII_TOKEN:
            return {
                ...state,
                spotiiTiken: action.data
            }
        default:
            return (
                console.log("initialState", state),
                state
            )
    }
}
