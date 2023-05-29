import Sidebar from "../components/sidebar/Sidebar";
import Shop from "../components/shop/Shop";

const ShopPage = () => {
    return (
        <div className="shopPage" style={{'display': 'grid', 
                                          'gridTemplateColumns': '25% 75%',
                                          'height': 'calc(100vh - 70px)', 
                                          'gap': '20px', 
                                          'padding': '40px'}}>
            <Sidebar/>
            <Shop/>
        </div>
    )
}

export default ShopPage;