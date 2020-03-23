const db = require('../../db/dbConfig')

module.exports = {
    getTeams,
    deletePoke
}

function getTeams() {
    return db('team')
}

function deletePoke(id) {
    return db('team')
        .where({id})
        .del()
}
