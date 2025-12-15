# Security Policy

## Reporting Vulnerabilities

Si vous découvrez une faille de sécurité dans ElectroMed, merci de nous contacter directement :

- Email : **security@electromed.com**

Nous répondrons dans les meilleurs délais et vous tiendrons informé des correctifs mis en place.

## Supported Versions

- **v1.0.0 (current)** – entièrement supportée

## Security Measures

ElectroMed met en œuvre les mesures de sécurité suivantes :

- **HTTPS** obligatoire sur toutes les surfaces publiques
- **Supabase RLS** (Row Level Security) activé sur les tables sensibles
- **Validation des entrées** avec Zod côté frontend
- **Rate limiting** sur les actions sensibles (login, signup)
- **Protection CSRF** via les mécanismes intégrés de Supabase Auth
- **Protection XSS** via Content Security Policy et échappement systématique des données
- **Hashage des mots de passe** géré par Supabase Auth (bcrypt)

## Authentication

- Mot de passe d’au moins **8 caractères**
- Obligation d’avoir au moins **1 majuscule** et **1 chiffre**
- **Vérification d’email** requise pour l’activation finale du compte
- **Durée de session** : 7 jours par défaut (renouvelée via refresh token sécurisé)
- **Rate limiting** : maximum 5 tentatives de connexion par tranche de 15 minutes

## Données & Journalisation

- Journalisation des événements critiques (login, logout, erreurs majeures)
- Logs applicatifs prévus pour être envoyés vers un service externe (Sentry, LogRocket, etc.)
- Aucune donnée sensible (mot de passe, token brut) n’est stockée en clair dans les logs


