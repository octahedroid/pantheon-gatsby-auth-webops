import React from 'react';
import PropTypes from 'prop-types';
import Navegation from 'gatsby-theme-octahedroid/src/components/navegation'

const Footer = ({user}) => {
  const items = [
    {
      name: `Protected`,
      route: "/protected/not-public-node ",
    }
  ]
  if(user){
    items.push(
      {
        name: `${user.attributes.field_display_name || user.attributes.name}`,
        route: "/account",
      })
  }else{
    items.push({
      name: "Login",
      route: "/login",
    })
  }
  return (
    <Navegation bg="darkShade" itemClassName="text-white" items={items}  />
  );
};

Footer.propTypes = {
  
};

export default Footer;