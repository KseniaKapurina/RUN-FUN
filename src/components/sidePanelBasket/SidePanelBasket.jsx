import React, { useContext, useState, useRef, useEffect } from 'react'
import st from './SidePanelBasket.module.scss'
import { Link } from 'react-router-dom'
import { CustomContext } from '../../Context'
import ItemServices from './../../services/ItemServices'
import SearchSvg from './search.svg'

//Поисковик
const SidePanelBasket = () => {
  const { cart, openBasket, setOpenBasket, formatPrice } = useContext(
    CustomContext,
  )
  const [newItemLoading, setNewItemLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const catMenu = useRef(null)

  const closeOpenMenus = (e) => {
    if (catMenu.current && openBasket && !catMenu.current.contains(e.target)) {
      setOpenBasket(false)
    }
  }
  document.addEventListener('mousedown', closeOpenMenus)

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
    console.log(allGoods)
  }
  const renderItems = (arr) => {
    return arr
  }

  const itemsFilter = renderItems(allGoods)

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
          {itemsFilter
            .filter((item) =>
              item.name.toLowerCase().includes(searchQuery.toLowerCase()),
            )
            .map((item, idx) => {
              const { name, price, image, id } = item

              return (
                <Link to={`/onegood/${id}`} className={st.item} key={idx}>
                  <img
                    src={`${process.env.PUBLIC_URL}/img/${image[0]}`}
                    alt="фото заказа"
                    className={st.img}
                  />
                  <p className={st.name}>{name}</p>
                  <p className={st.price}>{formatPrice(price)}  ₽</p>
                </Link>
              )
            })}
        </div>
      </div>
      <Link className={st.bottom} to="/goods">
        Показать всё
      </Link>
    </div>
  )
}

export default SidePanelBasket
