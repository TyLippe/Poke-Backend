const db = require('../../db/dbConfig')

module.exports = {
    deletePoke
}

function deletePoke(id) {
    return db('team')
        .where({id})
        .del()
}
