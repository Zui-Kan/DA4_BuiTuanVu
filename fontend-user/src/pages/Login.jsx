import { useRecoilState } from "recoil";
import Header from "../Components/Header";
import "../style/login.css";
import { Link, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { tokenState } from "../constant/recoil";
import { apiLogin, getProfile } from "../services/auth.service";

const Login = function () {
  const [isLoading, setIsLoading] = useState(false);
  const [errorLogin, setErrorLogin] = useState(null);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useRecoilState(tokenState);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await apiLogin(userName, password);
      if (response && response.access_token) {
        setToken(response.access_token);
        const profile = await getProfile(response.access_token);
        localStorage.setItem("profile", JSON.stringify(profile));
        localStorage.setItem("tn", JSON.stringify(response));
        navigate("/");
      } else {
        setErrorLogin("Tên tài khoản hoặc mật khẩu không đúng!");
      }
      setIsLoading(false);
    } catch (error) {
      console.error("Lỗi khi đăng nhập:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("tn");
    if (storedToken) {
      navigate("/");
    }
  }, [token, navigate]);

  return (
    <>
      <Header></Header>
      <div className="container_login_signup">
        <div className="form-container" ng-show="showLoginForm">
          <p className="title">ĐĂNG NHẬP</p>
          <form className="form" onSubmit={handleLogin}>
            {errorLogin && <p className="error-message">{errorLogin}</p>}
            <input
              type="text"
              className="input"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Tài khoản"
            />
            <input
              type="password"
              className="input"
              placeholder="Mật khẩu"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <p className="page-link">
              <span className="page-link-label">Quên mật khẩu ?</span>
            </p>
            <button className="form-btn">
              {isLoading ? "Đang đăng nhập..." : "Đăng nhập"}
            </button>
          </form>
          <p className="sign-up-label">
            Bạn chưa có tài khoản?
            <Link to="/signup" className="sign-up-link">
              Đăng ký
            </Link>
          </p>
          <div className="buttons-container">
            <div className="apple-login-button">
              <img src="/IMAGE/icons8_apple_logo.svg" alt="" />
              <span>Đăng nhập với Apple</span>
            </div>
            <div className="google-login-button">
              <img src="/IMAGE/icons8_google.svg" alt="" />

              <span>Đăng nhập bằng Google</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
