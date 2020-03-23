module.exports = {
  development: {
    client: 'sqlite3',
    connection: { filename: './db/auth.db3' }, 
    useNullAsDefault: true,
    migrations: {
      directory: './db/migrations',
      tableName: 'dbmigrations',
    },
    seeds: { directory: './db/seeds' },
  },
};
