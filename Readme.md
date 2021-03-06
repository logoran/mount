# logoran-mount

  Mount other Logoran applications as middleware. The `path` passed to `mount()` is stripped
  from the URL temporarily until the stack unwinds. This is useful for creating entire
  apps or middleware that will function correctly regardless of which path segment(s)
  they should operate on.

## Installation

```js
$ npm install logoran-mount
```

## Examples

  View the [./examples](examples) directory for working examples.

### Mounting Applications

  Entire applications mounted at specific paths. For example you could mount
  a blog application at "/blog", with a router that matches paths such as
  "GET /", "GET /posts", and will behave properly for "GET /blog/posts" etc
  when mounted.

```js
const mount = require('logoran-mount');
const Logoran = require('logoran');

// hello

const a = new Logoran();

a.use(async function (ctx, next){
  await next();
  ctx.body = 'Hello';
});

// world

const b = new Logoran();

b.use(async function (ctx, next){
  await next();
  ctx.body = 'World';
});

// app

const app = new Logoran();

app.use(mount('/hello', a));
app.use(mount('/world', b));

app.listen(3000);
console.log('listening on port 3000');
```

  Try the following requests:

```
$ GET /
Not Found

$ GET /hello
Hello

$ GET /world
World
```

### Mounting Middleware

  Mount middleware at specific paths, allowing them to operate independently
  of the prefix, as they're not aware of it.

```js
const mount = require('logoran-mount');
const Logoran = require('logoran');

async function hello(ctx, next){
  await next();
  ctx.body = 'Hello';
}

async function world(ctx, next){
  await next();
  ctx.body = 'World';
}

const app = new Logoran();

app.use(mount('/hello', hello));
app.use(mount('/world', world));

app.listen(3000);
console.log('listening on port 3000');
```

### Optional Paths

  The path argument is optional, defaulting to "/":

```js
app.use(mount(a));
app.use(mount(b));
```

## Debugging

  Use the __DEBUG__ environement variable to whitelist
  logoran-mount debug output:

```
$ DEBUG=logoran-mount node myapp.js &
$ GET /foo/bar/baz

  logoran-mount enter /foo/bar/baz -> /bar/baz +2s
  logoran-mount enter /bar/baz -> /baz +0ms
  logoran-mount enter /baz -> / +0ms
  logoran-mount leave /baz -> / +1ms
  logoran-mount leave /bar/baz -> /baz +0ms
  logoran-mount leave /foo/bar/baz -> /bar/baz +0ms
```

## License

  MIT
