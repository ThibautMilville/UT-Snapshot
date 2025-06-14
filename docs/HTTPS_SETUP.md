# Configuration HTTPS pour le développement local

## Installation des certificats SSL

### 1. Générer les certificats
```bash
npm run create-cert
```

### 2. Faire confiance au certificat (optionnel mais recommandé)

#### Sur Linux :
```bash
sudo cp certs/localhost.crt /usr/local/share/ca-certificates/localhost.crt
sudo update-ca-certificates
```

#### Sur macOS :
```bash
sudo security add-trusted-cert -d -r trustRoot -k /Library/Keychains/System.keychain certs/localhost.crt
```

#### Sur Windows :
1. Double-cliquez sur `certs/localhost.crt`
2. Cliquez sur "Installer le certificat"
3. Sélectionnez "Ordinateur local"
4. Choisissez "Placer tous les certificats dans le magasin suivant"
5. Sélectionnez "Autorités de certification racines de confiance"

## Utilisation

### Démarrer en HTTPS
```bash
npm run dev:https
```

Votre application sera disponible sur : `https://localhost:3000`

### Démarrer en HTTP (normal)
```bash
npm run dev
```

## Résolution des problèmes

### Erreur "NET::ERR_CERT_AUTHORITY_INVALID"
- Assurez-vous d'avoir installé le certificat dans les autorités de confiance
- Ou cliquez sur "Avancé" puis "Continuer vers localhost (non sécurisé)"

### Le certificat expire
- Les certificats sont valides 365 jours
- Régénérez-les avec `npm run create-cert`

## Sécurité

⚠️ **Important** : Ces certificats sont uniquement pour le développement local. Ne jamais les utiliser en production ! 