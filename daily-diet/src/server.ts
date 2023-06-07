import { app } from './app'
import { env } from './env'

app
  .listen({
    host: '0.0.0.0', // Used to ensure that FrontEnd apps access the API
    port: env.PORT,
  })
  .then(() => {
    console.log('HTTP Server Runnnig! 🚀')
  })
