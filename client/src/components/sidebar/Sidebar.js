import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useRef } from 'react';
import { changeMenu } from './SidebarSlice';

import './sidebar.scss';

import Mcdonny from '../../assets/icons/food-1-svgrepo-com.svg';
import Sushigo from '../../assets/icons/sushi-svgrepo-com.svg';
import Healthyfood from '../../assets/icons/healthy-food-symbol-of-an-apple-with-a-heart-svgrepo-com.svg';

const Sidebar = () => {
    const { totalPrice, order } = useSelector(state => state.order);
    const { menuItem } = useSelector(state => state.menu);
    const dispatch = useDispatch();
    const menu = [
        {
            name: 'Mc Donny',
            img: Mcdonny
        },
        {
            name: 'Sushi Go',
            img: Sushigo
        },
        {
            name: 'Healthy Food',
            img: Healthyfood
        }
    ];
    const sidebarItemsRef = useRef([]);

    useEffect(() => {
        const onHoverItem = (item) => {
            item.querySelectorAll('img')[0].classList.add('sidebar__item-list_hover');
        }

        const onLeaveItem = (item) => {
            item.querySelectorAll('img')[0].classList.remove('sidebar__item-list_hover');
        }

        sidebarItemsRef.current.forEach(item => item.addEventListener('mouseenter', () => onHoverItem(item)));
        sidebarItemsRef.current.forEach(item => item.addEventListener('mouseleave', () => onLeaveItem(item)));

    }, []);

    useEffect(() => {
        sidebarItemsRef.current.forEach(item => {
            if (item.innerText === menuItem) {
                item.classList.add('sidebar__item-list_active');
            } else {
                item.classList.remove('sidebar__item-list_active');
            }
        });
    }, [menuItem]);

    const ondisableItemMenu = () => {
        sidebarItemsRef.current.forEach(item => {
            if (item.innerText !== order[0].shop) item.classList.add('sidebar__item-list_disable')
            else item.classList.remove('sidebar__item-list_disable')
        }) 
    }

    const renderMenu = (arr) => {
        const menuItems = arr.map((item, i) => {
            return (
                <li key={i} 
                    ref={ el => sidebarItemsRef.current[i] = el} 
                    className="sidebar__list-item"
                    onClick={order.length < 1 ? () => dispatch(changeMenu(item.name)) : ondisableItemMenu()}>    
                    <h3>
                        <img src={item.img} alt="Mc Donny" />
                        {item.name}
                    </h3>
                </li>
            )
        })

        return (
            <ul className="sidebar__list">{menuItems}</ul>
        )
    }

    const content = renderMenu(menu);
    return (
        <div className="sidebar">
            <h2 className="sidebar__title">Shops</h2>
            <nav>
                {content}
            </nav>
            <div className="sidebar__total">Total price: <span>{totalPrice}$</span></div>
        </div>
    )
}

export default Sidebar;