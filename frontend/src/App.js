import React, { useState, useEffect } from "react";
import HomeScreen from "./screens/HomeScreen";
import Navbar from "./components/Navbar";
import SideMenu from "./components/SideMenu";
import Footer from "./components/Footer";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LoginScreen from "./screens/LoginScreen";
import PlantScreen from "./screens/PlantScreen";
import SignupScreen from "./screens/SignupScreen";
import AdminProductListScreen from "./screens/AdminProductListScreen";
import ProductEditScreen from "./screens/AdminProductEditScreen";
import StoreScreen from "./screens/StoreScreen";
import Cart from "./screens/Cart";
import ShippingScreen from "./screens/ShippingScreen";
import ContactUsScreen from "./screens/ContactUsScreen";
import PaymentMethod from "./screens/PaymentMethod";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";
import AdminOrderList from "./screens/AdminOrderList";
import AdminUsersList from "./screens/AdminUsersList";
import PotsStoreScreen from "./screens/PotsStoreScreen";
import PotsScreen from "./screens/PotsScreen";
import AdminBlogCreateScreen from "./screens/AdminBlogCreateScreen";
import ProfileScreen from "./screens/ProfileScreen";
import { auth } from "./firebase";
import { useDispatch } from "react-redux";
import ForgetPasswordScreen from "./screens/ForgetPasswordScreen";
import AdminPotEditScreen from "./screens/AdminPotEditScreen";
import AdminColorCreateScreen from "./screens/AdminColorCreateScreen";
import { getCartItems } from "./actions/cartActions";
import AdminPotsListScreen from "./screens/AdminPotsListScreen";
import FAQListScreen from "./screens/FAQListScreen";
import FAQCreateScreen from "./screens/FAQCreateScreen";
import FAQScreen from "./screens/FAQScreen";
import AdminBlogListScreen from "./screens/AdminBlogListScreen";
import BlogsScreen from "./screens/BlogsScreen";
import OneBlogScreen from "./screens/OneBlogScreen";
import AdminPotEditVariants from "./screens/AdminPotEditVariants";
import AdminColorListScreen from "./screens/AdminColorListScreen";
import WholeSalerScreen from "./screens/WholeSalerScreen";
import AdminWholesaleScreen from "./screens/AdminWholesaleScreen";
import EsewaConfirmation from "./screens/EsewaConfirmation";
import Loader from "./components/Loader";
import MessengerCustomerChat from 'react-messenger-customer-chat';
import AdminCouponCreateScreen from "./screens/AdminCouponCreateScreen";
import CouponListScreen from "./screens/CouponListScreen";
import AdminRestListScreen from "./screens/AdminRestListScreen";
import AdminRestUpdateScreen from "./screens/AdminRestUpdateScreen";
import TermsAndConditions from "./screens/TermsAndConditions";
import PrivacyPolicy from "./screens/PrivacyPolicy";
import Membership from "./screens/Membership";
import MembershipScreen from "./screens/MembershipScreen";
import { userMembershipCheck } from "./actions/userActions";
function App() {

  const [classChanger, setClassChanger] = useState("");
  const dispatch = useDispatch()
  const [loggingIn, setLoggingIn] = useState(true)
  useEffect(() => {
    setLoggingIn(true)
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      
      if (user) {
        const idTokenResult = await user.getIdTokenResult(/* forceRefresh */ true);
        dispatch({
          type: "LOGGED_IN_USER",
          payload: {
            email: user.email,
            token: idTokenResult.token,
            emailVerified: user.emailVerified
          },
        });
        localStorage.setItem('ppuserToken', JSON.stringify(idTokenResult.token))
        dispatch(getCartItems())
        dispatch(userMembershipCheck())
      }
      setLoggingIn(false)
    });
    

    // cleanup
    return () => unsubscribe();

  }, [dispatch]);
  return (
    <Router>
      <div className="App">
        <main>
          <MessengerCustomerChat
            pageId="1644599515815330"
            appId="188355769566229"
            htmlRef="<REF_STRING>"
          />

          <SideMenu cc={classChanger} scc={setClassChanger} />

          <div>
            <Navbar cc={classChanger} scc={setClassChanger} />

            {loggingIn ? <Loader /> : <Switch>
              <Route path="/product/plant/:id" component={PlantScreen} exact />
              <Route path="/product/pot/:slug" component={PotsScreen} exact />
              <Route path="/" component={HomeScreen} exact />
              <Route path="/Login" component={LoginScreen} exact />
              <Route path="/forgetpassword" component={ForgetPasswordScreen} exact />
              <Route path="/profile" component={ProfileScreen} exact />
              <Route path="/signup" component={SignupScreen} exact />
              <Route path="/store" component={StoreScreen} exact />
              <Route path="/store/search" component={StoreScreen} exact />
              <Route path="/store/pots/search" component={PotsStoreScreen} exact />
              <Route path="/store/pots" component={PotsStoreScreen} exact />
              <Route path="/store/pots/bestseller" component={PotsStoreScreen} exact />
              <Route path="/shipping" component={ShippingScreen} exact />
              <Route path="/esewa/success" component={EsewaConfirmation} exact />
              <Route path="/blogs/:slug" component={OneBlogScreen} exact />
              <Route path="/admin/:slug/editblog" component={AdminBlogCreateScreen} exact />
              <Route path="/blogs" component={BlogsScreen} exact />
              <Route path="/membership" component={Membership} exact />
              <Route path="/members" component={MembershipScreen} exact />
              <Route path="/wholesalers" component={WholeSalerScreen} exact />
              <Route path="/admin/blog" component={AdminBlogListScreen} exact />
              <Route path="/admin/createblog" component={AdminBlogCreateScreen} exact />
              <Route path="/payment" component={PaymentMethod} exact />
              <Route path="/locations" component={ContactUsScreen} exact />
              <Route path="/terms-and-conditions" component={TermsAndConditions} exact />
              <Route path="/privacy-policy" component={PrivacyPolicy} exact />
              <Route path="/frequently-asked-questions" component={FAQScreen} exact />
              <Route path="/order" component={PlaceOrderScreen} exact />
              <Route path="/order/:id" component={OrderScreen} exact />
              <Route path="/cart/:id?" component={Cart} exact />
              <Route path="/admin/products" component={AdminProductListScreen} exact />
              <Route path="/admin/pots" component={AdminPotsListScreen} exact />
              <Route path="/admin/products" component={AdminProductListScreen} exact />
              <Route path="/admin/:id/edit" component={ProductEditScreen} exact />
              <Route path="/admin/createproduct" component={ProductEditScreen} exact />
              <Route path="/admin/:id/editpot" component={AdminPotEditVariants} exact />
              <Route path="/admin/createpot" component={AdminPotEditScreen} exact />
              <Route path="/admin/:id/editcolor" component={AdminColorCreateScreen} exact />
              <Route path="/admin/createcolor" component={AdminColorCreateScreen} exact />
              <Route path="/admin/colors" component={AdminColorListScreen} exact />
              <Route path="/admin/faq" component={FAQListScreen} exact />
              <Route path="/admin/createfaq" component={FAQCreateScreen} exact />
              <Route path="/admin/wholesalers" component={AdminWholesaleScreen} exact />
              <Route path="/admin/:id/editfaq" component={FAQCreateScreen} exact />
              <Route path="/admin/orders" component={AdminOrderList} exact />
              <Route path="/admin/users" component={AdminUsersList} exact />
              <Route path="/admin/coupons/create" component={AdminCouponCreateScreen} exact />
              <Route path="/admin/coupons" component={CouponListScreen} exact />
              <Route path="/admin/rest" component={AdminRestListScreen} exact />
              <Route path="/admin/rest/create/:field" component={AdminRestUpdateScreen} exact />
            </Switch>
            }
            <Footer />
          </div>


        </main>
      </div>
    </Router>
  );
}

export default App;
