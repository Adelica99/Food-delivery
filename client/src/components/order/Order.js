import { useSelector, useDispatch } from 'react-redux';
import { increaseCounter, decreaseCounter, changeTotalPrice } from './OrderSlice';

import './order.scss';
import emptyCart from '../../assets/icons/empty-cart.svg';

const Order = () => {
    const { order, animation } = useSelector(state => state.order);
    const dispatch = useDispatch();

    const renderOrder = (arr) => {
        if (arr.length > 0) {
            const items = arr.map((item, i) => {
                return (
                    <li key={i} className="order__list-item">
                        <img src={`http://localhost:3001/${item.img}`} alt={item.title}/>
                        <div className="order__list-item-right">
                            <div className="order__list-item-title">{item.title}</div>
                            <div className="order__list-item-price">price: <span>{item.price}$</span></div>
                            <div className="order__counter">
                                <div onClick={() => {
                                        dispatch(decreaseCounter({_id: item._id, counter: item.counter}));
                                        dispatch(changeTotalPrice(-item.price));
                                }}
                                    className="order__counter-btn">-</div>
                                <span>{item.counter}</span>
                                <div onClick={() => {
                                        dispatch(increaseCounter(item._id));
                                        dispatch(changeTotalPrice(item.price));
                                }} className="order__counter-btn">+</div>
                            </div>
                        </div>
                    </li>
                )
            });

            return (
                <ul className="order__list">{items}</ul>
            )
        } else {
            return (
                <div className="order__list-empty">
                    <img src={emptyCart} alt="empty cart" />
                    <div className="order__list-empty-text">Cart is empty</div>
                </div>
            )
        }
    }

    const content = renderOrder(order);
    return (
        <div className="order" style={animation}>
            {content}
        </div>
    )
}

export default Order;