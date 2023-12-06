import React, { useState, useContext, useRef, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { CustomContext } from '../../Context'
import SidePanelBasket from '../sidePanelBasket/SidePanelBasket'
import BasketSvg from './basketSvg.svg'
import AccountSvg from './accountSvg.svg'
import LikeSvg from './likeSvg.svg'
import logoImg from './R&F.png'
import InstagramSvg from './instagramSvg.svg'
import VK from './VK.png'
import SearchSvg from './searchSvg.svg'
import Hamburger from './hamburger.svg'
import ArrowSvg from './arrowsvg.svg'

import './../../style/style.scss'
import st from './Header.module.scss'

const Header = ({ order }) => {
  const { openBasket, setOpenBasket, cart, user, logOutUser } = useContext(
    CustomContext,
  )
  const totalCount = cart.reduce((total, currentItem) => {
    total += currentItem.count
    return total
  }, 0)
  const location = useLocation()

  return (
    <header>
      <div className={st.header_top}>
        <div className="container">
          <div className={st.header_top_container}>
            <div className={st.header_wrapper}>
              <a href="/" className={st.logo}>
                <img src={logoImg} alt="логотип" />
              </a>
              <p>Время работы: 10:00 - 22:00</p>
            </div>
            <div className={st.header_wrapper}>
              <div className={st.item}>
                <CustomNavLink to="/like">
                  <img src={LikeSvg} alt="любимое" />
                  <p className={st.count}>3</p>
                </CustomNavLink>
              </div>
              <div
                className={st.item}
                // onClick={()=>{
                //   location.pathname="/account" ? logOutUser() : null
                // }}
              >
                <CustomNavLink to={user && user.name ? '/account' : '/login'}>
                  <img src={AccountSvg} alt="аккаунт" />
                </CustomNavLink>
              </div>
              <Link to="/order" className={`${st.basket} ${st.item}`}>
                <img src={BasketSvg} className={`basket `} alt="корзина" />
                <p className={`${st.count} ${st.countBasket}`}>{totalCount}</p>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className={st.header_bottom}>
        <div className="container">
          <div className={st.header_bottom_container}>
            {/* выпадающее меню
             */}
            <nav>
              <ul class={st.topmenu}>
                <li>
                  <div className={`${st.active} ${st.catalog}`}>
                    <img src={Hamburger} alt="гамбургер" />
                    Каталог товаров
                  </div>
                  <ul className={st.submenu}>
                    <li>
                      <a href="/">
                        <p> Акссеары </p>
                        <img src={ArrowSvg} alt="стрелка" />
                      </a>
                    </li>
                    <li>
                      <a href="/">
                        <p>Для бега </p>
                        <img src={ArrowSvg} alt="стрелка" />
                      </a>
                      <ul className={`${st.submenu} ${st.submenuTwo}`}>
                        <li>
                          <a href="/">Кроссовки</a>
                        </li>
                        <li>
                          <a href="/">Термобелье</a>
                        </li>
                        <li>
                          <a href="/">Шорты</a>
                        </li>
                        <li>
                          <a href="/">Очки</a>
                        </li>
                        <li>
                          <a href="/">Футболки</a>
                        </li>
                        <li>
                          <a href="/">Майки</a>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </li>
              </ul>
            </nav>

            <nav>
              <ul className={st.list}>
                <li>
                  <a href="#aboutUs" to="/about">
                    О нас
                  </a>
                </li>
                <li>
                  <a href="#sales">Акции</a>
                </li>
                <li>
                  <a href="#new">Новинки</a>
                </li>
              </ul>
            </nav>
            <div className={st.social}>
              <a href="/">
                <img src={InstagramSvg} alt="Instagram" />
              </a>
              <a href="/">
                <img src={VK} alt="VK" />
              </a>
            </div>
            <div className={st.search}>
              <img src={SearchSvg} alt="лупа" />
              <input
                type="text"
                value=""
                placeholder="Поиск по каталогу"
                onClick={() => setOpenBasket(true)}
              />
            </div>
            {openBasket && <SidePanelBasket />}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header

const CustomNavLink = ({ to, children }) => (
  <NavLink
    to={to}
    style={({ isActive, isPending }) => {
      return {
        fontWeight: isActive ? 'bold' : '',
      }
    }}
  >
    {children}
  </NavLink>
)
