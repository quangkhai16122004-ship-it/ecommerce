import HomePage from '../pages/HomePage/HomePage.jsx'
import NotFoundPage from '../pages/NotFoundPage/NotFoundPage.jsx'
import OrderPage from '../pages/OrderPage/OrderPage.jsx'
import ProductDetailsPage from '../pages/ProductDetailsPage/ProductDetailsPage.jsx'
import ProductsPage from '../pages/ProductsPage/ProductsPage.jsx'
import SignInPage from '../pages/SignInPage/SignInPage.jsx'
import SignUpPage from '../pages/SignUpPage/SignUpPage.jsx'
import TypeProductPage from '../pages/TypeProductPage/TypeProductPage.jsx'
import ProfilePage from '../pages/Profile/ProfilePage.jsx'
import AdminPage from '../pages/AdminPage/AdminPage.jsx'
import PaymentPage from '../pages/PaymentPage/PaymentPage.jsx'
import OrderSuccessPage from '../pages/OrderSuccessPage/OrderSuccessPage.jsx'
export const routes = [
    {
        path: '/',
        page: HomePage,
        isShowHeader: true
    },
    {
        path:'/order',
        page: OrderPage,
        isShowHeader: true
    },
    {
        path:'/orderSuccess',
        page: OrderSuccessPage,
        isShowHeader: true
    },
    {
        path:'/payment',
        page: PaymentPage,
        isShowHeader: true
    },
    {
        path:'/products',
        page: ProductsPage,
        isShowHeader: true
    },
    {
        path:'/product/:type',
        page: TypeProductPage,
        isShowHeader: true
    },
    {
        path:'/sign-in',
        page: SignInPage,
        isShowHeader: false
    },
    {
        path:'/sign-up',
        page: SignUpPage,
        isShowHeader: false
    },
    {
        path:'/product-details/:id',
        page: ProductDetailsPage,
        isShowHeader: true
    },
    {
        path:'/profile-user',
        page: ProfilePage,
        isShowHeader: true
    },
    {
        path:'/system/admin',
        page: AdminPage,
        isShowHeader: false,
        isPrivate: true
    },
    {
        path:'*',
        page: NotFoundPage
    },
]