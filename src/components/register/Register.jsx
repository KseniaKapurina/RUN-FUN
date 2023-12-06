import React, { useContext } from 'react'
import { CustomContext } from '../../Context'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'

import InputMask from 'react-input-mask'

import ICONS from './../../assets/icons'
import st from './Register.module.scss'

const Register = () => {
  const { register, handleSubmit, formState, watch } = useForm()

  const { errors } = formState
  const { registerUser } = useContext(CustomContext)

  const password = watch('password')

  const { t } = useTranslation()

  return (
    <>
      <section className={st.register}>
        <div className={st.register_wrapper}>
          <form onSubmit={handleSubmit(registerUser)}>
            <h2>{t('accountPage.register.title')}</h2>
            <div className={st.register_inputs}>
              <label for="name">Имя</label>
              <input id="name" {...register('name')} type="text" required />
              <label for="email">Почта</label>
              <input id="email" {...register('email')} type="email" required />
              <label for="tel">Телефон</label>
              <InputMask
                {...register('tel')}
                mask={t('accountPage.login.loginMask')}
                required
              />
              <label for="password">Пароль</label>
              <input id ="password" {...register('password')} type="password" required />
              {errors.password && <p>{errors.password.message}</p>}
              <label for="email">Повторить пароль</label>
              <input
                {...register('confirmPassword', {
                  validate: (value) =>
                    value === password || t('accountPage.register.incorrect'),
                })}
                type="password"
                autoComplete="new-password"
                required
              />
              {errors.confirmPassword && (
                <p>{errors.confirmPassword.message}</p>
              )}
            </div>
            <button type="submit">Зарегистрироваться</button>
            <div className={st.register_link}>
              <p>
                У вас уже есть аккаунт? Тогда скорее заходите и за покупками!
              </p>
              <Link to="/login">{t('accountPage.register.textLink')}</Link>
            </div>
          </form>
        </div>
      </section>
    </>
  )
}

export default Register
