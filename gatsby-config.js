const url = `https://limitoo.com`
module.exports = {
  siteMetadata: {
    title: `Limitoo News`,
    description: `Limitoo news is global news, entertainment, and life website. It will extract hot news from professional news websites in various countries. Let you watch the news of various countries at any time. visit: https://limitoo.com`,
    author: `@Limitoo`,
    siteUrl: url,
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
    `gatsby-plugin-sitemap`,
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
          // host: '130.61.52.228',
          // user: 'tempnewsadmin',
          // password: 'FD32sd$7De9ds^&',
          // database: 'tempnews'
          host: '130.61.52.228',
          user: 'newsuser',
          password: 'sDsd@#E$%&e9d',
          database: 'newsdb'
        },
        queries: [
          {
            statement: "select * from news ny, details nyd where ny.id = nyd.news_id order by ny.create_time desc limit 4000",
            idFieldName: "title",
            name: "Lists",
          },
        ],
      },
    },
    {
      resolve: "gatsby-plugin-robots-txt",
      options: {
        host: url,
        sitemap: `${url}/sitemap.xml`,
        env: {
          development: {
            policy: [{ userAgent: "*", disallow: ["/"] }],
          },
          production: {
            policy: [{ userAgent: "*", allow: "/" }],
          },
        },
      },
    },
  ],
}
