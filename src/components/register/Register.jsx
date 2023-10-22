import React, { useContext, useState } from 'react'
import { CustomContext } from '../../Context'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { UserSchema } from '../../Validations/UserValidate'
import InputMask from 'react-input-mask'
import ICONS from './../../assets/icons'
import st from './Register.module.scss'

const Register = () => {
  const { register, handleSubmit, formState, reset, watch } = useForm()

  const { errors } = formState
  const { registerUser } = useContext(CustomContext)

  const password = watch('password')

  const { t } = useTranslation()

  return (
    <>
      <section className={st.register}>
        <div className="container">
          <div className={st.register_wrapper}>
            <form onSubmit={handleSubmit(registerUser)}>
              <h2>{t('accountPage.register.title')}</h2>
              <div className={st.register_inputs}>
                <input
                  {...register('name')}
                  type="text"
                  placeholder={t('accountPage.register.inputName')}
                  required
                />
                <input
                  {...register('email')}
                  type="email"
                  placeholder={t('accountPage.register.inputEmail')}
                  required
                />
                <InputMask
                  {...register('tel')}
                  mask={t('accountPage.login.loginMask')} 
                  placeholder={t('accountPage.register.inputPhone')}
                  required
                />
                <input
                  {...register('password')}
                  type="password"
                  placeholder={t('accountPage.register.inputPassword')}
                  required
                />
                {errors.password && <p>{errors.password.message}</p>}
                <input
                  {...register('confirmPassword', {
                    validate: (value) =>
                      value === password || t('accountPage.register.incorrect'),
                  })}
                  type="password"
                  placeholder={t('accountPage.register.inputComfirmPass')}
                  autoComplete="new-password"
                  required
                />
                {errors.confirmPassword && (
                  <p>{errors.confirmPassword.message}</p>
                )}
              </div>
              <button type="submit">
                {t('accountPage.register.btn')}{' '}
                <img src={ICONS.iconArrow} alt="arrow" />
              </button>
              <div className={st.register_link}>
                <p>{t('accountPage.register.text')}</p>
                <Link to="/login">{t('accountPage.register.textLink')}</Link>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  )
}

export default Register
