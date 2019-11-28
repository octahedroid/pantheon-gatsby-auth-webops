import React from "react";
import _map from 'lodash/map';
import _isEmpty from 'lodash/isEmpty';
import Layout from "../components/layout";
import SEO from "gatsby-theme-octahedroid/src/components/seo";
import PageTitle from "gatsby-theme-octahedroid/src/components/page-title";
import {navigate} from 'gatsby';
import { Auth } from "../auth/context";
function AccountPage() {
  return (
    <Layout>
      <SEO
        title="Pantheon Auth site"
        keywords={[`gatsby`, `tailwind`, `react`, `tailwindcss`]}
      />
      <Auth.Consumer>{
        ({user, token, isLoggedIn})=>{
          if(!token){
            isLoggedIn()
            if (typeof window !== `undefined`) navigate('/login')
          }
          return (
          <div className="container mx-auto mt-6">
            <PageTitle intro="My Account" title="This is your info" />
            <div className="w-1/3">
              {!_isEmpty(user)&&_map(user.attributes, (value, key)=>(
                <li className="flex"><strong className="mr-2">{JSON.stringify(key)}</strong> : <p className="ml-2">{JSON.stringify(value)}</p></li>
              ))}
            </div>
          </div>
        )}
      }</Auth.Consumer>
    </Layout>
  );
}

export default AccountPage;
