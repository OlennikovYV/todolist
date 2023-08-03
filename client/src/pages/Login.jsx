import React, { useRef, useState, useEffect, useContext } from "react";
import { Navigate } from "react-router-dom";

import AuthContext from "../context/AuthProvider";

import FormWrapper from "../components/FormWrapper";
import Button from "../components/Button";

function Login() {
  const { isAuthenticated, error, message, signIn, signInFromCache } =
    useContext(AuthContext);

  const userRef = useRef();
  const errorRef = useRef();

  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const userDataCache = JSON.parse(localStorage.getItem("user"));

    if (userDataCache) {
      signInFromCache(userDataCache);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    signIn(user, password);
  };

  return (
    <>
      {isAuthenticated ? (
        <Navigate to='/main-task' replace={true} />
      ) : (
        <div className='container-login'>
          <section className='form-login'>
            <FormWrapper
              className='form-login'
              id='sign-in'
              onSubmit={handleSubmit}
            >
              <div className='input-login'>
                <input
                  type='text'
                  id='username'
                  ref={userRef}
                  autoComplete='off'
                  onChange={(e) => setUser(e.target.value)}
                  value={user}
                  required
                />
                <label className='login-user' htmlFor='username'>
                  Логин
                </label>
              </div>

              <div className='input-login'>
                <input
                  type='password'
                  id='password'
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  required
                />
                <label className='login-password' htmlFor='password'>
                  Пароль
                </label>
              </div>

              <Button className='login' text='Войти' />
            </FormWrapper>
          </section>
          <div className='login-error'>
            {error ? (
              <p ref={errorRef} className={error ? "message" : "hidden"}>
                {message}
              </p>
            ) : null}
          </div>{" "}
        </div>
      )}
    </>
  );
}

export default Login;
