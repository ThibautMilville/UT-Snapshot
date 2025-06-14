#!/bin/bash

# Créer le dossier certs s'il n'existe pas
mkdir -p certs

# Générer la clé privée
openssl genrsa -out certs/localhost.key 2048

# Générer le certificat auto-signé
openssl req -new -x509 -key certs/localhost.key -out certs/localhost.crt -days 365 -subj "/C=FR/ST=France/L=Paris/O=Dev/OU=Dev/CN=localhost"

# Créer un fichier de configuration pour les domaines alternatifs
cat > certs/localhost.conf << EOF
[req]
default_bits = 2048
prompt = no
default_md = sha256
distinguished_name = dn
req_extensions = v3_req

[dn]
C=FR
ST=France
L=Paris
O=Development
OU=Development
CN=localhost

[v3_req]
basicConstraints = CA:FALSE
keyUsage = nonRepudiation, digitalSignature, keyEncipherment
subjectAltName = @alt_names

[alt_names]
DNS.1 = localhost
DNS.2 = 127.0.0.1
IP.1 = 127.0.0.1
EOF

# Générer un nouveau certificat avec les domaines alternatifs
openssl req -new -x509 -key certs/localhost.key -out certs/localhost.crt -days 365 -config certs/localhost.conf -extensions v3_req

echo "Certificats SSL créés dans le dossier certs/"
echo "Pour faire confiance au certificat sur votre système :"
echo "- Linux: sudo cp certs/localhost.crt /usr/local/share/ca-certificates/ && sudo update-ca-certificates"
echo "- macOS: sudo security add-trusted-cert -d -r trustRoot -k /Library/Keychains/System.keychain certs/localhost.crt" 