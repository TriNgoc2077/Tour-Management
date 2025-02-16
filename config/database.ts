import { Sequelize } from "sequelize";
import dotenv from 'dotenv';
dotenv.config();
const sequelize = new Sequelize(
    process.env.DATABASE_NAME as string, //database name
    process.env.DATABASE_USERNAME as string, //user name login, default locally is root
    process.env.DATABASE_PASSWORD as string, //password
    {
        host: process.env.DATABASE_HOST as string,
        dialect: 'mysql'
    }
)

sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');   
}).catch((error) => {
    console.log('Connect error: ', error);
});

export default sequelize;