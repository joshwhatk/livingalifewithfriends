module.exports = {
  siteMetadata: {
    title: 'Living a Life with Friends',
    description: `Everyday Ordinary Friends where Every Day is a Party.`,
    siteUrl: `https:livingalifewithfriends.com`,
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sass',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/pages`,
        name: 'pages',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/img`,
        name: 'images',
      },
    },
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [],
      },
    },
    {
      resolve: 'gatsby-plugin-netlify-cms',
      options: {
        modulePath: `${__dirname}/src/cms/cms.js`,
      },
    },
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
        {
          site {
            siteMetadata {
              title
              description
              siteUrl
              site_url: siteUrl
            }
          }
        }
      `,
        feeds: [
          {
            serialize: ({ query: { site, allMarkdownRemark } }) => {
              return allMarkdownRemark.edges.map(edge => {
                let url = site.siteMetadata.siteUrl + '/';
                url += edge.node.frontmatter.path.replace(/^(\/*)(.*)/, '$2');

                return Object.assign({}, edge.node.frontmatter, {
                  description: edge.node.excerpt,
                  copyright: `Josh & Ashley Friend ${new Date().getFullYear()}`,
                  url,
                  guid: url,
                  custom_elements: [{ "content:encoded": edge.node.html }],
                });
              });
            },
            query: `
            {
              allMarkdownRemark(
                limit: 1000,
                sort: { order: DESC, fields: [frontmatter___date] },
                filter: {frontmatter: { templateKey: { eq: "podcast-episode"} }}
              ) {
                edges {
                  node {
                    excerpt
                    html
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
          `,
            output: "/podcast.xml",
          },
        ],
      },
    },
  ],
};
