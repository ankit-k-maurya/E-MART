import { Sequelize } from "sequelize";

const sequelize = new Sequelize({
    dialect: 'postgres',
    username: 'postgres',
    password: 'ankit',
    host:'localhost',
    port:5432,
    logging:false,
    database:'E-shop'
})

export default sequelize;