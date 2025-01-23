// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import { createBrowserRouter, createRoutesFromElements, Navigate, Route, RouterProvider} from 'react-router-dom'
import Signup from './routes/Signup'
import Signin from './routes/Signin'
import Otp from './routes/Otp'
import ResetPassword from './routes/Resetpass'
import Forgotpass from './routes/Forgotpass'
import Layout from '../src/layout/Layout'
import Home from './routes/Home'
import NotFound from './routes/NotFound'
import { AuthContext } from './context/authContext'
import { use } from 'react';
import Dashboard from './components/Dashboard'
import SingleProduct from './routes/SingleProduct'
import Payment from './routes/Payment'
import Checkout from './routes/Checkout'
import Category from './routes/Category.jsx'
import Order from './routes/AdminAccess/order.jsx'
import Product from './routes/AdminAccess/Product.jsx'
import CreateProd from './routes/AdminAccess/createProd.jsx'
import Success from './routes/Success.jsx'


function App() {
    const { user } = use(AuthContext);
    const isExist = user?.user;
    const isAdmin = user?.admin;
    console.log("user:- ",isExist);

    const router = createBrowserRouter(
      createRoutesFromElements(
        <>
          <Route path='/signup' element={ <Signup /> } />
          <Route path='/otp' element={ <Otp />} />
          <Route path='/signin' element={ !isExist ?  <Signin /> : <Navigate to="/" /> } />
          <Route path='/forgotpass' element={ <Forgotpass /> } />
          <Route path='/resetPass/:token' element={ <ResetPassword /> } />
          <Route path='*' element={<NotFound />} />
  
          <Route path='/' element={ isExist ?  <Layout />  : <Navigate to="/signin" />}>
            <Route index element={<Home />} />
            <Route path='/product/:id' element={ <SingleProduct /> } />
            <Route path='/category/:id' element={<Category />} />
            <Route path='/checkout' element={ <Checkout /> }/>
          </Route> 

          {
            isExist &&
            <>
            <Route path='/dashboard' element={ isAdmin ?  <Dashboard /> : <Navigate to="/" /> } />
            <Route path='/order' element={<Order />} /> 
            <Route path='/product' element={<Product />} /> 
            <Route path='/create' element={ <CreateProd />} />
            {/* <Route path='/success/:orderId' element={ <Success /> } /> */}
            </>
          }

        </>
      )
    );
    
  return <RouterProvider router={router} /> 
}

export default App