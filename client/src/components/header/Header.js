import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { changeOrder } from '../order/OrderSlice';
import { changeTotalPrice } from '../order/OrderSlice';

import './header.scss'
import cart from '../../assets/icons/cart-1-svgrepo-com.svg'

const Header = () => {
    const { order } = useSelector(state => state.order);
    const counter = order.reduce((accumulator, currentItem) => accumulator + currentItem.counter, 0);
    const dispatch = useDispatch();

    useEffect(() => {
        const userProductCartFromLocalStorage = JSON.parse(localStorage.getItem('userProductCart'));
        const totalPriceFromLocalStorage = JSON.parse(localStorage.getItem('totalPrice'));
        if(userProductCartFromLocalStorage) {
            dispatch(changeOrder(userProductCartFromLocalStorage));
            dispatch(changeTotalPrice(totalPriceFromLocalStorage));
        }
    }, [])

    return (
        <header className="header">
            <nav>
                <ul className="header__list">
                    <li className="header__list-item">
                        <h3><Link to='/'>Shop</Link></h3>
                    </li>
                    <li className="header__list-item">
                        <h3><Link to='/cart'>Shoping cart</Link><img src={cart} alt="cart"/></h3>
                        <div className="header__list-item-lable">{counter}</div>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default Header;