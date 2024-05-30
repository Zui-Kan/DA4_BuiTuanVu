import { useEffect, useState } from "react";
import Header from "../Components/Header";
import "../style/login.css";
import { Link, useNavigate } from "react-router-dom";
import { apiSignup } from "../services/auth.service";
const Signup = function () {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    name: "",
    password: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [passwordsMatch, setPasswordsMatch] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    if (formData.password !== formData.confirmPassword) {
      setPasswordsMatch(false);
      setIsLoading(false);
      return;
    }

    try {
      const response = await apiSignup(formData);
      if (response && response.status_code === 200) {
        setSuccess(true);
      } else {
        setError(response?.message || "Có lỗi xảy ra khi đăng ký.");
      }
    } catch (error) {
      setError("Có lỗi xảy ra khi đăng ký.");
    }
    setIsLoading(false);
  };

  useEffect(() => {
    const lc = localStorage.getItem("tn");
    if (lc) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <>
      <Header></Header>
      <div className="container_login_signup">
        {/* <!-- form đăng ký tài khoản --> */}
        <div className="form-container">
          <p className="title">ĐĂNG KÝ</p>
          <form className="form" onSubmit={handleSubmit}>
            {!passwordsMatch && (
              <p className="error-message">
                Mật khẩu và xác nhận mật khẩu không khớp.
              </p>
            )}
            {error && <p className="error-message">{error}</p>}
            {success && <p className="success-message">Đăng ký thành công!</p>}

            <input
              type="email"
              className="input"
              placeholder="Nhập email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            <input
              type="text"
              className="input"
              placeholder="Tên tài khoản"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
            <input
              type="password"
              className="input"
              placeholder="Mật khẩu"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            <input
              type="password"
              className="input"
              placeholder="Xác nhận mật khẩu"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
            />

            <button className="form-btn" disabled={isLoading}>
              {isLoading ? "Đang đăng ký..." : "Đăng ký"}
            </button>
          </form>
          <p className="sign-up-label">
            Đã có tài khoản?
            <Link to="/login" className="sign-up-link">
              Login
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Signup;
