import React, { Component } from 'react';
import sector9 from '../../sector9logo.png'
import landyachtz from '../../landyachtzlogo.png'
import arbor from '../../arborlogo.png'
import db from '../../dblogo.png'
import '../home/home.css'
import downhill from '../../downhill.jpg'


export default class Home extends Component {

    render() {
        return (
            <div>
                <header>
                    
                  
                </header>

        <div className='logoContainer1'>
     
            <img className='logo1' src={sector9} alt='sector9logo'/>

            <img className='logo2' src={landyachtz} alt='landyachtzlogo'/>

         


        </div>   
        
        <div className='logoContainer2'>
        
            <img className='logo3' src={arbor} alt='arborlogo'/>

            <img className='logo4' src={db} alt='dblogo'/>

        
        </div>

        <div className='photoContainer'>
            
            
            <img className='photo' src={downhill} alt='downhill'/>
            <ul className='statement'>
            <li>Family owned and operated since 2018</li>
            <li className='invisible'>test</li>
            <li className='invisible'>test</li>
            <li className='invisible'>test</li>
         
            <li>We stock a selection of namebrand flagship longboards, with Free USA Shipping. </li>
            <li className='invisible'>test</li>
            <li className='invisible'>test</li>
            <li className='invisible'>test</li>
           
            <li>Choose from one of our street ready flagship longboards.</li>
            <li className='invisible'>test</li>
            <li className='invisible'>test</li>
            <li className='invisible'>test</li>
       
            <li>Free Ground Shipping (3-8 business days) or $7 Standard Ground (2-5 business days) on orders shipped to the 48 contiguous United States.  3-Day shipping for $24 and 2-Day shipping for $60 (business days in transit, Monday thru Friday).  No Sales Tax!</li>
            </ul>


        </div>

     

                
           
            
              
            </div>
        )
    }
}



         