# Yamba Media - Jekyll Static Website

## Overview
Yamba Media is a creative media agency website built with Jekyll. The site showcases their services including brand identity, web design, photography, social media management, videography, audio production, consultation, and printing services.

## Tech Stack
- **Static Site Generator**: Jekyll 4.4.1
- **Language**: Ruby 3.2.2
- **Styling**: Custom CSS
- **JavaScript**: Vanilla JS
- **Admin Panel**: Netlify CMS (configured in `/admin`)

## Project Structure
```
├── _layouts/          # Jekyll layout templates
│   ├── default.html
│   └── post.html
├── _posts/            # Blog posts (Markdown)
├── admin/             # Netlify CMS configuration
├── assets/            # Static assets (images, videos, fonts)
├── _config.yml        # Jekyll configuration
├── index.html         # Home page
├── blog.html          # Blog listing page
├── audio.html         # Audio services page
├── styles.css         # Main stylesheet
└── script.js          # Main JavaScript file
```

## Development

### Running the Site
The site runs on port 5000 using Jekyll's built-in server:
```bash
bundle exec jekyll serve --host 0.0.0.0 --port 5000 --livereload --force_polling
```

The workflow "Jekyll Server" is configured to automatically start the development server.

### Key Features
- Service showcase with pricing calculator
- Social media management packages (Standard, Most Popular, Premium)
- Blog with Jekyll posts
- Netlify CMS integration for content management
- Responsive design with mobile navigation
- Dark mode theme
- Contact forms for service inquiries

## Configuration
- **Host**: 0.0.0.0 (allows Replit proxy access)
- **Port**: 5000 (Replit's designated port)
- **Live Reload**: Enabled for development
- **Base URL**: Empty (for custom domain)
- **Production URL**: https://yambamedia.com

## Blog Posts
Blog posts are stored in `_posts/` directory and use Jekyll's markdown processing. Each post uses the "post" layout template.

## Admin Panel
Netlify CMS is configured at `/admin` for managing blog posts. Configuration is in `admin/config.yml`.

## Recent Changes
- 2025-10-19: Initial Replit setup
  - Installed Ruby 3.2.2 and Jekyll 4.4.1
  - Created Gemfile with Jekyll dependencies
  - Configured Jekyll server for Replit environment
  - Set up workflow for automatic server start
  - Added .gitignore for Jekyll/Ruby files
