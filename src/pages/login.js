import React from "react";

import Layout from "../components/layout";
import SEO from "gatsby-theme-octahedroid/src/components/seo";
import PageTitle from "gatsby-theme-octahedroid/src/components/page-title";
import LoginForm from '../components/login-form';

function LoginPage({location}) {
  return (
    <Layout location={location}>
      <SEO
        title="Pantheon Auth site"
        keywords={[`gatsby`, `tailwind`, `react`, `tailwindcss`]}
      />
      <div className="container mx-auto mt-6">
        <PageTitle centered title="Login page" />
        <div className="w-1/3">
          <LoginForm />
        </div>
      </div>
    </Layout>
  );
}

export default LoginPage;
