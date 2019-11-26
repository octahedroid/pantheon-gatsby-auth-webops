import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "../auth/context";
const login = props => {
  const [state, setState] = useState({});
  const Auth = useContext(AuthContext);

  const handleSubmit = async event => {
    event.preventDefault();
    setState({ processing: true });
    const { username, password } = state;

    try {
      await Auth.handleLogin(username, password, "");
      setState({ processing: false });
      Auth.updateAuthenticatedUserState(true);
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
        <div className="text-red-500 text-lg text-center">{error}</div>
      )}
      <h3 className="text-primary text-xl font-bold mb-3">Enter your username and password below to log in.</h3>
      {state.processing ? (
        <div>Loading ...</div>
      ) : (
        <form
          onSubmit={event => handleSubmit(event)}
          className="flex flex-col py-4"
        >
          <label className="w-full text-lg text-primary">Username:</label>
          <input
            className="w-full p-3 text-lg"
            type="text"
            name="username"
            onChange={event =>
              setState({ [event.target.name]: event.target.value })
            }
          />
          <label className="w-full text-lg text-primary">Password:</label>
          <input
            className="w-full p-3 text-lg"
            type="password"
            name="password"
            onChange={event =>
              setState({ [event.target.name]: event.target.value })
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
    </div>
  );
};

login.propTypes = {};

export default login;
