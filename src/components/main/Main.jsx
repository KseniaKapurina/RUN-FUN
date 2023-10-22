import React from 'react'
import { Link } from 'react-router-dom'
import LinkImgOne from './linkImg-1.png'
import LinkImgTwo from './linkImg-2.png'
import LinkImgThree from './linkImg-3.png'
import arrowImg from './arrow.svg'
import './../../style/style.scss'
import st from './Main.module.scss'

const Main = () => {
  return (
    <>
      <section className={st.photos}>
        <div className="container">
          <div className={st.imageContainer}>
            <div className={st.image}>
              <img src={LinkImgOne} alt="изображение бегунов" />
              <Link to="/goods"> ПЕРЕЙТИ В КАТАЛОГ</Link>
            </div>
            <div className={st.image}>
              <img src={LinkImgTwo} alt="изображение бегунов" />
              <Link to="/" className={st.arrow}>
                <img src={arrowImg} alt="arrow" />
              </Link>
            </div>
            <div className={st.image}>
              <img src={LinkImgThree} alt="изображение бегунов" />
              <Link to="/" className={st.arrow}>
                <img src={arrowImg} alt="arrow" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Main
