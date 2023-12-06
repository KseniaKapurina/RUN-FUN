import React, { useEffect, useState, useContext } from 'react'
import ItemServices from './../../services/ItemServices'
import Header from '../header/Header'
import Item from '../item/Item'

import Carousel from 'react-multi-carousel'
import { Link } from 'react-router-dom'
import LinkImgOne from './linkImg-1.png'
import LinkImgTwo from './linkImg-2.png'
import LinkImgThree from './linkImg-3.png'
import arrowImg from './arrow.svg'

import asicBrand from './asicsBrand.png'
import onewayBrand from './onewayBrand.png'
import brooksBrand from './brooksBrand.png'
import fuseBrand from './fuseBrand.png'
import pumaBrand from './pumaBrand.jpg'
import salomonBrand from './salomonBrand.png'

import logoImgBig from './Rectangle .png'

import 'react-multi-carousel/lib/styles.css'
import './../../style/style.scss'
import st from './Main.module.scss'

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
}

const Main = () => {
  const [newItemLoading, setNewItemLoading] = useState(false)
  const { getAllItems } = ItemServices()
  const [allGoods, setAllGoods] = useState([])

  useEffect(() => {
    onRequest(true)
  }, [])

  const onRequest = (initial) => {
    initial ? setNewItemLoading(false) : setNewItemLoading(true)
    getAllItems().then(onListItemLoaded)
  }

  const onListItemLoaded = (newcharList) => {
    setAllGoods(newcharList)
    setNewItemLoading(false)
  }

  const renderItems = (arr, category) => {
    if (category === 'sale') {
      return arr
        .filter((item) => item.status === 'sale')
        .map((item) => <Item key={item.id} list={item} />)
    }
    const items = arr
      .filter((item) => item.category === category)
      .map((item) => <Item key={item.id} list={item} />)
    return items
  }

  const allThirts = renderItems(allGoods, 't-shirt')
  const allSnakers = renderItems(allGoods, 'sneakers')
  const allSales = renderItems(allGoods, 'sale')

  return (
    <>
      <section className={st.photos}>
        <Header />
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
      <section className={st.sliders}>
        <div className="container">
          <div className={st.wraperSlider}>
            <h2 className={st.subtitle}>Футболки</h2>
            <Carousel key={`thirtsCarousel`} responsive={responsive}>
              {allThirts}
            </Carousel>
          </div>
        </div>
        <div className="container">
          <div className={st.wraperSlider}>
            <h2 className={st.subtitle}>Кроссовки</h2>
            <Carousel key={`snakersCarousel`} responsive={responsive}>
              {allSnakers}
            </Carousel>
          </div>
        </div>
      </section>
      <section className={st.brands}>
        <div className="container">
          <h2 className={st.subtitle} style={{ marginLeft: '0px' }}>
            Наши бренды
          </h2>
          <div className={st.wrapper}>
            <img src={asicBrand} alt="брэнд" />
            <img src={onewayBrand} alt="брэнд" />
            <img src={brooksBrand} alt="брэнд" />
            <img src={fuseBrand} alt="брэнд" />
            <img src={salomonBrand} alt="брэнд" />
            <img src={pumaBrand} alt="брэнд" />
          </div>
        </div>
      </section>
      <section className={st.aboutUs} id="aboutUs">
        <div className="container">
          <div className={st.wrapper}>
            <img src={logoImgBig} alt="logo" />
            <div className={st.content}>
              <h2 className={st.title}>О нас</h2>
              <div className={st.descr}>
                Интернет магазин для вас. Хорошее качество и проверенные
                производители. Здесь вы найдёте одежду для занятия спортом. Мы
                работаем с лучшими брендами, что повышает качество нашей
                продукции, вам не нужно покупать кажды месяц новое! В случае
                неудачной покупки мы всегда на связи и готовы вам помочь!
                <br /> Вы сможете найти то, что подходит вам!
              </div>
              <Link to="/goods">ПЕРЕЙТИ В КАТАЛОГ</Link>
            </div>
          </div>
        </div>
      </section>
      <section className={st.sale} id="sales">
        <div className={st.top}>
          <div className="container">
            <h2 className={st.title}>Акции</h2>
          </div>
        </div>
        <div className={st.bottom}>
          <div className="container">
            <Carousel
              key={`allSaleCarousel`}
              responsive={responsive}
              showDots={true}
            >
              {allSales}
            </Carousel>
          </div>
        </div>
      </section>
    </>
  )
}

export default Main
