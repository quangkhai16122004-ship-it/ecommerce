import HomePage from '../pages/HomePage/HomePage.jsx'
import NotFoundPage from '../pages/NotFoundPage/NotFoundPage.jsx'
import OrderPage from '../pages/OrderPage/OrderPage.jsx'
import ProductsPage from '../pages/ProductsPage/ProductsPage.jsx'
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
        path:'/products',
        page: ProductsPage,
        isShowHeader: true
    },
    {
        path:'*',
        page: NotFoundPage
    },
]