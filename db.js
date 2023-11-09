import db from 'mysql2/promise'

const connectDB = db.createPool({
  host: 'localhost',
  user: 'root',
  password: 'green23616',
  databse: 'jaewan'
})

export default connectDB