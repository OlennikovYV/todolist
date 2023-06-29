import React, { useRef, useState, useEffect, useContext } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { useLocalStorage } from "react-use";

import AuthContext from "../context/AuthProvider";

import FormWrapper from "../components/FormWrapper";
import Button from "../components/Button";

function Login() {
  const { setAuth, setAuthenticated } = useContext(AuthContext);
  const [valueStrorage, setValueStorage] = useLocalStorage("user", "{}");

  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    if (valueStrorage.id) {
      setAuth(valueStrorage);
      setAuthenticated(true);
      setSuccess(true);
    }
  }, [valueStrorage.id, setAuth, setAuthenticated, valueStrorage]);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3001/api/auth",
        {
          login: user,
          password: pwd,
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      const { ...userData } = response.data;

      setAuth(userData);
      setValueStorage(userData);

      setUser("");
      setPwd("");

      setAuthenticated(true);
      setSuccess(true);
    } catch (err) {
      if (err.response?.status === 404) {
        setErrMsg("Пользователь не найден.");
      } else if (err.response?.status === 401) {
        setErrMsg("Неверный пароль.");
      } else {
        setErrMsg("Неизвестная ошибка.");
      }
      errRef.current.focus();
    }
  };

  return (
    <>
      {success ? (
        <Navigate to='/task' replace={true} />
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
                  onChange={(e) => setPwd(e.target.value)}
                  value={pwd}
                  required
                />
                <label className='login-password' htmlFor='password'>
                  Пароль
                </label>
              </div>

              <Button className='login' text='Войти' />
            </FormWrapper>
            <div className='error'>
              <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"}>
                {errMsg}
              </p>{" "}
            </div>
          </section>
        </div>
      )}
    </>
  );
}

export default Login;
