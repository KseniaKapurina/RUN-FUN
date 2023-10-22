import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import st from './Categories.module.scss'

const Categories = ({ chooseCategory, selectedCategory, setPage }) => {
  const { t } = useTranslation()
  const [categories, setCategoties] = useState([
    {
      key: 'sneakers',
      name: 'Кроссовки',
    },
    {
      key: 'thermal_underwear ',
      name: 'Термобельё',
    },
    {
      key: 'shorts',
      name: 'Шорты',
    },
    {
      key: 'glasses',
      name: 'Очки',
    },
    {
      key: 't-shirt',
      name: 'Футболки',
    },
    {
      key: 'shirt',
      name: 'Майки',
    },
  ])

  return (
    <>
      <div className={st.title}> Каталог</div>
      <ul className={st.categories}>
        {categories.map((el) => (
          <li
            key={el.key}
            onClick={() => {
              chooseCategory(el.key)
              setPage(1)
            }}
            className={`${st.elem} ${
              selectedCategory === el.key ? st.active : ''
            }`}
          >
            {el.name}
          </li>
        ))}
      </ul>
    </>
  )
}

export default Categories
