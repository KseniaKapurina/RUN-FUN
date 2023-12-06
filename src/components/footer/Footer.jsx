import React from 'react'
import { NavLink } from 'react-router-dom'
import instaImg from './instagram.png'
import vkImg from './vkImg.png'
import st from './Footer.module.scss'
import logoImg from './logoImg.png'
import './../../style/style.scss'

const Footer = () => {
  return (
    <footer>
      <div className="container">
        <div className={st.wrapper}>
          <div className={st.category}>
            <NavLink to="/">Кроссовки</NavLink>
            <NavLink to="/">Термобелье</NavLink>
            <NavLink to="/">Шорты</NavLink>
            <NavLink to="/">Очки</NavLink>
            <NavLink to="/">Футболки</NavLink>
            <NavLink to="/">Майки</NavLink>
          </div>
          <div className={st.links}>
            <NavLink to="/">О нас</NavLink>
            <NavLink to="/">Контакты</NavLink>
            <NavLink to="/">Новинки</NavLink>
            <NavLink to="/">Акции</NavLink>
          </div>
          <div className={st.contacts}>
            <img src={logoImg} alt="лого" />
            <a href="tel:88005535535">88005535535</a>
            <div className={st.social}>
              <div className={st.block}>
                <img src={instaImg} alt="instagram" />
              </div>
              <div className={st.block}>
                <img src={vkImg} alt="vk" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
