import {Routes, Route} from 'react-router-dom';

import Header from '../header/Header';
import ShopPage from '../../pages/ShopPage';
import CartPage from '../../pages/CartPage';

import '../../assets/scss/style.scss';
const App = () => {

    return (
            <div className='app' style={{'margin': '30px'}}>
                <Header/>
                <Routes>
                    <Route path='/' element={<ShopPage/>}/>
                    <Route path='/cart' element={<CartPage/>}/>
                </Routes> 
            </div> 
    )
}

export default App;
