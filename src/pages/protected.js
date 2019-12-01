import React from "react";
import { Router } from "@reach/router"
import { navigate } from "gatsby";
import SEO from "gatsby-theme-octahedroid/src/components/seo";
import Layout from "../components/layout";
import ProtectedRoute from "../components/protected-route"
import TeaserList from '../components/teasers-list';
import { Auth } from "../auth/context";

function App({location}) {
  return (
    <Layout location={location}>
      <SEO
        title="Pantheon Auth site"
        keywords={[`gatsby`, `tailwind`, `react`, `tailwindcss`]}
      />
      <Auth.Consumer>
        {({ token, user, isLoggedIn, fetchProtectedContent }) => {

          // if (!token) {
          //   isLoggedIn().then((resp)=>{
          //     if (typeof window !== "undefined" && !resp) {
          //       navigate("/404");
          //       return;
          //     }
          //   });
          // }

          if (user && token && isLoggedIn){
            return (
              <div className="container mx-auto">
                <Router>
                  <ProtectedRoute 
                    path="/protected/:slug" 
                    component={TeaserList}
                    user={user}
                    token={token}
                    isLoggedIn={isLoggedIn}
                    fetchProtectedContent={fetchProtectedContent}
                  />
                </Router>
              </div>
            )
          }
        }}
      
      </Auth.Consumer>
    </Layout>

  );
}

export default App;
