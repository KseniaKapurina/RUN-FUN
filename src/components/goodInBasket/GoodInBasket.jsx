import React, { useContext, useEffect, useState } from 'react'
import { CustomContext } from './../../Context'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css'

import './../../style/style.scss'
import st from './GoodInBasket.module.scss'

//логика страницы заказа
const GoodInBasket = () => {
  const { cart, deleteCart, setCart, ticket, setTicket } = useContext(
    CustomContext,
  )
  const [totalPrice, setTotalPrice] = useState(0)
  const PriceWithDiscount = totalPrice * 0.9

  const [showMessage, setShowMessage] = useState(false)

  const getAllTickets = (e) => {
    e.preventDefault()
    axios(`http://localhost:3001/tickets?title=${e.target[0].value}`).then(
      ({ data }) => {
        setTicket(data)
        if (!Array.isArray(data) || data.length === 0) {
          setShowMessage(true)
          setTimeout(() => {
            setShowMessage(false)
          }, 4000)
        }
      },
    )
  }

  useEffect(() => {
    const newTotalPrice = cart.reduce((acc, item) => {
      const itemTotal = item.price * item.count
      if (ticket.length) {
        const discount = (itemTotal / 100) * ticket[0].procent
        return acc + itemTotal - discount
      }
      return acc + itemTotal
    }, 0)

    setTotalPrice(newTotalPrice)
  }, [cart, ticket])

  const handleIncrease = (item) => {
    console.log(item)
    const updatedCart = [...cart]
    const index = updatedCart.findIndex(
      (el) => el.id === item.id && el.colors === item.colors,
    )

    const maxCount = item.quantity
    console.log(maxCount)
    if (index !== -1 && updatedCart[index].count < maxCount) {
      updatedCart[index].count += 1
      setCart(updatedCart)
    }
  }

  const handleDecrease = (item) => {
    const updatedCart = [...cart]
    const index = updatedCart.findIndex(
      (el) => el.id === item.id && el.colors === item.colors,
    )
    if (updatedCart[index].count === 1) {
      deleteCart(item.id, item.colors)
    } else {
      updatedCart[index].count -= 1
      setCart(updatedCart)
    }
  }

  return (
    <>
      <h2>Корзина</h2>
      <Link to="/goods">Продолжить покупки</Link>
      <div className={st.name_columns}>
        <p>Название</p>
        <p>Стоимость</p>
        <p>Количество</p>
        <p>Всего</p>
      </div>

      {cart.length > 0 ? (
        <>
          <div className={st.wrapper}>
            {cart.map((item, idx) => {
              const { id, name, price, image, colors, count, quantity } = item
              const res = price * count
              const isDisable = count >= quantity

              return (
                <div className={st.item} key={idx}>
                  <div
                    className={st.delete}
                    onClick={() => deleteCart(id, colors)}
                  >
                    <span>&#10006;</span>
                  </div>
                  <div className={st.block}>
                    <div className={st.img}>
                      <LazyLoadImage
                        src={`${process.env.PUBLIC_URL}/img/${image}`}
                        alt="фото заказа"
                        effect="blur"
                      />
                    </div>
                    <p>{name}</p>
                  </div>
                  <p>{price}</p>
                  <div className={st.counter}>
                    <button
                      className={st.btn}
                      onClick={() => handleDecrease(item)}
                    >
                      <span>-</span>
                    </button>
                    <span className={st.btn}>{count}</span>
                    <button
                      className={st.btn}
                      onClick={() => handleIncrease(item)}
                      style={{
                        cursor: isDisable ? 'auto' : '',
                      }}
                    >
                      <span>+</span>
                    </button>
                  </div>
                  <p>{res} р</p>
                </div>
              )
            })}
          </div>
          <hr />
          <div className={st.res}>
            <div className={st.sum}>
              <div className={st.result}>
                <span> Сумма:</span>
                <span>
                  {Math.round(totalPrice).toString().slice(0, -3) +
                    ' ' +
                    Math.round(totalPrice).toString().slice(-3)}{' '}
                  ₽
                </span>
                <span> Скидка:</span>
                <span> 10%</span>
                <span> Итого:</span>
                <span>
                  {Math.round(PriceWithDiscount).toString().slice(0, -3) +
                    ' ' +
                    Math.round(PriceWithDiscount).toString().slice(-3)}{' '}
                  ₽
                </span>
              </div>
            </div>
            <Link to="/finish">
              <button className={`${st.btn_finishBtn}`}>
                ПЕРЕЙТИ К ОФОРМЛЕНИЮ
              </button>
            </Link>
          </div>
        </>
      ) : (
        <div>
          <p className={st.empty}>Корзина пуста</p>
        </div>
      )}
    </>
  )
}

export default GoodInBasket
