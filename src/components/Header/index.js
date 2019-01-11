import React from 'react'
import Swiper from 'react-id-swiper'

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
    spaceBetween: 30,
    wrapperClass : "wrapper-custom"
  }

const Header = () => {
    return(
        <div>
           <Swiper {...params}>
            <div style={{ background: "url('https://i.redd.it/xx5xyqtably11.jpg')", backgroundSize:'cover', backgroundPosition:'top'}}>
                {/* <img src={`https://i.redd.it/xx5xyqtably11.jpg`} className="img-fluid" /> */}
            </div>
            <div>Slide 2</div>
            <div>Slide 3</div>
            <div>Slide 4</div>
            <div>Slide 5</div>
        </Swiper>
        </div>
    )
}

export default Header