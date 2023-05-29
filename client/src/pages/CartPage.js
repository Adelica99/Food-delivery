import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { changeSuccessfulOrder } from "../components/order/OrderSlice";

import CartForm from "../components/cartForm/CartForm";
import Order from "../components/order/Order";
import Spinner from "../components/spinner/Spinner";
import Error from "../components/error/Error";

import './cartPage.scss';

const CartPage = () => {
    const {orderLoadingStatus, successfulOrder} = useSelector(state => state.order);
    const dispatch = useDispatch();

    useEffect(() => {
        if (successfulOrder) {
            const timeout = setTimeout(() => {
                dispatch(changeSuccessfulOrder(false));
            }, 3000);
          
            return () => clearTimeout(timeout);
        }
    }, [successfulOrder])
    
    const spinner = orderLoadingStatus === 'loading' ? <div className="cartPage__loading"><Spinner/></div> : null;
    const message = successfulOrder === true ? <div className="cartPage__successfulOrder">Thank you for your order!</div> : null;
    const error = orderLoadingStatus === 'error' ? <div className="cartPage__error"><Error/></div> : null;
    return (
        <div className="cartPage">
            {spinner}
            {message}
            {error}
            <CartForm/>
            <Order/>
        </div>
    )
}

export default CartPage;