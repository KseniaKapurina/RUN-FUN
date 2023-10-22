import React, { useContext, useRef } from 'react'
import { CustomContext } from '../../Context'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import st from './Item.module.scss'

const Item = ({ list }) => {
  const { id, image, name, price, newPrice, colors, quantity, status } = list

  const { formatPrice } = useContext(CustomContext)

  //общее доступное количество товара
  return (
    <>
      <Link to={`/onegood/${id}`} className={st.item}>
        {status === 'new' ? <p className={st.newGood}>Новинка</p> : null}
        <img
          className={st.img}
          src={`${process.env.PUBLIC_URL}/img/${image[0]}`}
          alt={name}
        />
        <div className={st.content}>
          <h2 className={st.name}>{name}</h2>
          <div className={st.price}>
            {newPrice ? (
              <>
                <span style={{ textDecoration: 'line-through' }}>
                  {formatPrice(price)}₽
                </span>
                <span> / </span>
                <span>{formatPrice(newPrice)} ₽</span>
              </>
            ) : (
              <p>{formatPrice(price)} ₽</p>
            )}
          </div>
          {quantity ? <p>В наличии</p> : null}
        </div>
      </Link>
    </>
  )
}

export default Item
