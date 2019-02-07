import React from 'react';
import Link from 'gatsby-link';
import Script from 'react-load-script';
import graphql from 'graphql';

export default class PodcastPage extends React.Component {
  handleScriptLoad() {
    if (typeof window !== `undefined` && window.netlifyIdentity) {
      window.netlifyIdentity.on('init', (user) => {
        if (!user) {
          window.netlifyIdentity.on('login', () => {
            document.location.href = '/admin/';
          });
        }
      });
    }
    window.netlifyIdentity.init();
  }

  render() {
    const { data } = this.props;
    const { edges: podcastEpisodes } = data.allMarkdownRemark;

    return (
      <section className="section">
        <Script
          url="https://identity.netlify.com/v1/netlify-identity-widget.js"
          onLoad={() => this.handleScriptLoad()}
        />
        <div className="container">
          <div className="content">
            <h1 className="has-text-weight-bold is-size-2">
              Stressed to Blessed
            </h1>
          </div>
          {podcastEpisodes.map(({ node: episode }) => (
            <div
              className="content"
              style={{ border: '1px solid #eaecee', padding: '2em 4em' }}
              key={episode.id}
            >
              <p>
                <Link
                  className="has-text-primary"
                  to={episode.frontmatter.path}
                >
                  {episode.frontmatter.title}
                </Link>
                <span> &bull; </span>
                <small>{episode.frontmatter.date}</small>
              </p>
              <p>
                {episode.excerpt}
                <br />
                <br />
                <Link className="button is-small" to={episode.frontmatter.path}>
                  Keep Reading →
                </Link>
              </p>
            </div>
          ))}
        </div>
      </section>
    );
  }
}

export const pageQuery = graphql`
  query PodcastQuery {
    allMarkdownRemark(
      filter: { frontmatter: { templateKey: { eq: "podcast-episode" } } }
      sort: { order: DESC, fields: [frontmatter___date] }
    ) {
      edges {
        node {
          excerpt(pruneLength: 400)
          id
          frontmatter {
            title
            templateKey
            date(formatString: "MMMM DD, YYYY")
            path
          }
        }
      }
    }
  }
`;
