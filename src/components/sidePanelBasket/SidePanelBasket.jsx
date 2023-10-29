import React, { useContext, useState, useRef } from 'react'
import st from './SidePanelBasket.module.scss'
import { Link } from 'react-router-dom'
import { CustomContext } from '../../Context'

import SearchSvg from './search.svg'

const SidePanelBasket = () => {
  const { cart, openBasket, setOpenBasket, formatPrice } = useContext(
    CustomContext,
  )
  const [searchQuery, setSearchQuery] = useState('')

  const catMenu = useRef(null)

  const closeOpenMenus = (e) => {
    if (catMenu.current && openBasket && !catMenu.current.contains(e.target)) {
      setOpenBasket(false)
    }
  }
  document.addEventListener('mousedown', closeOpenMenus)

  return (
    <div className={st.basket} ref={catMenu}>
      <div className={st.content}>
        <div className={st.search}>
          <img src={SearchSvg} alt="поиск" />
          <input
            type="text"
            placeholder="Введите название товара"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className={st.list}>
          {cart
            .filter((item) =>
              item.name.toLowerCase().includes(searchQuery.toLowerCase()),
            )
            .map((item, idx) => {
              const { name, price, image, count } = item
              const totalPrice = price * count
              return (
                <div className={st.item} key={idx}>
                  <img
                    src={`${process.env.PUBLIC_URL}/img/${image}`}
                    alt="фото заказа"
                    className={st.img}
                  />
                  <p className={st.name}>{name}</p>
                  <p className={st.price}>{formatPrice(totalPrice)}  ₽</p>
                </div>
              )
            })}
        </div>
      </div>
      <Link className={st.bottom} to="/order">
        Показать всё
      </Link>
    </div>
  )
}

export default SidePanelBasket
