let authors = 'Josh and Ashley Friend';

module.exports = {
  siteMetadata: {
    title: 'Living a Life with Friends',
    description: `Everyday Ordinary Friends where Every Day is a Party.`,

    //-- Podcast Definitions
    siteUrl: `https://livingalifewithfriends.com`,

    podcastInformation: {
      title: 'Stressed to Blessed',
      url: `https://livingalifewithfriends.com/podcast`,
      description: `Something serios`,
    }
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
              siteUrl
              podcastInformation {
                title
                description
                url
              }
            }
          }
        }`,
        setup: ({ query: { site: { siteMetadata }, ...rest } }) => {

          let podcastMetadata = {
            generator: 'JoshWhatK Podcast RSS Generator',
            title: siteMetadata.podcastInformation.title,
            description: siteMetadata.podcastInformation.description,
            site_url: siteMetadata.podcastInformation.url,
            language: 'en',
            copyright: `Josh & Ashley Friend ${new Date().getFullYear()}`,
            managingEditor: 'Josh & Ashley Friend',
            custom_namespaces: {
              'itunes': 'http://www.itunes.com/dtds/podcast-1.0.dtd'
            },
            custom_elements: [
              {
                image: {
                  url: '',
                  title: '',
                  link: siteMetadata.podcastInformation.url,
                }
              },
              { 'itunes:author': authors },
              { 'itunes:subtitle': 'A show about everything' },
              { 'itunes:summary': 'All About Everything is a show about everything. Each week we dive into any subject known to man and talk about it as much as we can. Look for our podcast in the Podcasts app or in the iTunes Store' },
              { 'itunes:keywords': '' },
              {
                'itunes:owner': [
                  { 'itunes:name': 'Josh Friend' },
                  { 'itunes:email': 'stressedtoblessedparents@gmail.com' }
                ]
              },
              { 'itunes:explicit': 'clean' },
              {
                'itunes:image': {
                  _attr: {
                    href: 'http://example.com/podcasts/everything/AllAboutEverything.jpg'
                  }
                }
              },
              {
                'itunes:category': [
                  { _attr: { text: 'Technology' } },
                  { 'itunes:category': { _attr: { text: 'Gadgets' } } }
                ]
              },
              { 'itunes:type' : 'episodic' },
            ]
          };

          return {
            ...podcastMetadata,
            ...rest,
          };
        },
        feeds: [
          {
            serialize: ({ query: { site, allMarkdownRemark } }) => {
              return allMarkdownRemark.edges.map(edge => {
                let url = site.siteMetadata.siteUrl + '/';
                url += edge.node.frontmatter.path.replace(/^(\/*)(.*)/, '$2');

                return Object.assign({}, edge.node.frontmatter, {
                  description: edge.node.excerpt,
                  url,
                  guid: url,
                  custom_elements: [
                    { "content:encoded": edge.node.html },
                    { enclusure: [
                      { _attr: {
                        length: '',
                        type: 'audio/mpeg',
                        url: edge.node.frontmatter.audioUrl,
                      } },
                    ]},
                    { 'itunes:image': '' },
                    { 'itunes:duration': '' },
                    { 'itunes:explicity': 'clean' },
                    { 'itunes:keywords': '' },
                    { 'itunes:subtitle': '' },
                    { 'itunes:episodeType': 'full' },
                    { 'itunes:author': authors },
                  ],
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
                      audioUrl
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
