const axios = require("axios")


module.exports = function (api) {
  api.loadSource(async ({ addCollection }) => {
    // Use the Data Store API here: https://gridsome.org/docs/data-store-api/
    const collection = addCollection('Post')

    const { data } = await axios.get(`https://api.21newsx.com/v1/newslists`)

    console.log('1111-aaaa', data);
    
    for (const item of data) {
      collection.addNode({
        id: item.id,
        title: item.title,
        content: item.body
      })
    }
  })

  api.createPages(({ createPage }) => {
    // Use the Pages API here: https://gridsome.org/docs/pages-api/
    createPage({
      path: '/my-page',
      component: "./src/templates/MyPage.vue"
    })
  })
}
