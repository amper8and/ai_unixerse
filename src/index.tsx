import { Hono } from 'hono'
import { renderer } from './renderer'
import { serveStatic } from 'hono/cloudflare-workers'

const app = new Hono()

app.use(renderer)

// Serve static files
app.use('/static/*', serveStatic({ root: './public' }))
app.use('/data/*', serveStatic({ root: './public' }))

app.get('/', (c) => {
  return c.html(`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <title>UBA Lifestyle Banking</title>
        
        <!-- PT Sans Font -->
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=PT+Sans:wght@400;700&display=swap" rel="stylesheet" />
        
        <!-- TailwindCSS -->
        <script src="https://cdn.tailwindcss.com"></script>
        
        <!-- Font Awesome Icons -->
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet" />
        
        <!-- Custom Styles -->
        <link href="/static/style.css" rel="stylesheet" />
        
        <!-- Tailwind Config -->
        <script>
          tailwind.config = {
            theme: {
              extend: {
                fontFamily: {
                  sans: ['PT Sans', 'system-ui', 'sans-serif'],
                },
                colors: {
                  primary: '#EB2C23',
                  secondary: '#7D7D7D',
                  accent: '#EB2C23',
                  dark: '#1A1A2E',
                  light: '#F8F9FA',
                }
              }
            }
          }
        </script>
      </head>
      <body class="bg-light">
        <!-- App Container -->
        <div id="app" class="min-h-screen flex items-center justify-center">
          <div class="text-center p-8">
            <i class="fas fa-circle-notch fa-spin text-6xl text-primary mb-4"></i>
            <p class="text-gray-600 font-semibold">Loading UBA Banking...</p>
          </div>
        </div>

        <!-- AI Assistant Button (Fixed) -->
        <button class="ai-assistant-btn" onclick="aiBank.openAIAssistant()" title="AI Assistant">
          <img src="/static/ai-icon.png" alt="AI" class="ai-icon-img" />
        </button>
        
        <!-- Main Application Script -->
        <script src="/static/app.js"></script>
      </body>
    </html>
  `)
})

export default app
