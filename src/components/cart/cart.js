import React, { Component } from 'react'
import axios from 'axios'
import './cart.css'
import StripeCheckout from 'react-stripe-checkout'
const stripePublicKey = process.env.REACT_APP_STRIPE_PUBLIC_KEY;

export default class Cart extends Component {
        constructor() {
            super()
            
            this.state= {
                data: []
            }
        }
        componentDidMount() {
            this.getAllCart()
            this.deleteFromCart()
            this.updateQuantity()
        }
        getAllCart() {
            axios.get('/api/cart').then(response => {
                console.log(response.data)
                this.setState({data: response.data})
            } )
        }
        deleteFromCart(products){
            axios.delete(`/api/removefromcart/${products}`).then(response => {
                axios.get('api/cart').then(response => {
                    console.log('test2', response.data)
                 this.setState(
                    {data: response.data})   
                } )
            } )
        }
        updateQuantity(products, cartid) {
            axios.put(`/api/updatequantity/${products}/${cartid}`).then(response => {
                
                axios.get('api/cart').then(response => {
                   this.setState(
                    {data: response.data} 
                   )
                }) 
            })
        }
        totalPrice() {
            axios.get('/api/totalprice').then(response => {
                this.setState(
                    {data: response.data}
                )
            })
        }
        onToken = token => {
            console.log('token', token);
            token.card = void 0;
            const amount = 38400;
            axios.post('/api/payment', { token, amount })
              .then(charge => { console.log('charge response', charge.data) });
            
          }
        
    
        render() {
            const showCart = this.state.data.map((products, i) => {
                return <div className='cartitems'key={i}>
                    <h3 className='productName'>{products.product_name}</h3> 
                    <h4 className='productPrice'>${products.product_price}</h4>
                    <h5 className='productQty'>Qty:{products.quantity}</h5>
                    <img className='cartImage'style={{width: '50px'}} src={products.img} alt=''/>
                    <button className='cartbuttons'onClick={() =>{this.deleteFromCart(products.cartid)}}>XRemove</button>
                    <button className='cartbuttons'onClick={() =>{this.updateQuantity(products.quantity + 1, products.cartid)}}>Add More</button>
                    
                </div> 
             })
               
           
            return (
                <div>
                    
                    <div>
                      
                    </div>
                     {showCart}
                    <div>
                    <StripeCheckout className='pay'
                        token={this.onToken}
                         stripeKey={stripePublicKey}
                         amount={38400}
                     />
                    </div>
                </div>
                
            )
        }
}