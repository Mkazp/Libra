import React, { useState } from 'react';
import styles from './Authorization.module.scss';

const Authorization = () => {
  const [isActive, setIsActive] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });
  const [registrationData, setRegistrationData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [id, setID] = useState(localStorage.getItem('id'));

  const toggleForm = () => {
    setIsActive(!isActive);
  };

  const SuccsessAuth = () => {
    console.log('Authentication successful');
    setIsAuth(true)
    localStorage.setItem('isAuth', true);
    localStorage.setItem('email', loginData.email);
    window.location.reload();
  }

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });

      // console.log(loginData);
      // setID(localStorage.setItem("id", response.message));
      console.log(JSON.stringify(response.message));

      if (response.ok) {
        SuccsessAuth()
        const responseData = await response.json();
        const userId = responseData.message.ID;

        setID(userId);
        localStorage.setItem('id', userId);
        // console.log(response);
      } else {
        // Authentication failed, handle the error
        console.error('Authentication failed');
      }
    } catch (error) {
      console.error('Error during authentication:', error);
    }
  };

  const handleRegistration = async () => {
    try {
      // Проверка совпадения паролей
      if (registrationData.password !== registrationData.confirmPassword) {
        console.error('Passwords do not match');
        // Вывести сообщение пользователю или выполнить другие действия в случае несовпадения паролей
        return;
      }

      // Остальной код регистрации
      const response = await fetch('http://localhost:5000/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: registrationData.email,
          password: registrationData.password,
        }),
      });

      if (response.ok) {
        window.location.reload();
        // Registration successful, handle the response accordingly
        console.log('Registration successful');
      } else {
        // Registration failed, handle the error
        console.error('Registration failed');
      }
    } catch (error) {
      console.error('Error during registration:', error);
    }
  };



  const handleInputChange = (e, dataSetter) => {
    const { name, value } = e.target;
    // console.log(`Setting ${name} to ${value}`);
    dataSetter((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className={`${styles.container} ${isActive ? styles.active : ''}`}>
      <div className={styles.block}>
        <section className={`${styles.blockItem} ${styles.blockItemFirst}`}>
          <h2 className={styles.blockItemTitle}>У вас уже есть аккаунт?</h2>
          <button className={`${styles.blockItemBtn} ${styles.signinBtn}`} onClick={toggleForm}>Войти</button>
        </section>
        <section className={styles.blockItem}>
          <h2 className={styles.blockItemTitle}>У вас нет аккаунта?</h2>
          <button className={`${styles.blockItemBtn} ${styles.signupBtn}`} onClick={toggleForm}>Зарегистрироваться</button>
        </section>
      </div>

      <div className={`${styles.formBox} ${isActive ? styles.active : ''}`}>

        <form action="#" className={`${styles.form} ${styles.formSignin}`}>
          <h3 className={styles.formTitle}>Вход</h3>
          <p>
            <input type="text" name="email" className={styles.formInput} onChange={(e) => handleInputChange(e, setLoginData)} placeholder="Логин" />
          </p>
          <p>
            <input type="password" name="password" className={styles.formInput} onChange={(e) => handleInputChange(e, setLoginData)} placeholder="Пароль" />
          </p>

          <p>
            <button type="button" className={styles.formBtn} onClick={handleLogin}>Войти</button>
          </p>
          <p>
            <a href="#" className={styles.formForgot}>Восстановить пароль</a>
          </p>
        </form>


        <form action="#" className={`${styles.form} ${styles.formSignup}`}>
          <h3 className={styles.formTitle}>Регистрация</h3>
          <p>
            <input type="email" name="email" className={styles.formInput} onChange={(e) => handleInputChange(e, setRegistrationData)} placeholder="Email" required />
          </p>
          <p>
            <input type="password" name="password" className={styles.formInput} onChange={(e) => handleInputChange(e, setRegistrationData)} placeholder="Пароль" required />
          </p>
          <p>
            <input type="password" name="confirmPassword" className={styles.formInput} onChange={(e) => handleInputChange(e, setRegistrationData)} placeholder="Подтвердите пароль" required />
          </p>
          <button type="button" className={`${styles.formBtn} ${styles.formBtnSignup}`} onClick={handleRegistration}>Зарегистрироваться</button>
        </form>
      </div>
    </div >
  );
};

export default Authorization;