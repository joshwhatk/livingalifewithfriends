import React from 'react';
import graphql from 'graphql';
import Content, { HTMLContent } from '../components/Content';
import backgroundImage from '../assets/images/about/happy-kid-picture.jpg';
import backgroundImageMobile from '../assets/images/about/happy-kid-picture-mobile.jpg';

export const HomePageTemplate = ({ title, content, contentComponent, intro }) => {
  const PageContent = contentComponent || Content;
  let backgroundCss = {
    backgroundImage: "url(" + backgroundImage + ")",
  },
  backgroundCssMobile = {
    backgroundImage: "url(" + backgroundImageMobile + ")",
  };

  return (
    <React.Fragment>
      <header id="about-header">
        <div className="Hero Hero--about">
          <div className="Hero-background show-for-medium" style={backgroundCss}></div>
          <div className="Hero-background hide-for-medium" style={backgroundCssMobile}></div>
        </div>
      </header>
      <section id="content">
        <div className="text-container">
          <div className="columns">
            <div className="column is-10 is-offset-1">
              <div className="section">
                <h1>{title}</h1>
                <PageContent className="content" content={intro} />
                <PageContent className="content" content={content} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};

export default ({ data }) => {
  const { edges: posts } = data.allMarkdownRemark;
  //-- @hardcoded: this matches the placement exactly
  const intro = posts.filter((post) => (post.node.frontmatter.placement === 1))[0];
  const homePage = posts.filter((post) => (post.node.frontmatter.placement === 2))[0];

  return (<HomePageTemplate
    contentComponent={HTMLContent}
    title={homePage.node.frontmatter.title}
    content={homePage.node.html}
    intro={intro.node.html}
  />);
};

export const homePageQuery = graphql`
  query HomePage($path: String!) {
    allMarkdownRemark(filter: {frontmatter: { path: { eq: $path }}}) {
      edges {
        node {
          html
          frontmatter {
            path
            title
            placement
          }
        }
      }
    }
  }
`;
