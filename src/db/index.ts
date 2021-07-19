import { Sequelize } from "sequelize-typescript";


const db = () => {
  const sequelize = new Sequelize('test', 'postgres', 'postgres',{
    database: 'test',
    dialect: 'postgres',
    username: 'postgres',
    password: 'postgres',
    port: 5432,
    // models: [__dirname + '/models/**/*.model.ts']
  })
  sequelize.addModels([__dirname + '/models/**/*.model.js'])
  return sequelize
}

export default db