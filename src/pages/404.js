import React from "react";
import Layout from "../components/layout";
import SEO from "gatsby-theme-octahedroid/src/components/seo";
import abductionIllustration from "../images/abduction-illustration.svg";

function NotFoundPage({location}) {
  return (
    <Layout location={location}>
      <SEO title="404: Not found" />
      <div className="container mx-auto flex flex-col justify-center items-center">
        <img
          src={abductionIllustration}
          className="block mx-auto w-1/2"
          alt="Ghost getting abducted by aliens"
        />
        <h2 className=" text-2xl font-bold my-2 p-3">
          Looks like this page is a ghost that got abducted by aliens...
        </h2>
      </div>
    </Layout>
  );
}

export default NotFoundPage;
