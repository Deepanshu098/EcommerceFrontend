import React from 'react'
import './Home.css'
import { Link } from 'react-router-dom'

function HomeMain() {
  return (
    <>
        <section>
            <div className='home_main'>
                <div className='home_main_img'>
                    <img src='/images/bgImage.jpg' alt=''/>
                </div>
                <div className='home_main_content'>
                    <p>Summer Collection</p>
                    <h2>FALL - WINTER <br/> Collection 2024</h2>
                    <div className='home_label'>
                    <p>A specialist label creating luxury essentials. Ethically crafted <br />
                                with an unwavering commitment to exceptional quality.</p>
                    <button>
                        <Link to='' className='text-decoration-none text-light'>Shop Now</Link>
                    </button>
                    </div>
                </div>
            </div>
        </section>
    </>
  )
}

export default HomeMain