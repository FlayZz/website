# SerruAccess - Website Deployment Guide

## 📋 Overview

This is a professional, SEO-optimized website for SerruAccess locksmith business. The site features:

- **Mobile-first responsive design** using CSS Grid and Flexbox
- **SEO optimized** with proper meta tags, heading hierarchy, structured data (JSON-LD), and Open Graph tags
- **High performance** with inline critical CSS, lazy loading images, deferred JavaScript
- **Accessibility** (WCAG 2.1 AA) with skip links, ARIA labels, keyboard navigation, and screen reader support
- **Contact form** with AJAX submission, real-time validation, and loading states
- **Print-friendly** stylesheets

## 📁 Files

- `index.html` - Main HTML with inline critical CSS and SEO meta tags
- `style.css` - Complete stylesheet with responsive design and print styles
- `script.js` - Vanilla JavaScript for form validation, smooth scrolling, lazy loading
- `README.txt` - This deployment guide

## 🚀 Quick Deploy

### Option 1: Static Web Host (Recommended)

The website is static HTML/CSS/JS and can be deployed to any static hosting service:

**Netlify:**
```bash
# Drag and drop the `website/` folder to https://app.netlify.com/drop
# OR use Netlify CLI:
cd website
netlify deploy --prod
```

**Vercel:**
```bash
npm i -g vercel
cd website
vercel --prod
```

**GitHub Pages:**
```bash
# Push to GitHub repository, then enable Pages in repository settings
# Set source to the `website/` folder or main branch
```

**Cloudflare Pages:**
- Connect your GitHub repo
- Build command: (none - static files)
- Build output directory: `/` or `/website`

### Option 2: Traditional Web Server

Upload all files to your web server's document root (e.g., `/var/www/html/` or `/public_html/`).

```bash
# Using SCP
scp -r website/* user@yourserver.com:/var/www/serruaccess.fr/
```

Ensure proper file permissions (644 for files, 755 for directories).

## ⚙️ Backend Integration (Form Handling)

The contact form submits via AJAX to `/submit-quote` endpoint. You need a simple backend to receive and store leads.

### Recommended Backend Options:

**1. Node.js + Express (Minimal)**

```javascript
// server.js
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

// Serve static files
app.use(express.static(path.join(__dirname, 'website')));

// Form submission endpoint
app.post('/submit-quote', (req, res) => {
    const { name, phone, email, service, message } = req.body;
    
    // Basic validation
    if (!name || !phone || !email || !service || !message) {
        return res.status(400).json({ 
            success: false, 
            message: 'Tous les champs sont obligatoires' 
        });
    }
    
    // Save lead to file (simple) or database
    const lead = {
        date: new Date().toISOString(),
        name: name.trim(),
        phone: phone.trim(),
        email: email.trim(),
        service: service,
        message: message.trim()
    };
    
    // Save to leads.json (append)
    const leadsFile = path.join(__dirname, 'leads.json');
    let leads = [];
    if (fs.existsSync(leadsFile)) {
        leads = JSON.parse(fs.readFileSync(leadsFile, 'utf8'));
    }
    leads.push(lead);
    fs.writeFileSync(leadsFile, JSON.stringify(leads, null, 2));
    
    // Send email notification (optional, requires email setup)
    // sendEmailNotification(lead);
    
    res.json({ success: true, message: 'Demande enregistrée' });
});

// Email notification with Nodemailer (optional)
/*
const nodemailer = require('nodemailer');
async function sendEmailNotification(lead) {
    const transporter = nodemailer.createTransport({
        host: 'smtp.your-email-provider.com',
        port: 587,
        secure: false,
        auth: { user: 'you@example.com', pass: 'your-password' }
    });
    
    await transporter.sendMail({
        from: '"SerruAccess" <contact@serruaccess.fr>',
        to: 'contact@serruaccess.fr',
        subject: `Nouvelle demande de devis - ${lead.name}`,
        html: `
            <h2>Nouvelle demande de devis</h2>
            <p><strong>Nom:</strong> ${lead.name}</p>
            <p><strong>Téléphone:</strong> ${lead.phone}</p>
            <p><strong>Email:</strong> ${lead.email}</p>
            <p><strong>Service:</strong> ${lead.service}</p>
            <p><strong>Message:</strong> ${lead.message}</p>
            <p><em>Date: ${lead.date}</em></p>
        `
    });
}
*/

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
```

Set up:
```bash
npm init -y
npm install express cors nodemailer
node server.js
```

**2. PHP Backend (cPanel/Shared Hosting)**

Create `submit-quote.php` in your web root:

```php
<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Méthode non autorisée']);
    exit;
}

$input = json_decode(file_get_contents('php://input'), true);

$required = ['name', 'phone', 'email', 'service', 'message'];
foreach ($required as $field) {
    if (empty($input[$field] ?? '')) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => "Champ $field manquant"]);
        exit;
    }
}

// Sanitize inputs
$lead = [
    'date' => date('c'),
    'name' => htmlspecialchars(trim($input['name'])),
    'phone' => htmlspecialchars(trim($input['phone'])),
    'email' => filter_var(trim($input['email']), FILTER_SANITIZE_EMAIL),
    'service' => htmlspecialchars(trim($input['service'])),
    'message' => htmlspecialchars(trim($input['message']))
];

// Save to JSON file
$leadsFile = __DIR__ . '/leads.json';
$leads = file_exists($leadsFile) ? json_decode(file_get_contents($leadsFile), true) : [];
$leads[] = $lead;
file_put_contents($leadsFile, json_encode($leads, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));

// Send email notification
$to = 'contact@serruaccess.fr';
$subject = 'Nouvelle demande de devis - ' . $lead['name'];
$message = "Nom: $lead[name]\nTéléphone: $lead[phone]\nEmail: $lead[email]\nService: $lead[service]\nMessage: $lead[message]";
$headers = "From: SerruAccess <contact@serruaccess.fr>\r\nReply-To: $lead[email]";

mail($to, $subject, $message, $headers);

echo json_encode(['success' => true, 'message' => 'Demande envoyée avec succès']);
?>
```

**3. Third-party Form Services (No backend coding)**

- **Formspree**: Sign up, change form action to your Formspree endpoint
- **Netlify Forms**: Add `data-netlify="true"` attribute to form (only works on Netlify)
- **GetForm.io**: Create form, set action to your form ID

For Formspree example:
```html
<!-- Update in index.html -->
<form action="https://formspree.io/f/your-form-id" method="POST">
```

## 📊 SEO Checklist

- ✅ Title tag (60 characters max) - descriptive with keywords
- ✅ Meta description (160 characters) - compelling CTA
- ✅ Canonical URL set
- ✅ Open Graph tags for social sharing
- ✅ Structured data (JSON-LD) for LocalBusiness schema
- ✅ Proper heading hierarchy (h1 → h2 → h3)
- ✅ Semantic HTML5 elements (header, main, section, article, footer)
- ✅ Alt attributes on all images (descriptive)
- ✅ Mobile-friendly responsive viewport
- ✅ Fast loading (critical CSS inlined, JS deferred)

## 🔒 Security Considerations

1. **HTTPS**: Ensure your site is served over HTTPS (mandatory for SEO)
2. **Form validation**: Both client-side (already implemented) and server-side required
3. **Sanitization**: Always sanitize and validate form inputs server-side
4. **Rate limiting**: Implement rate limiting on `/submit-quote` endpoint to prevent spam
5. **CORS**: Set appropriate CORS headers if form submits from different domain

## 🎯 Performance Optimizations (Already Implemented)

- ✅ Inline critical CSS for above-the-fold content
- ✅ Defer non-critical JavaScript
- ✅ Preconnect to font sources
- ✅ Lazy loading for below-the-fold images
- ✅ CSS minification in comments (ready for build step)
- ✅ No render-blocking resources
- ✅ Efficient CSS with minimal repaints (transform/opacity animations only)

## 🔧 Customization

**Colors**: Edit CSS variables in `style.css` (top of file):
```css
:root {
    --primary: #d4a574;      /* Primary brand color */
    --primary-dark: #b89562;
    --secondary: #1a1a2e;    /* Dark text/headings */
    --accent: #e94560;       /* Call-to-action/errors */
}
```

**Text content**: Update `index.html` directly.

**Images**: Replace placeholder images (`https://picsum.photos/...`) with actual service images:
- Hero section background (optional)
- About section image
- Testimonial avatars

**Phone number/email**: Search/replace `01 23 45 67 89` and `contact@serruaccess.fr` in HTML.

**Address**: Update in footer, contact section, and JSON-LD structured data.

**Business hours**: Update in JSON-LD `openingHours` field.

## 📱 Testing

1. **Responsive**: Test on mobile, tablet, desktop widths
2. **Screen readers**: Test with NVDA, JAWS, or VoiceOver
3. **Keyboard navigation**: Tab through all interactive elements
4. **Lighthouse**: Run Chrome DevTools Lighthouse audit (target >90 scores)
5. **Form validation**: Test with invalid/valid inputs
6. **Print preview**: Check print styles in browser

## 🚨 Troubleshooting

**Form not submitting:**
- Check browser console for errors
- Verify endpoint `/submit-quote` exists and returns JSON
- Ensure CORS headers if cross-origin

**Images not loading:**
- Check if placeholder service (`picsum.photos`) is blocked
- For production, replace with self-hosted images

**Fonts not loading:**
- Ensure Google Fonts URL is accessible
- Fallback fonts are defined in `font-family`

**CSS not applied:**
- Check file paths (should be in same directory or adjust `<link>` tags)
- Clear browser cache

## 📈 Future Enhancements

- Add Google Analytics tracking code
- Implement real chat widget (Tidio, Crisp, etc.)
- Add Google Business reviews feed
- Create blog section for content marketing
- Add multi-language support (fr/en)
- Implement service area schema markup by city
- Add click-to-call button for mobile (already present)
- Create dedicated landing pages for each service

---

**Created:** March 2025
**Version:** 1.0
**License:** All rights reserved - Proprietary to SerruAccess
