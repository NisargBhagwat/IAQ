import React, {useEffect} from 'react'
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import useHttp from "../../../hooks/use-http";
import useInput from "../../../hooks/use-input";
import { login } from "../../../apis/User";
import { devices } from "../../../routes";
import { toast } from "react-toastify";
import { setToken } from "../../../store/Auth";
import { setUserInfo } from "../../../store/UserInfo";

const Login = () => {
  const {
    sendRequest,
    data: loginResponseData,
    status,
    error,
  } = useHttp(login);

  const dispatch = useDispatch();
  const navigator = useNavigate();

  useEffect(() => {
    if (status === "completed") {
      if (error) {
        toast.error(error);
      } else {
        localStorage.setItem("eComToken", loginResponseData.jwtToken);
        dispatch(setToken(loginResponseData.token));
        dispatch(setUserInfo(loginResponseData));
        toast.success("Login Successfully.");
        navigator(`/${devices}`);
      }
    }
  }, [sendRequest, status, error, loginResponseData, dispatch, navigator]);

  const {
    enteredValue: enteredEmail,
    isInputInvalid: isEmailInvalid,
    valueInputHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
  } = useInput((value) => {
    const emailRegex = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");
    return emailRegex.test(value);
  });

  const {
    enteredValue: enteredPassword,
    isInputInvalid: isPasswordInvalid,
    valueInputHandler: passChangeHandler,
    inputBlurHandler: passBlurHandler,
  } = useInput((value) => value.trim().length >= 5);

  const submitHandler = (e) => {
    e.preventDefault();

    if (enteredEmail.trim() === "" || enteredPassword.trim() === "") {
      toast.error("All fields are required!");
      return;
    }

    let errors = [];
    if (isEmailInvalid) errors.push("email formate must be xx@xx.com");
    if (isPasswordInvalid) errors.push("password lengh must be more than 5");

    if (errors.length > 0) {
      errors.forEach((error) => toast.error(error));
      return;
    }

    const loginData = {
      email: enteredEmail,
      password: enteredPassword,
    };

    sendRequest(loginData);
    return;
  };
  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={5}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm onSubmit={submitHandler}>
                    <h1>Login</h1>
                    <p className="text-medium-emphasis">Sign In to your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput placeholder="Username" autoComplete="username" value={enteredEmail}
                        onChange={emailChangeHandler}
                        onBlur={emailBlurHandler} />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password"
                        value={enteredPassword}
                        onChange={passChangeHandler}
                        onBlur={passBlurHandler}
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>
                        <CButton color="primary" className="px-4" type='submit'>
                          Login
                        </CButton>
                      </CCol>
                      {/* <CCol xs={6} className="text-right">
                        <CButton color="link" className="px-0">
                          Forgot password?
                        </CButton>
                      </CCol> */}
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              {/* <CCard className="text-white bg-primary py-5" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <h2>Sign up</h2>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                      tempor incididunt ut labore et dolore magna aliqua.
                    </p>
                    <Link to="/register">
                      <CButton color="primary" className="mt-3" active tabIndex={-1}>
                        Register Now!
                      </CButton>
                    </Link>
                  </div>
                </CCardBody>
              </CCard> */}
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
