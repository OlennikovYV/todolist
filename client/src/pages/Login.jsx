import React, { useRef, useState, useEffect, useContext } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

import AuthContext from "../context/AuthProvider";

function Login() {
  const { setAuth, setAuthenticated } = useContext(AuthContext);
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
      const { id, firstname, lastname, fathername, login, supervisorid } =
        response.data;

      setAuth({ id, firstname, lastname, fathername, login, supervisorid });
      setAuthenticated(true);
      setUser("");
      setPwd("");
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
          <section>
            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"}>
              {errMsg}
            </p>
            <form onSubmit={handleSubmit}>
              <label htmlFor='username'>Пользователь:</label>
              <input
                type='text'
                id='username'
                ref={userRef}
                autoComplete='off'
                onChange={(e) => setUser(e.target.value)}
                value={user}
                required
              />

              <label htmlFor='password'>Пароль:</label>
              <input
                type='password'
                id='password'
                onChange={(e) => setPwd(e.target.value)}
                value={pwd}
                required
              />
              <button>Войти</button>
            </form>
          </section>
        </div>
      )}
    </>
  );
}

export default Login;
