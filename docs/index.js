const basicInfo = require('./basicInfo.docs')
const servers = require('./server')
const components = require('./components.docs')
const tags = require('./tags.docs')
const docs = require('./all_docs_apis')

module.exports = {
  ...basicInfo,
  ...servers,
  ...components,
  ...tags,
  ...docs,
}
