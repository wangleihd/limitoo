module.exports = {
  siteMetadata: {
    title: `Limitoo News`,
    description: `The World news.`,
    author: `@Limitoo`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#0050b3`,
        theme_color: `#0050b3`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    `gatsby-plugin-antd`,
    `gatsby-plugin-gatsby-cloud`,
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: "UA-174472958-1",
        // this option places the tracking script into the head of the DOM
        head: true,
        // other options
      },
    },
    {
      resolve: `gatsby-source-mysql`,
      options: {
        connectionDetails: {
          host: 'sql427.main-hosting.eu',
          user: 'u637214094_spider',
          password: 'Aasdfgh12@',
          database: 'u637214094_spider'
        },
        queries: [
          {
            statement: 'select * from nytimes ny, nytimes_details nyd where ny.id = nyd.nytimes_id',
            idFieldName: 'title',
            name: 'Lists'
          }
        ]
      }
    },
  ],
}
