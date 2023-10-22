import React, { useContext, useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useForm } from 'react-hook-form'
import { CustomContext } from '../../Context'

import ChangeData from '../changeData/ChangeData'
import ICONS from '../../assets/icons'

import st from './Login.module.scss'

const Login = () => {
  const { register, handleSubmit, formState, reset, watch } = useForm()
  const [changeData, setChangeData] = useState(false)
  const { loginUser, user, error } = useContext(CustomContext)
  const { t } = useTranslation()
  return (
    <>
      <section className={st.login}>
        <div className="container">
          {user && user.name ? (
            changeData ? null : (
              <button
                className={st.changeBtn}
                onClick={() => setChangeData(true)}
              >
                Хотите изменить данные?
              </button>
            )
          ) : (
            <div className={st.login_wrapper}>
              <form onSubmit={handleSubmit(loginUser)} className={st.form}>
                <h2>Вход в аккаунт</h2>

                <div className={st.login_inputs}>
                  <input
                    {...register('email')}
                    type="email"
                    placeholder="Введите email"
                  />
                  <input
                    {...register('password')}
                    type="password"
                    placeholder="Введите пароль"
                  />
                  {error && (
                    <p className="error-message">Неправильный пароль</p>
                  )}
                </div>
                <button type="submit">Войти</button>
                <div className={st.login_link}>
                  <p>"Нет аккаунта?" </p>
                  <Link to="/register"> Создайте его прямо сейчас!</Link>
                </div>
              </form>
            </div>
          )}
        </div>
      </section>
      {changeData && <ChangeData />}
    </>
  )
}

export default Login
