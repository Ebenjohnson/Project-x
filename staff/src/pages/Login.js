import React, {useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { loginUser, userSelector, clearState } from '../features/User/UserSlice';
import toast from 'react-hot-toast';
import { useHistory } from 'react-router-dom';
import "../assets/fonts/icomoon/style.css"
import "../assets/css/bootstrap.min.css"
import "../assets/css/style.css"
import bg from "../assets/images/bg_1.jpg"
import loaderSpin from "../assets/images/loader.svg"
import {APP_NAME} from "../config/app";

const Login = ({}) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { register, errors, handleSubmit } = useForm();
  const { isFetching, isSuccess, isError, errorMessage } = useSelector(
    userSelector
  );
  const onSubmit = (data) => {
    dispatch(loginUser(data));
  };

  useEffect(() => {
      document.title = APP_NAME+" | Login"
    return () => {
      dispatch(clearState());
    };
  }, []);

  useEffect(() => {
    if (isError) {
      toast.error(errorMessage);
      dispatch(clearState());
    }

    if (isSuccess) {
      dispatch(clearState());
      history.push('/');
    }
  }, [isError, isSuccess]);

  return (
      <div className="d-lg-flex half">
          <div className="bg order-1 order-md-2" style= {{backgroundImage : `url('${bg}')`}}></div>
          <div className="contents order-2 order-md-1">
              <div className="container">
                  <div className="row align-items-center justify-content-center">
                      <div className="col-md-9">
                          <h3><strong>Log In</strong></h3>
                          <p className="mb-4">Lorem ipsum dolor sit amet elit. Sapiente sit aut eos consectetur
                              adipisicing.</p>
                          <form onSubmit={handleSubmit(onSubmit)}
                                method="POST">
                              <div className="form-group first">
                                  <label htmlFor="username">Email</label>
                                  <input className="form-control"
                                         placeholder="your-email@gmail.com"
                                         id="email"
                                         name="email"
                                         type="email"
                                         autoComplete="email"
                                         ref={register({
                                             pattern: /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/i,
                                         })}
                                         required
                                         />
                              </div>
                              <div className="form-group last mb-3">
                                  <label htmlFor="password">Password</label>
                                  <input className="form-control"
                                         placeholder="Your Password"
                                         id="password"
                                         name="password"
                                         type="password"
                                         ref={register({ required: true })}
                                         autoComplete="current-password"
                                         required
                                        />
                              </div>

                              <div className="d-flex mb-5 align-items-center">
                                  <label className="control control--checkbox mb-0"><span className="caption">Remember me</span>
                                      <input type="checkbox" />
                                      <div className="control__indicator"></div>
                                  </label>

                              </div>

                              <button type="submit"  className="btn btn-block btn-info" >
                                  {isFetching ? (
                                      <img src={loaderSpin} alt="" />
                                  ) : null}
                                  Log In
                              </button>
                          </form>
                          <br/>
                          <p className="text-center"><strong>OR</strong></p>
                       <p className="text-center">   <Link to="signup"  className="justify-content-center">Register</Link></p>

                      </div>
                  </div>
              </div>
          </div>


      </div>
);
};

export default Login;
