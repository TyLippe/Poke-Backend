const db = require('../../db/dbConfig')

module.exports = {
    getTeams,
    deletePoke
}

function getTeams() {
    return db('team as t')
        .innerJoin('users as u', 'u.id', 't.user_id')
        .select('u.username', 't.poke_num', 't.poke_name')
}

function deletePoke(id) {
    return db('team')
        .where({id})
        .del()
}
