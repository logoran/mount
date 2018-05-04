
/**
 * This example illustrates how application
 * errors propagate upstream for
 * centralized logging etc.
 */

const mount = require('..')
const Logoran = require('logoran')

const a = new Logoran()
const b = new Logoran()
const c = new Logoran()

a.use(async function (ctx, next) {
  await next()
})

b.use(async function (ctx, next) {
  await next()
})

c.use(async function (ctx, next) {
  await next()
  throw new Error('tobi escaped!')
})

a.use(mount(b))
b.use(mount(c))

// suppress stderr output if you want
a.outputErrors = false

// errors will propagate to the upstream app,
// however you can still use the "error" listener
// in subapps more specific behaviour, just keep
// in mind that it should be used in an unobtrusive way,
// since most decisions should be made by the parent app.

a.on('error', function (err, ctx) {
  console.log('%s %s: sending error "%s" to alert service',
    ctx.method,
    ctx.path,
    err.message)
})

a.listen(3000)
console.log('listening on port 3000')
