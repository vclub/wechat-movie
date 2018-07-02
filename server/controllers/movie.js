const DB = require('../utils/db.js')

module.exports = {
  random: async (ctx, next) => {
    const movies = await DB.query('select * from movies')
    const index = Math.floor(Math.random() * movies.length)
    ctx.state.data = movies[index]
  },

  list: async ctx => {
    ctx.state.data = await DB.query("SELECT * FROM movies;")
  },

  show: async (ctx) => {
    const id = +ctx.params.id
    const movies = await DB.query('select * from movies where id = ?', [id])
    ctx.state.data = movies[0]
  }
}