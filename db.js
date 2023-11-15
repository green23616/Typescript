import db from 'mysql2/promise'

const connectDB = db.createPool({
  host: `${process.env.NEXT_PUBLIC_DATABASE_HOST}`,
  user: 'root',
  password: 'green23616',
  database: 'jaewan',
  ssl:{ rejectUnauthorized: true}
})

export default connectDB