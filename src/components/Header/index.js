import React from 'react'
import Swiper from 'react-id-swiper'

const API_IMG = process.env.API_IMAGE

const params = {
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
    spaceBetween: 0,
    wrapperClass : "wrapper-custom"
  }

const Header = (props) => {
    return(
        <div className="headers">
           
            <Swiper {...params}>
                { 
                    props.trending.isLoading ? (<div className="bg-secondary"></div>) :
                    !props.trending.data ?  (<div className="bg-secondary"></div>) :
                    props.trending.data.results.map((data, key) => {
                    return(
                            <div key={key} style={{ background: `url(${API_IMG}${data.backdrop_path})`, backgroundSize:'cover', backgroundPosition:'center'}}></div>
                    )
                }) }
            </Swiper>
        </div>
    )
}

export default Header