import {useEffect} from 'react';
import { useSelector, useDispatch} from 'react-redux';
import { fetchShop } from './ShopSlice';
import { addProduct, changeTotalPrice } from '../order/OrderSlice';

import Spinner from '../spinner/Spinner';
import Error from '../error/Error';

import './shop.scss';

const Shop = () => {
    const { menuItem } = useSelector(state => state.menu);
    const { shop, shopLoadingStatus } = useSelector(state => state.shop)
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(fetchShop(menuItem));
    }, [menuItem]);

    const renderShop = (arr) => {
        if (arr.length > 0) {
            const items = arr.map((item, i) => {
                return (
                    <li key={i} className="shop__list-item">
                        <img src={`http://localhost:3001/${item.img}`} alt={item.title} />
                        <div className="shop__list-item-title">{item.title}</div>
                        <div className="shop__list-item-bottom">
                            <div className="shop__list-item-price">{item.price}$</div>
                            <button onClick={() => {
                                dispatch(addProduct(item));
                                dispatch(changeTotalPrice(item.price))
                            }} 
                            className="shop__list-item-btn">buy</button>
                        </div>
                    </li>
                )
            })
    
            return (
                <ul className="shop__list">{items}</ul>
            )
        } else {
            return (
                <div className="shop__empty">Shop is empty</div>
            )
        }
    }

    const spinner = shopLoadingStatus === 'loading' ? <Spinner/> : null;
    const error = shopLoadingStatus === 'error' ? <Error/> : null;
    const content = !(spinner || error) ? renderShop(shop) : null;
    return (
        <div className="shop">
            {spinner}
            {error}
            {content}
        </div>
    )
}

export default Shop;