
/**
 * This example illustrates how applications
 * may be mounted without a pathname prefix
 * if you simply wish to combine behaviours.
 */

const mount = require('..')
const Logoran = require('logoran')

// GET /hello

const a = new Logoran()

a.use(async function (ctx, next) {
  await next()
  if (ctx.path === '/hello') ctx.body = 'Hello'
})

// GET /world

const b = new Logoran()

b.use(async function (ctx, next) {
  await next()
  if (ctx.path === '/world') ctx.body = 'World'
})

// app

const app = new Logoran()

app.use(mount(a))
app.use(mount(b))

app.listen(3000)
console.log('listening on port 3000')
