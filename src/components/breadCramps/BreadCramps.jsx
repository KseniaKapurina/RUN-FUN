import React, { useContext } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { CustomContext } from '../../Context'
import st from './BreadCramps.module.scss'

const BreadCramps = ({ linkOne, textLink }) => {
  const location = useLocation()
  const {
    selectedCategoryName,
    setSelectedCategory,
    setSelectedCategoryName,
  } = useContext(CustomContext)
  return (
    <nav>
      <Link
        to="/"
        className={
          location.pathname === '/'
            ? st.breadcrumbActive
            : st.breadcrumbNotActive
        }
      >
        Главная
      </Link>
      <span className="breadcrumb-arrow">/</span>
      <Link
        to={linkOne}
        onClick={() => {
          setSelectedCategory('all')
          setSelectedCategoryName('всё')
        }}
        className={
          location.pathname.startsWith({ linkOne })
            ? st.breadcrumbNotActive
            : st.breadcrumbActive
        }
      >
        {textLink}
      </Link>

      {selectedCategoryName !== 'всё' && (
        <>
          <span className="breadcrumb-arrow">/</span>
          <Link
            to="/products/1"
            className={
              location.pathname === '/goods/'
                ? 'breadcrumb-active'
                : 'breadcrumb-not-active'
            }
          >
            {selectedCategoryName}
          </Link>
        </>
      )}
    </nav>
  )
}

export default BreadCramps
