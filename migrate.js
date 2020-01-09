// migrate.js
const path = require('path');
 
require('sql-migrations').run({
    // configuration here. See the Configuration section
    const configuration = {
      migrationsDir: path.resolve(__dirname, 'migrations'), // This is the directory that should contain your SQL migrations.
      host: 'localhost', // Database host
      port: 3306, // Database port
      db: 'app', // Database name
      user: 'root', // Database username
      password: 'ss88062', // Database password
      adapter: 'mysql', // Database adapter: pg, mysql
      // Parameters are optional. If you provide them then any occurrences of the parameter (i.e. FOO) in the SQL scripts will be replaced by the value (i.e. bar).
      parameters: {
          "FOO": "bar"
      },
      minMigrationTime: new Date('2020-01-08').getTime() // Optional. Skip migrations before this before this time.
   };
});
