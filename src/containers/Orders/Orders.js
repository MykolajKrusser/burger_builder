import React, {Component} from 'react';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Order from '../../components/Order/Order';
import Loader from '../../components/Ui/Loader/Loader';

class Orders extends Component{
    state={
        orders: [],
        loading: true
    }
    componentDidMount(){
        axios.get('/orders.json')
            .then(res =>{
                const fetchedOrders = []
                for(let key in res.data){
                    fetchedOrders.push({
                        ...res.data[key],
                        id: key
                    })
                }
                this.setState({loading: false, orders: fetchedOrders})
            })
            .catch(err=>{
                this.setState({loading: false})
            })
    }
    render(){
        let orders = this.state.orders.map(order=>{
            return <Order 
                key={order.id}
                ingredients={order.ingredients}
                price={+order.price}/>
        })
        
        let messege = <p style={{textAlign: "center"}}>You have no orders</p>

        if (this.state.orders.length === 0){
            orders = messege
        }

        if (this.state.loading){
            orders=<Loader/>
        }
        
        return(
            <div>
                {orders}
            </div>
        );
    }
}

export default withErrorHandler(Orders, axios);