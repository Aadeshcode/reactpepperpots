import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { userListReducer, userLoggedInReducer, userLoginReducer, userMembershipCheckReducer, userMembershipReducer, userRegisterReducer } from "./reducers/userReducers";
import {
  productCreateReducer,
  productDeleteReducer,
  productDetailsReducer,
  productListReducer,
  productReviewCreateReducer,
  productSuggestionReducer,
  productTopReducer,
  productUpdateReducer,
} from "./reducers/productReducers";
import { cartReducer } from "./reducers/cartReducers";
import { orderCreateReducer, orderDeliverReducer, orderDispatchReducer, orderFetchReducer, orderListMyReducer, orderListReducer } from "./reducers/orderReducers";
import { potCreateReducer, potDeleteReducer, potDetailsReducer, potDetailsTypeReducer, potListReducer, potListScreenReducer, potReviewCreateReducer, potsSuggestionReducer, potUpdateReducer } from "./reducers/potsReducers";
import { colorCreateReducer, colorDeleteReducer, colorDetailsReducer, colorListReducer, colorUpdateReducer } from "./reducers/colorReducers";
import { faqCreateReducer, faqDetailsReducer, faqListReducer, faqUpdateReducer } from "./reducers/faqReducers";
import { blogCreateReducer, blogDeleteReducer, blogsDetailsReducer, blogsListReducer, blogUpdateReducer } from "./reducers/blogsReducers";
import { addWholesaleReducer, getWholesaleReducer } from "./reducers/wholesaleReducers";
import { addCouponReducer, deleteCouponReducer, getCouponReducer, getCouponsReducer } from "./reducers/couponReducers";
import { restDetailsReducer, restListReducer, restUpdateReducer } from "./reducers/restReducers";

const reducer = combineReducers({
  userToken: userLoggedInReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  allUsers: userListReducer,
  userMembershipUpdate: userMembershipReducer,
  userMembershipCheck: userMembershipCheckReducer,
  productList: productListReducer,
  topProducts: productTopReducer,
  onlyOneProduct: productDetailsReducer,
  updatedProduct: productUpdateReducer,
  productReviewCreate: productReviewCreateReducer,
  createdProduct: productCreateReducer,
  deletedProduct: productDeleteReducer,
  productsSuggestions: productSuggestionReducer,
  potsList: potListReducer,
  potsListScreen: potListScreenReducer,
  onlyOnePot: potDetailsReducer,
  potsDetails: potDetailsTypeReducer,
  updatedPot: potUpdateReducer,
  createdPot: potCreateReducer,
  deletedPot: potDeleteReducer,
  potReviewCreate: potReviewCreateReducer,
  potsSuggestions: potsSuggestionReducer,
  colorsList: colorListReducer,
  onlyOneColor: colorDetailsReducer,
  updatedColor: colorUpdateReducer,
  createdColor: colorCreateReducer,
  deletedColor: colorDeleteReducer,
  cart: cartReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderFetchReducer,
  orders: orderListReducer,
  myOrders: orderListMyReducer,
  orderDelivered: orderDeliverReducer,
  orderDispatched: orderDispatchReducer,
  listFaq: faqListReducer,
  createFaq: faqCreateReducer,
  faqDetails: faqDetailsReducer,
  faqUpdate: faqUpdateReducer,
  blogsList: blogsListReducer,
  blogDetails: blogsDetailsReducer,
  blogsCreate: blogCreateReducer,
  blogsDelete: blogDeleteReducer,
  blogUpdate: blogUpdateReducer,
  addWholesale: addWholesaleReducer,
  getWholesale: getWholesaleReducer,
  couponsList: getCouponsReducer,
  couponsDetails: getCouponReducer,
  addCoupon: addCouponReducer,
  deleteCoupon: deleteCouponReducer,
  listRest: restListReducer,
  restDetails: restDetailsReducer,
  updateRest: restUpdateReducer
});
const userInfoFromStorage = localStorage.getItem("userCred")
  ? JSON.parse(localStorage.getItem("userCred"))
  : null;


const shippingAddressFromStorage = localStorage.getItem('ppshippingAddress')
  ? JSON.parse(localStorage.getItem('ppshippingAddress'))
  : {}
const giftMessageFromStorage = localStorage.getItem('ppgiftMessage')
  ? JSON.parse(localStorage.getItem('ppgiftMessage'))
  : ""
const paymentMethodFromStorage = localStorage.getItem('pppaymentMethod')
  ? JSON.parse(localStorage.getItem('pppaymentMethod'))
  : {}
const tokenFromStorage = localStorage.getItem('ppuserToken')
  ? JSON.parse(localStorage.getItem('ppuserToken'))
  : {}


const initialState = {
  cart: {
    cartItems: [],
    shippingAddress: shippingAddressFromStorage,
    giftMessage: giftMessageFromStorage,
    paymentMethod: paymentMethodFromStorage
  },
  userLogin: { userInfo: userInfoFromStorage },
  userToken: { token: { token: tokenFromStorage } },
}
const middleware = [thunk];
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
