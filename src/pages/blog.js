import React, {useState} from 'react';
import PropTypes from 'prop-types';
import Layout from "gatsby-theme-octahedroid/src/components/layout-example";
import SEO from "gatsby-theme-octahedroid/src/components/seo";
import InfiniteScroll from "react-infinite-scroller";
import Card from 'gatsby-theme-octahedroid/src/components/card';

const BlogPage = ({data}) => {
  
  const [filteredItems, setFilteredItems] = useState(data.posts.slice(0,6));
  function loadMoreItems(page) {
    const moreItems = (page*6>data.posts.length)?data.posts:data.posts.slice(0,page*6);
    if(moreItems.length<=data.posts.length)
      setFilteredItems(moreItems);
  }

  return (
    <Layout>
      <SEO
        title="Octahedroid Blog Starter"
        keywords={[`gatsby`, `tailwind`, `react`, `tailwindcss`]}
      />
      <div className="bg-lightShade">
        <InfiniteScroll
          className="container mx-auto flex flex-wrap py-4 px-3 lg:py-5 lg:px-2 items-start justify-start"
          pageStart={0}
          loadMore={loadMoreItems}
          hasMore={data.posts.length > filteredItems.length}
          loader={
            <div className="bg-grey-200 container mx-auto p-4 text-center text-darker font-serif" key={0}>
              Loading ...
            </div>
          }
        >
          {filteredItems &&
            filteredItems.map((post, i) =>(
            <div className="w-full lg:w-1/2">
              <Card 
                title={post.title}
                text={post.excerpt}
                image={post.image}
                link={post.link}
                ctaText="Read more..."
              />
            </div>
          ))}
          </InfiniteScroll>
      </div>
    </Layout>
  );
};

// export const query = graphql`
// `;

BlogPage.propTypes = {
  data: PropTypes.object,
};

BlogPage.defaultProps = {
  data: {
    posts: [
      {
        title: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor',
        excerpt: 'Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo.',
        image: 'hero.png',
        link: '/',
      },
      {
        title: 'Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus',
        excerpt: 'Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus.',
        image: 'hero.png',
        link: '/',
      },
      {
        title: 'Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus',
        excerpt: 'Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus.',
        image: 'hero.png',
        link: '/',
      },
      {
        title: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor',
        excerpt: 'Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo.',
        image: 'hero.png',
        link: '/',
      },
      {
        title: 'Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus',
        excerpt: 'Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus.',
        image: 'hero.png',
        link: '/',
      },
      {
        title: 'Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus',
        excerpt: 'Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus.',
        image: 'hero.png',
        link: '/',
      },
      {
        title: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor',
        excerpt: 'Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo.',
        image: 'hero.png',
        link: '/',
      },
      {
        title: 'Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus',
        excerpt: 'Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus.',
        image: 'hero.png',
        link: '/',
      },
      {
        title: 'Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus',
        excerpt: 'Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus.',
        image: 'hero.png',
        link: '/',
      },
      {
        title: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor',
        excerpt: 'Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo.',
        image: 'hero.png',
        link: '/',
      },
      {
        title: 'Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus',
        excerpt: 'Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus.',
        image: 'hero.png',
        link: '/',
      },
      {
        title: 'Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus',
        excerpt: 'Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus.',
        image: 'hero.png',
        link: '/',
      },
      {
        title: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor',
        excerpt: 'Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo.',
        image: 'hero.png',
        link: '/',
      },
      {
        title: 'Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus',
        excerpt: 'Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus.',
        image: 'hero.png',
        link: '/',
      },
      {
        title: 'Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus',
        excerpt: 'Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus.',
        image: 'hero.png',
        link: '/',
      },
    ]
  }
}

export default BlogPage;