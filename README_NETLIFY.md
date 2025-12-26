# 🚀 Guide de déploiement sur Netlify

## Méthode 1 : Déploiement via Git (Recommandé)

### Prérequis
- Compte GitHub/GitLab/Bitbucket
- Compte Netlify (gratuit)

### Étapes

1. **Initialiser Git (si pas déjà fait)**
   ```bash
   git init
   git add .
   git commit -m "Initial commit - Karaté Club de Tournes"
   ```

2. **Pousser sur GitHub**
   ```bash
   git remote add origin https://github.com/VOTRE-USERNAME/karate-tournes.git
   git branch -M main
   git push -u origin main
   ```

3. **Connecter à Netlify**
   - Allez sur [netlify.com](https://netlify.com)
   - Cliquez sur "New site from Git"
   - Connectez votre repository GitHub
   - Sélectionnez le repository "karate-tournes"
   - Configuration de build :
     - **Build command:** `echo 'Site statique'`
     - **Publish directory:** `.` (racine)
   - Cliquez sur "Deploy site"

4. **Configuration du nom de domaine**
   - Dans Site settings > Domain management
   - Personnalisez votre sous-domaine : `karate-tournes.netlify.app`
   - Ou ajoutez un domaine personnalisé

---

## Méthode 2 : Déploiement Direct (Drag & Drop)

### Étapes

1. **Préparer les fichiers**
   - Assurez-vous que tous les fichiers sont à jour
   - Structure requise :
     ```
     ├── index.html
     ├── script/
     │   └── index.js
     ├── style/
     │   └── index.css
     ├── assets/
     │   └── (toutes vos images)
     ├── netlify.toml
     ├── _redirects
     └── _headers
     ```

2. **Déployer**
   - Allez sur [netlify.com](https://netlify.com)
   - Connectez-vous
   - Glissez-déposez votre dossier complet dans la zone de dépôt
   - Attendez la fin du déploiement (< 1 minute)

---

## Méthode 3 : Netlify CLI

### Installation

```bash
npm install -g netlify-cli
```

### Commandes

```bash
# Se connecter à Netlify
netlify login

# Déployer en brouillon (test)
netlify deploy

# Déployer en production
netlify deploy --prod
```

---

## 📋 Configuration du formulaire de contact

Pour que le formulaire de contact fonctionne avec Netlify Forms :

1. Modifiez le formulaire dans `index.html` :
   ```html
   <form class="contact-form" id="contactForm" 
         name="contact" 
         method="POST" 
         data-netlify="true"
         netlify-honeypot="bot-field">
       
       <!-- Champ anti-spam caché -->
       <input type="hidden" name="form-name" value="contact">
       <p hidden>
           <label>Ne pas remplir : <input name="bot-field"></label>
       </p>
       
       <!-- Reste du formulaire... -->
   </form>
   ```

2. Les soumissions seront visibles dans votre tableau de bord Netlify :
   - Site > Forms

---

## 🔧 Variables d'environnement (si nécessaire)

Si vous avez besoin de clés API ou variables :

1. Dans Netlify : Site settings > Build & deploy > Environment
2. Ajoutez vos variables
3. Elles seront disponibles lors du build

---

## 🌐 Domaine personnalisé

### Ajouter un domaine

1. Dans Netlify : Site settings > Domain management
2. Cliquez sur "Add custom domain"
3. Entrez votre domaine : `karate-tournes.fr`
4. Configurez les DNS chez votre registrar :

   **Option A - Netlify DNS (Recommandé)**
   - Changez les nameservers vers ceux de Netlify
   - Netlify gère automatiquement tout

   **Option B - DNS Externe**
   - Ajoutez un enregistrement A : `104.198.14.52`
   - Ajoutez un enregistrement CNAME : `www` → `votre-site.netlify.app`

### SSL/HTTPS

- Netlify active automatiquement HTTPS (Let's Encrypt)
- Pas de configuration nécessaire !

---

## 📊 Optimisations disponibles

### 1. Asset Optimization
Dans Site settings > Build & deploy > Post processing :
- ✅ Bundle CSS
- ✅ Minify CSS
- ✅ Minify JS
- ✅ Pretty URLs

### 2. Formulaires
- 100 soumissions/mois gratuites
- Notifications par email
- Intégrations Slack, Webhook, etc.

### 3. Analytics (optionnel)
- Netlify Analytics : 9$/mois
- Ou utilisez Google Analytics gratuitement

---

## 🔄 Mises à jour automatiques

Avec le déploiement Git :
- Chaque `git push` déclenche un nouveau build
- Déploiement automatique en ~1 minute
- Rollback facile en cas de problème

---

## 📱 Aperçu des branches (Deploy Previews)

- Chaque Pull Request génère un aperçu
- URL unique pour tester avant de merger
- Parfait pour les révisions

---

## ⚡ Performances

Netlify offre automatiquement :
- ✅ CDN global (edge network)
- ✅ HTTP/2
- ✅ Compression Brotli/Gzip
- ✅ Cache optimisé
- ✅ Certificat SSL gratuit

---

## 🐛 Dépannage

### Le site ne s'affiche pas correctement
- Vérifiez que `index.html` est à la racine
- Vérifiez les chemins relatifs des assets
- Consultez les logs de déploiement

### Les images ne se chargent pas
- Vérifiez que le dossier `assets/` est bien présent
- Vérifiez les noms de fichiers (sensible à la casse)
- Exemple : `Coaching.jpg` ≠ `coaching.jpg`

### Le formulaire ne fonctionne pas
- Ajoutez `data-netlify="true"` au formulaire
- Ajoutez un champ caché `<input type="hidden" name="form-name" value="contact">`

---

## 📞 Support

- Documentation Netlify : https://docs.netlify.com
- Support Netlify : https://answers.netlify.com
- Status : https://netlifystatus.com

---

## 🎉 Checklist avant déploiement

- [ ] Toutes les images sont optimisées
- [ ] Les chemins des fichiers sont corrects
- [ ] Le formulaire est configuré pour Netlify Forms
- [ ] Les informations de contact sont à jour
- [ ] Les liens des réseaux sociaux sont corrects
- [ ] Le site est testé sur mobile
- [ ] Les meta tags SEO sont en place
- [ ] Le favicon est présent
- [ ] Le sitemap.xml est généré (optionnel)
- [ ] Le robots.txt est configuré (optionnel)

---

## 🚀 C'est tout !

Votre site sera accessible à l'URL : `https://karate-tournes.netlify.app`

**Temps estimé de déploiement : < 2 minutes**

Bonne chance avec votre dojo ! 🥋
