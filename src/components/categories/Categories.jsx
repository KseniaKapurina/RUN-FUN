import React, { useState, useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { CustomContext } from '../../Context'
import st from './Categories.module.scss'

const Categories = ({
  chooseCategory,
  chooseCategoryName,
  selectedCategory,
  setPage,
  position,
}) => {
  const {
    selectedCategoryName,
    setSelectedCategory,
    setSelectedCategoryName,
  } = useContext(CustomContext)
  const [categories, setCategoties] = useState([
    {
      key: 'sneakers',
      name: 'Кроссовки',
    },
    {
      key: 'thermal_underwear',
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
      {position === 'horizontal' && (
        <>
          <div className={st.title}> Каталог</div>
          <ul className={st.categories}>
            {categories.map((el) => (
              <li
                key={el.key}
                onClick={() => {
                  setSelectedCategory(el.key)
                  setSelectedCategoryName(el.name)
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
      )}
      {position === 'vertical' && (
        <>
          <div className={st.title}> {selectedCategoryName}</div>
          <ul className={st.categoriesSide}>
            {categories.map((el) => (
              <li
                key={el.key}
                onClick={() => {
                  setSelectedCategory(el.key)
                  setSelectedCategoryName(el.name)
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
      )}
    </>
  )
}

export default Categories
