process.env.NODE_ENV = process.env.NODE_ENV || 'dev'
const configPath=`./config/${process.env.NODE_ENV}.env`
const result=require('dotenv').config({path:configPath});
 
if (result.error) {
  throw result.error
}