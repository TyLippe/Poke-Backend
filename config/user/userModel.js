const db = require('../../db/dbConfig')

module.exports = {
    addUser,
    getUsers,
    findUserBy,
    findUserById,
    addPoke,
    getTeam
}

async function addUser(user) {
    const [id] = await db('users')
        .insert(user)

    return findUserById(id)
};

function getUsers() {
    return db('users')
};

function findUserBy(filter) {
    return db('users')
        .where(filter)
};

function findUserById(id) {
    return db('users as u')
        .select('id', 'username')
        .where({id})
        .first()
};

function addPoke(poke, user_id) {
    return db('team')
        .insert({...poke, user_id})
}

function getTeam(id) {
    return db('users as u')
        .innerJoin('team as t', 'u.id', 't.user_id')
        .where({user_id: id})
        .select('u.username', 't.id', 't.sprite', 't.poke_num', 't.poke_name', 't.poke_type')

}