import React, { useState, useContext, useRef, useEffect } from 'react'
import { CustomContext } from '../../Context'
import { Link, NavLink } from 'react-router-dom'
import { FaBasketShopping } from 'react-icons/fa6'
import { useTranslation } from 'react-i18next'
import ICONS from '../../assets/icons'
import IMAGES from '../../assets/img'

import './../../style/style.scss'
import st from './Header.module.scss'

const Header = ({ order }) => {
  const { user, logOutUser } = useContext(CustomContext)

  return (
    <header>
      <div className={st.header_top}>
        <div className="container">
          <div className={st.header_top_container}>
            <div className={st.header_wrapper}>
              <a href="/" className={st.logo}>
                Логотип
              </a>
              <p>Время работы: 10:00 - 22:00</p>
            </div>
            <div className={st.header_wrapper}>
              любимое
              {/* логики пока нет */}
              <CustomNavLink to="/login">аккаунт</CustomNavLink>
              <Link to="/order">
                <FaBasketShopping
                  className={`basket `}
                />
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className={st.header_bottom}>
        <div className="container">
          <div className={st.header_bottom_container}>
            {/* выпадающие меню
             */}
            <p>каталог товаров</p>

            <nav>
              <ul className={st.list}>
                <li>
                  <a href="/" to="/about">
                    О нас
                  </a>
                </li>
                <li>
                  <a href="/">Акции</a>
                </li>
                <li>
                  <a href="/">Новинки</a>
                </li>
              </ul>
            </nav>
            <p>социальные сети</p>
            <p>поиск</p>
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
