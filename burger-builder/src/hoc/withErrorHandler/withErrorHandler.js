import React, {Component} from 'react';
import Wrap from '../Wrap/Wrap';
import Modal from '../../components/Ui/Modal/Modal';

const errorHandler = (WrappedComponent, axios)=>{
    return class extends Component{
        state={
            error: null
        }
        componentWillMount(){
            axios.interceptors.request.use(req => {
                this.setState({error: null})
                return req
            })
            axios.interceptors.response.use(res => res, error=>{
                this.setState({error: error})
            })
        }

        errorConfirmedHandler=()=>{
            this.setState({error: null})
        }
        render(){
            return(
                <Wrap>
                    <Modal 
                        modalClosed={this.errorConfirmedHandler}
                        show={this.state.error}>
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props}/>
                </Wrap>
            );
        }
    }
}

export default errorHandler;