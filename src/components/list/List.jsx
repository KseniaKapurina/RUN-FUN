import React, { useState, useEffect } from 'react'
import Item from '../item/Item'
import ItemServices from './../../services/ItemServices'
import IMAGES from '../../assets/img'
import st from './List.module.scss'

const List = ({ list, setList }) => {
  const [newItemLoading, setNewItemLoading] = useState(false)
  const { loading, error, getAllItems } = ItemServices()

  useEffect(() => {
    onRequest(true)
  }, [])

  const onRequest = (initial) => {
    initial ? setNewItemLoading(false) : setNewItemLoading(true)
    getAllItems().then(onListItemLoaded)
  }

  const onListItemLoaded = (newcharList) => {
    setList(newcharList)
    setNewItemLoading(false)
  }

  function renderItems(arr) {
    const items = arr.map((item) => {
      return (
        <Item
          key={item.id}
          list={item}
         
        />
      )
    })
    return <>{items}</>
  }

  const items = renderItems(list)
  const errorMessage = error ? 'error' : null
  const spinner = loading && !newItemLoading ? <Loading /> : null
  return (
    <>
      <section className={st.goods}>
        {errorMessage}
        {spinner}
        {items}
      </section>
    </>
  )
}

const Loading = () => {
  return (
    <div className={st.loading}>
      <img src={IMAGES.loadingGif} alt="loading..." />
    </div>
  )
}

export default List
