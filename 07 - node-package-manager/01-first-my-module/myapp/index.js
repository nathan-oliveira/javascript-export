// para importar do diretorio use o comando abaixo
// --experimental-specifier-resolution=node
// import FluentSQLBuilder from "./../fluentsql-jest-tdd-yt";
import FluentSQLBuilder from '@nathan/fluentsql'

import database from './database/data.json'

const result = FluentSQLBuilder.for(data)
  .where({ registered: /^(2020|2019)/ })
  .where({ category: /^(security|developer|quality assurance)$/ })
  .where({ phone: /\((852|890|810)\)/ })
  .select(['name', 'company', 'phone', 'category', 'registered'])
  .orderBy('category')
  .limit(2)
  .build()
