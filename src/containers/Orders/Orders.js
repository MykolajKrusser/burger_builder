import React, {Component} from 'react';
import {connect} from 'react-redux';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Order from '../../components/Order/Order';
import Loader from '../../components/Ui/Loader/Loader';
import * as actions from '../../store/actions/index';

class Orders extends Component{

    componentDidMount(){
       this.props.onFetchOrders();
    };

    render(){
        let orders=<Loader/>
        
        if(!this.props.loading){
            orders = this.props.orders.map(order=>{
                return <Order 
                    key={order.id}
                    ingredients={order.ingredients}
                    price={+order.price}/>
            });
        }
        
        let messege = <p style={{textAlign: "center"}}>You have no orders</p>;

        if (this.props.orders.length === 0){
            orders = messege
        };
        
        return(
            <div>
                {orders}
            </div>
        );
    };
};

const mapStateToProps = state=>{
    return{
        orders: state.order.orders,
        loading: state.order.loading
    };
};

const mapDispatchToProps = dispatch=>{
    return{
        onFetchOrders: ()=> dispatch(actions.fetchOrders())
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));