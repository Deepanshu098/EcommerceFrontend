import React from 'react'
import './Footer.css'
import { Link } from 'react-router-dom'
function Footer() {
    
  return (
    <>
        <footer>
        <div className="footer-container container">
          <div className="content_1">
            <img src="/logo192.png" style={{ width: "100px", height: "100px", borderRadius: "50%" }} alt="" />
            <p>The customer is at the heart of our <br />
              unique business model, which includes <br />
              design.</p>
            <img src="https://i.postimg.cc/Nj9dgJ98/cards.png" alt="" />
          </div>
          <div className="content_2">
            <h4>SHOPPING</h4>
            <li><Link to='' className='text-decoration-none'>Clothing Store</Link></li>
            <li><Link to='' className='text-decoration-none'>Trending Shoes</Link></li>
            <li><Link to='' className='text-decoration-none'>Accessories</Link></li>
            <li><Link to='' className='text-decoration-none'>Sale</Link></li>    
          </div>
          <div className="content_3">
            <h4>SHOPPING</h4>
            <li><Link to='' className='text-decoration-none'>Contact Us</Link></li>
            <li><Link to='' className='text-decoration-none'>Payment Methods</Link></li>
            <li><Link to='' className='text-decoration-none'>Delivery</Link></li>
            <li><Link to='' className='text-decoration-none'>Return and Exchange</Link></li>
          </div>
          <div className="content_4">
            <h4>NEWLETTER</h4>
            <p>Be the first to know about new <br />
              arrivals, look books, sales & promos!</p>
            <div className="f-mail">
              <input type="email" name="" id="" placeholder='Your Email' />
            </div>
          </div>
        </div>
        <div className="f-design">
          <div className="f-design-txt container">
            <p>Design and Code By Deepanshu</p><span>© All Copyrights Reserved {new Date().getFullYear()} .</span>
          </div>
        </div>
      </footer>
    </>
  )
}

export default Footer