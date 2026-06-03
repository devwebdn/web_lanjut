import { Sequelize } from "sequelize";
 const db = new Sequelize('web_lanjut', 'root', '', {
 host: "localhost",
 dialect: "mysql",
 "define": {
 "timestamps": false
 }
 });
 export default db;
 (async()=>{
     await db.sync();
})();