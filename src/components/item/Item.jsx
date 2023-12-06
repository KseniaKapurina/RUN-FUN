import React, { useContext, useState } from 'react'
import { CustomContext } from '../../Context'
import { Link } from 'react-router-dom'
import basketSvg from './basketSvg.svg'

import st from './Item.module.scss'

const Item = ({ list }) => {
  const { id, image, name, price, newPrice, quantity, status, category } = list
  const {
    formatPrice,
    AddCart,
    setOpenBasket,
    addSuccess,
    setAddSuccess,
  } = useContext(CustomContext)
  const [selectedLine, setSelectedLine] = useState(1)
  // Начальное значение выбранной линии
  const [count, setCount] = useState(1)

  const [currentImage, setCurrentImage] = useState(
    `${process.env.PUBLIC_URL}/img/${image[0]}`,
  )

  // Функция для изменения изображения при клике на линии
  const changeImage = (lineNumber, event) => {
    if (event) {
      event.preventDefault() // Check if event exists before using it
    }
    setSelectedLine(lineNumber)
    setCurrentImage(`${process.env.PUBLIC_URL}/img/${image[lineNumber - 1]}`)
  }

  //общее доступное количество товара
  return (
    <>
      <Link to={`/onegood/${id}`} className={st.item}>
        <div className={st.topCart}>
          {status === 'new' ? <p className={st.newGood}>Новинка</p> : null}
          {status === 'sale' ? <p className={st.sale}>Акция</p> : null}
          <svg
            width="39"
            height="30"
            viewBox="0 0 39 30"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M34.9405 3.38894C34.0419 2.63158 32.9749 2.03078 31.8006 1.62088C30.6263 1.21098 29.3677 1 28.0965 1C26.8254 1 25.5668 1.21098 24.3924 1.62088C23.2181 2.03078 22.1512 2.63158 21.2526 3.38894L19.3877 4.96001L17.5227 3.38894C15.7076 1.85984 13.2458 1.00079 10.6788 1.00079C8.11182 1.00079 5.64998 1.85984 3.83485 3.38894C2.01973 4.91805 1 6.99197 1 9.15445C1 11.3169 2.01973 13.3909 3.83485 14.92L5.69978 16.491L19.3877 28.022L33.0756 16.491L34.9405 14.92C35.8395 14.163 36.5527 13.2641 37.0393 12.2749C37.5258 11.2856 37.7763 10.2253 37.7763 9.15445C37.7763 8.08363 37.5258 7.0233 37.0393 6.03403C36.5527 5.04477 35.8395 4.14595 34.9405 3.38894V3.38894Z"
              stroke="#DEDBDB"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
        <img className={st.img} src={currentImage} alt={name} />
        <div className={st.lines}>
          {/* Линии, изменяющие изображение */}
          <div
            className={selectedLine === 1 ? st.selectedLine : st.line}
            onClick={(event) => changeImage(1, event)}
          >
            <p></p>
          </div>
          <div
            className={selectedLine === 2 ? st.selectedLine : st.line}
            onClick={(event) => changeImage(2, event)}
          >
            <p></p>
          </div>
          {image.length > 2 && (
            <div
              className={selectedLine === 3 ? st.selectedLine : st.line}
              onClick={(event) => changeImage(3, event)}
            >
              <p></p>
            </div>
          )}

          {image.length > 3 && (
            <div
              className={selectedLine === 4 ? st.selectedLine : st.line}
              onClick={(event) => changeImage(4, event)}
            >
              <p></p>
            </div>
          )}
        </div>
        <div className={st.content}>
          <h2 className={st.name}>{name}</h2>

          <div className={st.item_botton}>
            <div className={st.prices}>
              {newPrice ? (
                <>
                  <span className={st.oldPrice}>{formatPrice(newPrice)} ₽</span>
                  <span className={st.newPrice}>{formatPrice(price)} ₽</span>
                </>
              ) : (
                <p className={st.oldPrice}>{formatPrice(price)} ₽</p>
              )}
            </div>
            {quantity ? (
              <div className={st.quantity}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="17"
                  height="16"
                  viewBox="0 0 17 16"
                  fill="none"
                >
                  <path
                    d="M13.9723 4L6.639 11.3333L3.30566 8"
                    stroke="#0000CD"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                <p>в наличии</p>
              </div>
            ) : null}
          </div>
          <div
            className={st.basket}
            onClick={(e) => {
              AddCart({
                id: id,
                name: name,
                price: newPrice || price,
                image: image && image[0],
                count: count,
                category: category,
                quantity: quantity,
              })
              setCount(count + 1)
              // setOpenBasket(true)
              setAddSuccess(true)
              setTimeout(() => {
                setAddSuccess(false)
              }, 3000)
              e.preventDefault()
            }}
          >
            <img src={basketSvg} alt="basket" />
          </div>
        </div>
      </Link>
    </>
  )
}

export default Item
