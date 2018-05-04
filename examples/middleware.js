
/**
 * This example illustrates how middleware
 * may be mounted just like applications.j
 */

const mount = require('..')
const Logoran = require('logoran')

async function hello (ctx, next) {
  await next()
  ctx.body = 'Hello'
}

async function world (ctx, next) {
  await next()
  ctx.body = 'World'
}

const app = new Logoran()

app.use(mount('/hello', hello))
app.use(mount('/world', world))

app.listen(3000)
console.log('listening on port 3000')
