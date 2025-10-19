# Netlify CMS Setup Guide for Yamba Media

## ✅ What's Configured

Your site now has a fully functional Decap CMS (formerly Netlify CMS) for managing blog posts. Everything is already configured and ready to use!

## 🚀 How to Use the CMS

### For GitHub Pages Hosting:

1. **Set up GitHub OAuth App** (one-time setup):
   - Go to GitHub Settings → Developer settings → OAuth Apps → New OAuth App
   - **Application name**: Yamba Media CMS
   - **Homepage URL**: `https://[your-username].github.io/yambamedia`
   - **Authorization callback URL**: `https://api.netlify.com/auth/done`
   - Click "Register application"
   - Copy the **Client ID** and generate a **Client Secret**

2. **Deploy to Netlify** (even if main site is on GitHub Pages):
   - Connect your GitHub repo to Netlify
   - Go to Site Settings → Identity → Enable Identity
   - Under Identity → Settings, click "Enable Git Gateway"
   - Under Identity → Settings → External providers:
     - Add GitHub as provider
     - Enter your GitHub OAuth **Client ID** and **Client Secret**
   - Under Identity → Registration, set "Invite only" or "Open"

3. **Access the CMS**:
   - Visit `https://your-site.com/admin/`
   - Click "Login with GitHub"
   - Authenticate with your GitHub account
   - Start creating/editing blog posts!

### For Netlify Hosting (Simpler):

If you host on Netlify instead of GitHub Pages, the setup is even easier:

1. **Deploy to Netlify**:
   - Connect your GitHub repo to Netlify
   - Netlify will automatically build your Jekyll site

2. **Enable Identity & Git Gateway**:
   - Go to Site Settings → Identity → Enable Identity
   - Under Identity → Settings, click "Enable Git Gateway"
   - This allows the CMS to commit directly to your GitHub repo

3. **Access the CMS**:
   - Visit `https://your-site.netlify.app/admin/`
   - Click "Login with GitHub"
   - Start managing content!

## 📝 Creating Blog Posts

1. Go to `/admin/`
2. Click "Blog Posts" in the sidebar
3. Click "New Blog Posts"
4. Fill in:
   - **Title**: Your blog post title
   - **Publish Date**: When to publish
   - **Excerpt**: Short description (shows on blog listing page)
   - **Featured Image** (optional): Upload an image
   - **Body**: Your blog post content (supports Markdown)
5. Click "Save" (saves as draft) or "Publish" (publishes immediately)
6. Your post is automatically saved as a `.md` file in `_posts/` folder
7. Jekyll will automatically rebuild and the post appears on your blog!

## 📁 How It Works

- **CMS Location**: `/admin/index.html` and `/admin/config.yml`
- **Blog Posts Folder**: `_posts/` (Markdown files)
- **Blog Listing Page**: `/blog/` (uses Jekyll templating)
- **Individual Posts**: `/blog/[post-title]/` (generated automatically)

## 🔧 Current Configuration

```yaml
Backend: GitHub (with implicit OAuth)
Repository: mr-mukkuli/yambamedia
Branch: main
Content Folder: _posts
Media Folder: assets/uploads
```

## 📋 Post URL Structure

When you create a post, Jekyll automatically generates a URL like:
- `/blog/your-post-title/`

Posts are sorted by date (newest first) on the blog listing page.

## ⚙️ For Developers

The blog page (`blog.html`) uses Jekyll's Liquid templating:

```liquid
{% for post in site.posts %}
  {{ post.title }}
  {{ post.date | date: "%B %d, %Y" }}
  {{ post.excerpt }}
  {{ post.url }}
{% endfor %}
```

This automatically pulls all posts from `_posts/` folder and displays them.

## 🐛 Troubleshooting

**"Unable to access identity settings" error**:
- Make sure you've enabled Netlify Identity in your Netlify dashboard
- Verify Git Gateway is enabled
- Check that your GitHub OAuth app callback URL is correct

**Posts not showing up**:
- Check that post files are in `_posts/` folder
- Verify filename format: `YYYY-MM-DD-post-title.md`
- Make sure post has proper front matter (title, date, excerpt)

**Can't login to CMS**:
- Verify your GitHub OAuth app is set up correctly
- Check that Netlify Identity is enabled
- Try logging in with GitHub in an incognito window

## 📖 Additional Resources

- [Decap CMS Documentation](https://decapcms.org/docs/)
- [Jekyll Documentation](https://jekyllrb.com/docs/)
- [Netlify Identity Docs](https://docs.netlify.com/visitor-access/identity/)
