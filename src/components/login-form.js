import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import { Auth } from "../auth/context";
import ArticlePlaceHolder from './article-placeholder';

const login = props => {
  const [state, setState] = useState({});
  const AuthContext = useContext(Auth);

  const handleSubmit = async event => {
    event.preventDefault();
    const { username, password } = state;
    setState({ ...state, processing: true });

    try {
      const resp = await AuthContext.handleLogin(username, password, "");
      
      setState({ ...state, processing: false, error: false });
    } catch (err) {
      setState({
        processing: false,
        error: "Unable to complete your login request."
      });
    }
  };

  return (
    <div className=" py-4">
      {state.error && (
        <div className="text-red-500 text-lg text-center">{state.error}</div>
      )}
      {AuthContext.user && (
        <h2 className="text-xl text-green-500">User Logged in</h2>
      )}
      {!AuthContext.user && (
        <>
          <h3 className="text-secondary text-xl font-bold mb-3">
            Enter your username and password below to log in.
          </h3>
          {state.processing ? (
            <ArticlePlaceHolder />
          ) : (
            <form
              onSubmit={event => handleSubmit(event)}
              className="flex flex-col py-4"
            >
              <label className="w-full text-lg text-primary">Username:</label>
              <input
                className="w-full p-3 text-lg border-gray-300 border"
                type="text"
                name="username"
                onChange={event =>
                  setState({
                    ...state,
                    [event.target.name]: event.target.value
                  })
                }
              />
              <label className="w-full text-lg text-primary">Password:</label>
              <input
                className="w-full p-3 text-lg border-gray-300 border"
                type="password"
                name="password"
                onChange={event =>
                  setState({
                    ...state,
                    [event.target.name]: event.target.value
                  })
                }
              />
              <input
                className="p-3 bg-secondary text-white mt-4 rounded"
                type="submit"
                value="Log in"
                onClick={event => handleSubmit(event)}
              />
            </form>
          )}
        </>
      )}
    </div>
  );
};

login.propTypes = {};

export default login;
