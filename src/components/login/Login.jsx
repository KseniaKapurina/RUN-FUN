import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { CustomContext } from '../../Context'
import ChangeData from '../changeData/ChangeData'

import st from './Login.module.scss'

const Login = () => {
  const { register, handleSubmit } = useForm()
  const [changeData, setChangeData] = useState(false)
  const { loginUser, user, error } = useContext(CustomContext)

  return (
    <>
      <section className={st.login}>
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
              <h2>Вход</h2>

              <div className={st.login_inputs}>
                <div className="">
                  <label for="email">почта</label>
                  <input
                    id="email"
                    {...register('email')}
                    type="email"
                    placeholder="Введите email"
                  />
                </div>
                <div className="">
                  <label for="password">пароль</label>
                  <input
                    id="password"
                    {...register('password')}
                    type="password"
                    placeholder="Введите пароль"
                  />
                </div>
                {error && <p className="error-message">Неправильный пароль</p>}
              </div>
              <button type="submit">Войти</button>
              <div className={st.login_link}>
                <p>
                  Вы ещё не зарегистрированы, тогда скорее переходите на
                  регистрацию!
                </p>
                <Link to="/register">Продолжить</Link>
              </div>
            </form>
          </div>
        )}
      </section>
      {changeData && <ChangeData />}
    </>
  )
}

export default Login
