import React, { useEffect, useState, useContext } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { CustomContext } from '../../Context'
import { Link } from 'react-router-dom'
import ICONS from './../../assets/icons'
import Slider from 'react-slick'
import LikeSvg from './likeSvg.svg'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import './../../style/style.scss'
import st from './OneGood.module.scss'

const OneGood = () => {
  const params = useParams()
  const [good, setGood] = useState({})
  const [count, setCount] = useState(1)
  const { AddCart, formatPrice, setOpenBasket, list } = useContext(
    CustomContext,
  )
  const [isDisable, setIsDisable] = useState(false)
  const [currentImageURL, setcurrentImageURL] = useState('')

  const {
    id,
    name,
    description,
    adddescription,
    price,
    newPrice,
    category,
    quantity,
    image,
    brand,
    status,
    season,
    gender,
    age,
    material,
    weatherCondition,
    color,
  } = good

  useEffect(() => {
    axios(`http://localhost:3001/goods/${params.id}`)
      .then(({ data }) => {
        setGood(data)
      })
      .catch((error) => {
        console.error(error)
      })
  }, [params])

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
      <section className={st.oneGood}>
        <div className="container">
          <div className={st.oneGood__wrapper}>
            <div className={st.oneGood__img}>
              <div className={st.bigImg}>
                <img
                  src={`${process.env.PUBLIC_URL}/img/${
                    currentImageURL || (image && image[0])
                  }`}
                  alt={name}
                />
              </div>
              <div className={st.wrapperImg}>
                {image?.map((url) => {
                  return (
                    <div className={st.littleImg}>
                      <img
                        src={`${process.env.PUBLIC_URL}/img/${url}`}
                        className="small image"
                        alt="small preview of product"
                        onClick={() => setcurrentImageURL(url)}
                      />
                    </div>
                  )
                })}
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
                  onClick={() => {
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
                  }}
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
              <img src={LikeSvg} alt="нравится" />
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
                  Сезон: <p>{season}</p>
                </li>
                <li>
                  Пол: <p>{gender}</p>
                </li>
                <li>
                  Возраст: <p>{age}</p>
                </li>
                {material && (
                  <li>
                    Материал: <p>{material}</p>
                  </li>
                )}
                {weatherCondition && (
                  <li>
                    Материал: <p>{weatherCondition}</p>
                  </li>
                )}
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
                                  image: item.image[0],
                                  count: count,
                                  category: item.category,
                                  quantity: item.quantity,
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
