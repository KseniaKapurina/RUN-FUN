import React, { useEffect, useState, useContext } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { CustomContext } from '../../Context'
import ICONS from './../../assets/icons'
import Slider from 'react-slick'
import { Link } from 'react-router-dom'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import './../../style/style.scss'
import st from './OneGood.module.scss'

const OneGood = ({ list }) => {
  const params = useParams()
  const [good, setGood] = useState({})
  const [colorChoose, setColorChoose] = useState(null)
  const [collectioImg, setCollectionImg] = useState([])
  const [count, setCount] = useState(1)
  const [isDisable, setIsDisable] = useState(false)
  const {
    AddCart,
    formatPrice,
    imgChoose,
    setImgChoose,
    colorName,
    setColorName,
  } = useContext(CustomContext)

  const {
    name,
    description,
    adddescription,
    price,
    newPrice,
    category,
    quantity,
    brand,
    status,
    season,
    age,
    material,
  } = good

  useEffect(() => {
    axios(`http://localhost:3001/goods/${params.id}`)
      .then(({ data }) => {
        setGood(data)
        setImgChoose(data.image[0])
        setColorChoose(data.color[0].code)
        setColorName(data.color[0].name)

        setCollectionImg(data.image)
      })
      .catch((error) => {
        console.error(error)
      })
  }, [params])

  const chooseColor = (color) => {
    setColorName(color.name)
    setColorChoose(color.code)
    setImgChoose(color.image)

    setIsDisable(false)
  }

  useEffect(() => {
    const filteredItems = list.filter(
      (item) => item.id !== good.id && item.category === category,
    )
    console.log('Filtered Items:', filteredItems)
  }, [list, good, category])

  var settings = {
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
  }

  return (
    <>
      {/* Описание одного товара */}
      <section className={st.oneGood}>
        <div className="container">
          <div className={st.oneGood__wrapper}>
            <div className={st.oneGood__img}>
              <img
                src={`${process.env.PUBLIC_URL}/img/${imgChoose}`}
                alt={name}
              />
              <div className={st.wrapperImg}>
                <div className={st.littleImg}>
                  <img
                    src={`${process.env.PUBLIC_URL}/img/${collectioImg[1]}`}
                    alt={name}
                  />
                </div>
                <div className={st.littleImg}>
                  <img
                    src={`${process.env.PUBLIC_URL}/img/${collectioImg[2]}`}
                    alt={name}
                  />
                </div>
                <div className={st.littleImg}>
                  <img
                    src={`${process.env.PUBLIC_URL}/img/${collectioImg[3]}`}
                    alt={name}
                  />
                </div>
              </div>
            </div>
            <div className={st.oneGood__info}>
              <h2>{name}</h2>
              <div className={st.count}>
                {quantity ? <p>В наличии</p> : <p>Нет в наличии</p>}
              </div>
              <div className={st.oneGood__descr}>
                {description ? description : ''}
              </div>
              <div className={st.oneGood__price}>
                {newPrice ? (
                  <>
                    <div>
                      {formatPrice(newPrice)} <span> ₽</span>
                    </div>
                    <div style={{ textDecoration: 'line-through' }}>
                      {formatPrice(price)} <span> ₽</span>
                    </div>
                  </>
                ) : (
                  <div>
                    {formatPrice(price)} <span> ₽</span>
                  </div>
                )}
              </div>
              {quantity ? (
                <button
                  className={st.btnOrder}
                  onClick={() =>
                    AddCart({
                      id: good.id,
                      name: good.name,
                      price: good.newPrice || good.price,
                      colors: colorName,
                      image: imgChoose,
                      count: count,
                      category: good.category,
                      quantity: quantity,
                    })
                  }
                  style={{
                    backgroundColor: isDisable ? 'rgba(0,0,0,.2)' : '',
                    cursor: isDisable ? 'auto' : '',
                  }}
                >
                  {isDisable ? 'нет в наличии' : '  В корзину'}
                </button>
              ) : (
                ''
              )}
            </div>
          </div>
        </div>
      </section>
      <section className={st.additionInfo}>
        <div className="container">
          <div className={st.additionInfoContainer}>
            <h2> Описание</h2>
            <div className={st.wrapper}>
              <div className={st.additionDescr}>{adddescription}</div>
              <ul className={st.infoList}>
                <li>
                  Бренд: <p>{brand}</p>
                </li>
                <li>
                  Сезон: <p>{status}</p>
                </li>
                <li>
                  Пол: <p>{season}</p>
                </li>
                <li>
                  Возраст: <p>{age}</p>
                </li>
                <li>
                  Материал: <p>{material}</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      {/* Похожие товары */}
      <section className={st.otherGood}>
        <div className="container">
          <h2 className={st.otherGood__title}>Похожие товары</h2>
          <div className={st.otherGood__container}>
            {list.length > 2 && (
              <Slider {...settings}>
                {list
                  .filter(
                    (item) => item.id !== good.id && item.category === category,
                  )
                  .map((item) => {
                    const { image, name, price, newPrice, quantity } = item

                    return (
                      <Link
                        to={`/onegood/${item.id}`}
                        className={st.item}
                        key={item.id}
                      >
                        <img
                          className={st.img}
                          src={`${process.env.PUBLIC_URL}/img/${image[0]}`}
                          alt={name}
                          effect="blur"
                        />
                        <div className={st.content}>
                          <h2 className={st.name}>{name}</h2>
                          <div className={st.price}>
                            {newPrice ? (
                              <>
                                <span
                                  style={{ textDecoration: 'line-through' }}
                                >
                                  {formatPrice(price)}₽
                                </span>
                                <span> / </span>
                                <span>{formatPrice(newPrice)} ₽</span>
                              </>
                            ) : (
                              <p>{formatPrice(price)} ₽</p>
                            )}
                          </div>
                          {quantity ? (
                            <div
                              className={st.add}
                              onClick={(e) => {
                                e.preventDefault()
                                AddCart({
                                  id: item.id,
                                  name: item.name,
                                  price: item.price,
                                  colors: item.colors[0].name,
                                  image: item.image[0],
                                  count: count,
                                  category: item.category,
                                  quantity: item.colors[0].quantity,
                                })
                              }}
                            >
                              +
                            </div>
                          ) : (
                            <p className={st.instock}>Нет в наличии</p>
                          )}
                        </div>
                      </Link>
                    )
                  })}
              </Slider>
            )}
          </div>
        </div>
      </section>
    </>
  )
}

export default OneGood

const CustomPrevArrow = ({ onClick }) => (
  <button className={st.nextArrow} onClick={onClick}>
    <img src={ICONS.iconArrowLeft} alt="arrow" />
  </button>
)

const CustomNextArrow = ({ onClick }) => (
  <button className={st.prevArrow} onClick={onClick}>
    <img src={ICONS.iconArrow} alt="arrow" />
  </button>
)
