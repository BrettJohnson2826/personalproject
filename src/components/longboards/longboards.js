import React, { Component } from 'react'
import axios from 'axios'
import './longboard.css'





export default class Longboard extends Component {
        constructor(){
            super()

            this.state = {
                data: [ {}, {}, {}, {}, {}, {}, {}, {} ]
            }
        }
     componentDidMount() {
        this.getAllLongboards()   //when it is put in redux change to this.props.getAllLongboards
       
    }
    
    getAllLongboards() {
        axios.get('/api/longboards').then(response => {
            console.log(response.data)
            this.setState({data: response.data})
            } )
            
    }
    addToCart(productsID) {
        console.log(productsID)
        axios.post('/api/addToCart', { productsID })
    }

   
    
    render() {
    
        return (
            <div>
            <div className='longboardpage1'>
              
                
                <div className='product1'>
                   <img className='productimg'src={this.state.data[3].img} alt='arbor' />   
                   <p className='productname'>{this.state.data[3].product_name}</p>
                   <p className='productprice'>${this.state.data[3].product_price}</p>
          
                   <button className='twobutton'onClick={e =>{this.addToCart(this.state.data[3].productsid)}}>+ Add To Cart</button>
           
                
                </div>
                <div className='product2'>
                    <img className='productimg'src={this.state.data[0].img} alt='sector9' />  
                    <p className='productname'>{this.state.data[0].product_name}</p>
                    <p className='productprice'>${this.state.data[0].product_price}</p>
                    <button className='twobutton'onClick={e =>{this.addToCart(this.state.data[0].productsid)}}>+ Add To Cart</button>
                </div>
                <div className='product3'>
                    <img className='productimg'src={this.state.data[1].img} alt='landyachtz' />
                    <p className='productname'>{this.state.data[1].product_name}</p>
                    <p className='productprice'>${this.state.data[1].product_price}</p>
                    <button className='twobutton'onClick={e =>{this.addToCart(this.state.data[1].productsid)}}>+ Add To Cart</button>
                </div>
                <div className='product4'>
                    <img className='productimg'src={this.state.data[2].img} alt='santacruz' />                    
                    <p className='productname'>{this.state.data[2].product_name}</p>
                    <p className='productprice'>${this.state.data[2].product_price}</p>
                    <button className='twobutton'onClick={e =>{this.addToCart(this.state.data[2].productsid)}}>+ Add To Cart</button>
                </div>
           
            </div>
            <div className='longboardpage2'>
              
                
              <div className='product5'>
                 <img className='productimg2'src={this.state.data[4].img} alt='1' />   
                 <p className='productname2'>{this.state.data[4].product_name}</p>
                 <p className='productprice2'>${this.state.data[4].product_price}</p>
        
                 <button className='onebutton'onClick={e =>{this.addToCart(this.state.data[4].productsid)}}>+ Add To Cart</button>
         
              
              </div>
              <div className='product6'>
                  <img className='productimg2'src={this.state.data[5].img} alt='2' />  
                  <p className='productname2'>{this.state.data[5].product_name}</p>
                  <p className='productprice2'>${this.state.data[5].product_price}</p>
                  <button className='onebutton'onClick={e =>{this.addToCart(this.state.data[5].productsid)}}>+ Add To Cart</button>
              </div>
              <div className='product7'>
                  <img className='productimg2'src={this.state.data[6].img} alt='3' />
                  <p className='productname2'>{this.state.data[6].product_name}</p>
                  <p className='productprice2'>${this.state.data[6].product_price}</p>
                  <button className='onebutton'onClick={e =>{this.addToCart(this.state.data[6].productsid)}}>+ Add To Cart</button>
              </div>
              <div className='product8'>
                  <img className='productimg2'src={this.state.data[7].img} alt='4' />                    
                  <p className='productname2'>{this.state.data[7].product_name}</p>
                  <p className='productprice2'>${this.state.data[7].product_price}</p>
                  <button className='onebutton'onClick={e =>{this.addToCart(this.state.data[7].productsid)}}>+ Add To Cart</button>
              </div>
         
          </div>

            
            </div>
        )
    }
}