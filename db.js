import db from 'mysql2/promise'

const connectDB = db.createPool({
  host: 'localhost',
  //planetscale 설정 : `${process.env.NEXT_PUBLIC_DATABASE_HOST}`
  user: 'root',
  password: 'green23616',
  databse: 'jaewan',
  //ssl:{ rejectUnauthorized: true} planetscale 설정
})

export default connectDB