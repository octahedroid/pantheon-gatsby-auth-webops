import React from "react";
import _map from "lodash/map";
import _isEmpty from "lodash/isEmpty";
import Layout from "../components/layout";
import SEO from "gatsby-theme-octahedroid/src/components/seo";
import PageTitle from "gatsby-theme-octahedroid/src/components/page-title";
import { navigate, replace } from "gatsby";
import { Auth } from "../auth/context";
import AccountForm from "../components/account-form";
function AccountPage({location}) {
  return (
    <Layout location={location}>
      <SEO
        title="Pantheon Auth site"
        keywords={[`gatsby`, `tailwind`, `react`, `tailwindcss`]}
      />
      <Auth.Consumer>
        {({ user, token, isLoggedIn, updateUserProfile }) => {
          if (!token) {
            isLoggedIn().then((resp)=>{
              if (window&&!resp) navigate("/login");
            });
          }
          return (
            <div className="container mx-auto mt-6 flex flex-wrap">
              <div className="w-full">
                <PageTitle title="Profile" />
              </div>
              <div className="flex-grow mr-4">
                {user && <AccountForm user={user} updateUserProfile={updateUserProfile} token={token} />}
              </div>
              <div className="w-1/2 p-4 bg-lightShade">
                {!_isEmpty(user) &&
                  _map(user.attributes, (value, key) => (
                    <li className="flex">
                      <strong className="mr-2">{JSON.stringify(key)}</strong> :{" "}
                      <p className="ml-2">{JSON.stringify(value)}</p>
                    </li>
                  ))}
              </div>
            </div>
          );
        }}
      </Auth.Consumer>
    </Layout>
  );
}

export default AccountPage;
