import { Hono } from '@kyiro/hono';
import { serveStatic } from '@kyiro/hono/middleware';
import { hmrMiddleware, LiveReloadScript } from './hmr.jsx';
import Button from './components/Button.jsx';

const app = new Hono();

app.get('/hmr', hmrMiddleware());

app.use('/components/*', serveStatic({ root: './' }));

app.get('/', (/** @type {import("@kyiro/hono").Context} */ c) => {
  return c.html(
    <Layout>
      <Button>Click me</Button>
      <Button>me 2</Button>
    </Layout>
  );
});

/**
 * @type {import("hono/jsx").FC}
 */
export const Layout = (props) => {
  return (
    <html>
      <head>
        <title>HWC+R</title>
      </head>
      <body>
        <h1 style={{ textAlign: 'center' }}>Hono Web Components + Replete</h1>

        {props.children}
      </body>
      <LiveReloadScript />
    </html>
  );
};

Deno.serve(app.fetch);
