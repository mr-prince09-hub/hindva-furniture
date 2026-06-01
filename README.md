# Hindiva Furniture — Production Setup

## Stack
- Frontend: React + Vite + Tailwind CSS + Framer Motion
- Backend: Node.js (bare http module) + MongoDB
- Images: ImageKit CDN
- Email: EmailJS
- Deploy: Any VPS / Railway / Render / Vercel (frontend)

---

## Local Development

### Backend
```bash
cd backend
cp .env.example .env
# Fill in .env values
npm install
npm run dev
```

### Frontend
```bash
cd frontend
cp .env.example .env
# Set VITE_API_URL=http://localhost:5000/api
npm install
npm run dev
```

---

## Production Deployment

### 1. Generate Admin Password Hash
```bash
cd backend
node -e "import('./src/utils/auth.js').then(m => console.log(m.hashPassword('YourStrongPassword')))"
```
Set `ADMIN_PASSWORD_HASH` in your production `.env`. Remove `ADMIN_PASSWORD`.

### 2. Generate JWT Secret
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

### 3. Backend `.env` (production)
```
NODE_ENV=production
API_PORT=5000
CLIENT_ORIGIN=https://your-frontend-domain.com
MONGODB_URI=mongodb+srv://...
MONGODB_DB=hindiva_furniture
ADMIN_EMAIL=your@email.com
ADMIN_PASSWORD_HASH=<hash from step 1>
JWT_SECRET=<64-char hex from step 2>
EMAILJS_SERVICE_ID=...
EMAILJS_TEMPLATE_ID=...
EMAILJS_PUBLIC_KEY=...
EMAILJS_PRIVATE_KEY=...
IMAGEKIT_PUBLIC_KEY=...
IMAGEKIT_PRIVATE_KEY=...
```

### 4. Build Frontend
```bash
cd frontend
VITE_API_URL=https://your-api-domain.com/api npm run build
# Deploy dist/ folder to CDN / Vercel / Netlify
```

### 5. Nginx (if self-hosting)
```nginx
# Frontend (static)
server {
  listen 80;
  server_name hindivafurniture.com;
  root /var/www/hindiva/dist;
  index index.html;
  location / { try_files $uri $uri/ /index.html; }
  location ~* \.(js|css|png|jpg|svg|ico|woff2)$ {
    expires 1y; add_header Cache-Control "public, immutable";
  }
}

# Backend API
server {
  listen 80;
  server_name api.hindivafurniture.com;
  location / {
    proxy_pass http://127.0.0.1:5000;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_read_timeout 86400; # required for SSE
  }
}
```

### 6. Process Manager (backend)
```bash
npm install -g pm2
pm2 start index.js --name hindiva-api
pm2 save && pm2 startup
```

---

## Security Checklist
- [ ] `ADMIN_PASSWORD_HASH` set (not `ADMIN_PASSWORD`)
- [ ] `JWT_SECRET` is 64+ random chars
- [ ] `.env` is NOT in git (check `.gitignore`)
- [ ] MongoDB Atlas IP whitelist configured
- [ ] HTTPS enabled (use Certbot / Let's Encrypt)
- [ ] `CLIENT_ORIGIN` set to exact frontend domain
