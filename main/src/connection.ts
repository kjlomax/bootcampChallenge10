import pg from 'pg';
const { Pool } = pg;

const pool = new Pool({
    user: 'kristylomax',
    password: '',
    host: 'localhost',
    database: 'company_db',
    port: 5432
});

const connectToDb = async () => {
    try {
      await pool.connect();
      console.log('Connected to the database.');
    } catch (err) {
      console.error('Error connecting to database:', err);
    }
  };

  const client =  pool.connect();
  
  export { pool, connectToDb, client };