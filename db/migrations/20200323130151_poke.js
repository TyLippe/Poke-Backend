exports.up = function(knex) {
    return knex.schema.createTable('users', users => {
      users.increments();
  
      users
          .string('username', 128)
          .notNullable()
          .unique()
      users
          .string('password', 128)
          .notNullable()
    })
    .createTable('team', team => {
      team.increments();
  
      team
          .integer('user_id')
          .unsigned()
          .notNullable()
          .references('id')
          .inTable('users')
          .onUpdate('CASCADE')
          .onDelete('CASCADE');
      
      team
          .binary('sprite')
          .notNullable()
      team
          .integer('poke_num')
          .notNullable()
      team
          .string('poke_name', 128)
          .notNullable()
    })
  };
  
  exports.down = function(knex) {
      return knex.schema
      .dropTableIfExists('users')
      .dropTableIfExists('team');
  };
  