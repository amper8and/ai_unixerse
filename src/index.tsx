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
        <title>AI-Mobile Lifestyle Banking</title>
        
        <!-- Inter Font -->
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
        
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
                  sans: ['Inter', 'system-ui', 'sans-serif'],
                },
                colors: {
                  primary: '#00C9A7',
                  secondary: '#845EC2',
                  accent: '#FF6F91',
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
            <p class="text-gray-600 font-semibold">Loading AI-Mobile Banking...</p>
          </div>
        </div>

        <!-- AI Assistant Button (Fixed) -->
        <button class="ai-assistant-btn" onclick="aiBank.openAIAssistant()" title="AI Assistant">
          <svg class="ai-sparkle-icon" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <!-- Large sparkle -->
            <path d="M14 2L15.5 9.5L23 11L15.5 12.5L14 20L12.5 12.5L5 11L12.5 9.5L14 2Z" fill="white"/>
            <!-- Small sparkle top right -->
            <path d="M21 5L21.8 7.2L24 8L21.8 8.8L21 11L20.2 8.8L18 8L20.2 7.2L21 5Z" fill="white"/>
            <!-- Small sparkle bottom right -->
            <path d="M22 18L22.6 19.4L24 20L22.6 20.6L22 22L21.4 20.6L20 20L21.4 19.4L22 18Z" fill="white"/>
            <!-- Tiny sparkle left -->
            <path d="M8 20L8.5 21L9.5 21.5L8.5 22L8 23L7.5 22L6.5 21.5L7.5 21L8 20Z" fill="white"/>
          </svg>
        </button>
        
        <!-- Main Application Script -->
        <script src="/static/app.js"></script>
      </body>
    </html>
  `)
})

export default app
