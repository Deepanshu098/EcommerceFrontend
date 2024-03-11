import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router , Routes , Route } from 'react-router-dom';
import Layout from './layouts/Layout';
import Home from './pages/Home/Home';
import Products from './pages/Products/Products';
import ProductDetails from './pages/ProductDetails/ProductDetails';
import Carts from './pages/Carts/Carts';
import UserProfile from './pages/UserProfile/UserProfile';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
import ForgotPassword from './pages/ForgotPassword/ForgotPassword';
import ResetPassword from './pages/ForgotPassword/ResetPassword';
import Shipping from './pages/Shipping/Shipping';
import Checkout from './pages/Checkout/Checkout';
import UserOrders from './pages/UserOrders/UserOrders';
import AdminLogin from './pages/AdminLogin/AdminLogin';
import CommonAdminLayout from './pages/Admin/CommonAdminLayout';
import AdminDashboard from './pages/Admin/AdminDashboard';
import AdminProductsPage from './pages/Admin/AdminProductsPage';
import AddProducts from './pages/Admin/AddProducts';
import AddCategory from './pages/Admin/AddCategory';
import Orders from './pages/Admin/Orders';
import  { Toaster } from 'react-hot-toast';
import Error from './pages/Error/Error';
import Payment from './pages/Payment/Payment';
import UserProtectedRoutes from './components/ProtectedRoutes/UserProtectedRoutes';
import AdminProtectedRoutes from './components/ProtectedRoutes/AdminProtectedRoutes';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useEffect, useState } from 'react';
import Loader from './components/Loader/Loader';

function App() {
  const [spin, setSpin] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setSpin(false)
    }, 3000)
  }, [])

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])

  const stripePromise = loadStripe("pk_test_51OnIM0SI9WsoGYkvxg1GHYbEDIM0SyKG1TqaMSAZ7EYJ23d2P74RUUd43D2yfZVWq6OhGdmNxmdYTDs6Y35gVc7m0080FgO3GB")
  return (
      <>
      {
        spin ? <Loader/>
        :
        <Elements stripe={stripePromise}>
        <Router>
          <Routes>
          {/* Admin Routes  */}
            <Route path='/admin/login' element={<Layout><AdminLogin/></Layout>}/>
            <Route path='/admin/dashboard' element={<CommonAdminLayout><AdminProtectedRoutes Components={AdminDashboard}/></CommonAdminLayout>}/>
            <Route path='/admin/addproducts' element={<CommonAdminLayout><AdminProtectedRoutes Components={AddProducts}/></CommonAdminLayout>}/>
            <Route path='/admin/addcategory' element={<CommonAdminLayout><AdminProtectedRoutes Components={AddCategory}/></CommonAdminLayout>}/>
            <Route path='/admin/orders' element={<CommonAdminLayout><AdminProtectedRoutes Components={Orders}/></CommonAdminLayout>}/>
            <Route path='/admin/products' element={<CommonAdminLayout><AdminProtectedRoutes Components={AdminProductsPage}/></CommonAdminLayout>}/>
          {/* User Routes */}
            <Route path='/' element={<Layout><Home/></Layout>}/>
            <Route path='/products' element={<Layout><Products/></Layout>}/>
            <Route path='/productdetails/:id' element={<Layout><ProductDetails/></Layout>}/>
            <Route path='/carts' element={<Layout><UserProtectedRoutes Components={Carts}/></Layout>}/>
            <Route path='/userprofile' element={<Layout><UserProtectedRoutes Components={UserProfile}/></Layout>}/>
            <Route path='/login' element={<Layout><Login/></Layout>}/>
            <Route path='/signup' element={<Layout><Signup/></Layout>}/>
            <Route path='/forgotpassword' element={<Layout><ForgotPassword/></Layout>}/>
            <Route path='/resetpassword/:id/:token' element={<Layout><ResetPassword/></Layout>}/>
            <Route path='/shipping' element={<Layout><UserProtectedRoutes Components={Shipping}/></Layout>}/>
            <Route path='/checkout' element={<Layout><UserProtectedRoutes Components={Checkout}/></Layout>}/>
            <Route path='/payment' element={<Layout><UserProtectedRoutes Components={Payment}/></Layout>}/>
            <Route path='/userorders' element={<Layout><UserProtectedRoutes Components={UserOrders}/></Layout>}/>
            <Route path='*' element={<Layout><Error/></Layout>}/>
          </Routes>
          <Toaster/>
        </Router>
        </Elements>
      }
      
      </>
  );
}

export default App;
