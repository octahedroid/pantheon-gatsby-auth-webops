import React, {useState, useContext} from 'react';
import PropTypes from 'prop-types';
import { Auth } from "../auth/context";

const AccountForm = ({user, token, updateUserProfile}) => {
  const [state, setState] = useState({displayName: user.attributes.field_display_name||''});

  const handleSubmit = async event => {
    event.preventDefault();
    const { displayName } = state;
    setState({ ...state, processing: true });

    try {
      const resp = await updateUserProfile(token, user.id, displayName);
      
      setState({ ...state, processing: false, error: false });
    } catch (err) {
      setState({
        processing: false,
        error: "Unable to complete your login request."
      });
    }
  };

  return (
    <form
    onSubmit={event => handleSubmit(event)}
    className="flex flex-col py-4">
      <label className="w-full text-lg text-primary">Username:</label>
      <input
        className="w-full p-3 text-lg border-gray-300 border text-gray-500"
        type="text"
        name="name"
        disabled
        value={user.attributes.name}
      />
      <label className="w-full text-lg text-primary">Email:</label>
      <input
        className="w-full p-3 text-lg border-gray-300 border text-gray-500"
        type="text"
        name="email"
        disabled
        value={user.attributes.mail}
      />
      <label className="w-full text-lg text-primary">Full name:</label>
      <input
        className="w-full p-3 text-lg border-gray-300 border"
        type="text"
        name="displayName"
        value={state.displayName}
        onChange={event =>
          setState({
            ...state,
            [event.target.name]: event.target.value
          })
        }
      />
      <input
        className="p-3 bg-secondary text-white mt-4 rounded w-full"
        type="submit"
        value="Update info"
        onClick={event => handleSubmit(event)}
      />
    </form>
  );
};

AccountForm.propTypes = {
  
};

export default AccountForm;