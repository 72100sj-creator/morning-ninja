# 🥷 Morning Ninja

**Quelques minutes de mobilité pour bien commencer la journée.**

Morning Ninja est une application web (PWA) de routine matinale : 9 exercices de mobilité guidés, avec minuteur, annonces vocales, suivi de progression et mode hors-ligne.

👉 **[Ouvrir l'application](https://72100sj-creator.github.io/morning-ninja/)**

Version actuelle : **v3.8**

---

## ✨ Fonctionnalités

**La séance**
- 9 exercices de mobilité enchaînés, avec photo, consigne et minuteur circulaire
- Annonces vocales à chaque exercice (synthèse vocale du navigateur)
- Gong sonore aux transitions et carillon zen de réussite en fin de séance
- Boutons Précédent / Suivant et pause à tout moment
- Durée réglable : 60, 90 ou 120 secondes par exercice (la Respiration reste toujours à 60 s)
- L'écran reste allumé pendant la séance
- Mise en pause automatique si l'application passe en arrière-plan (appel, changement d'app)

**Le suivi**
- Série en cours (streak) sur l'accueil et sur l'écran de fin
- Semaine en un coup d'œil : 7 pastilles L M M J V S D
- Historique des derniers jours effectués
- Calendrier mensuel et statistiques : série actuelle, meilleure série, jours réalisés, temps de mobilité, séances par semaine, meilleur mois

**Le confort**
- Installable sur iPhone et Android comme une vraie application
- Fonctionne entièrement **hors-ligne**
- Affichage verrouillé en mode portrait
- Sauvegarde et restauration des données par fichier

---

## 📱 Installation sur téléphone

**iPhone (Safari)** : ouvrir le lien → bouton Partager → *Sur l'écran d'accueil*.

**Android (Chrome)** : ouvrir le lien → menu ⋮ → *Installer l'application*.

> ⚠️ Sur iPhone, ne pas supprimer puis réinstaller l'icône : l'application réinstallée repartirait d'un historique vide. Faire un export de ses données avant toute manipulation de ce type.

---

## 🔐 Données personnelles

Toutes les données restent **sur l'appareil** (stockage local du navigateur). Aucun compte, aucun serveur, aucun envoi vers l'extérieur.

Sont enregistrés :
- les dates des séances effectuées ;
- l'activation des annonces vocales et le volume ;
- la durée d'exercice choisie.

**Sauvegarde** : Paramètres → *Exporter mes données* télécharge un fichier `.json`. *Importer une sauvegarde* le réinjecte en **fusionnant** avec l'historique existant, sans jamais rien écraser ni supprimer.

---

## 📂 Structure du projet

| Fichier | Rôle |
|---|---|
| `index.html` | Toute l'application (HTML, CSS et JavaScript dans un seul fichier) |
| `sw.js` | Service worker : gère le mode hors-ligne |
| `manifest.json` | Carte d'identité de la PWA (nom, couleurs, orientation portrait) |
| `apple-touch-icon.png` | Icône iOS (180×180) |
| `icon-512.png` | Icône PWA standard (512×512) |
| `sound-ding.mp3` | Gong des transitions |
| `sound-success.mp3` | Carillon de fin de séance |
| `exercise-1.jpg` … `exercise-9.jpg` | Photos des 9 exercices |

Aucune dépendance, aucun outil de build : le projet est déployé tel quel via **GitHub Pages**.

---

## 🔄 Mettre à jour l'application

1. Déposer les fichiers modifiés à la racine du dépôt (glisser-déposer sur GitHub).
2. Attendre 1 à 2 minutes que GitHub Pages publie.
3. Fermer complètement l'application sur le téléphone, puis la rouvrir.
4. Vérifier le numéro de version affiché sur l'écran d'accueil.

**Deux règles à respecter :**

- Le numéro de version en bas de l'accueil (`index.html`, classe `home-version`) doit être incrémenté à chaque livraison : c'est le témoin fiable qu'une mise à jour est bien arrivée.
- Si un **son, une image ou une icône** est modifié, il faut aussi changer la valeur de `CACHE_NAME` dans `sw.js` (ex. `morning-ninja-v3.8` → `morning-ninja-v3.9`). Sans cela, les appareils continueraient d'afficher les anciens fichiers gardés en réserve hors-ligne. Le fichier `index.html` est, lui, toujours rechargé depuis le réseau : il n'est jamais servi en version périmée.

---

## 🧭 Principes de développement

- Une modification à la fois, validée avant la suivante.
- Le comportement existant est préservé : pas de régression.
- **Aucune perte de données utilisateur** : jamais de vidage du stockage, jamais de clé renommée sans migration compatible avec les anciennes versions.
- Compatibilité maintenue avec les PWA installées sur iOS et Android, ainsi qu'avec l'audio, les annonces vocales et le Bluetooth.

---

## 📜 Historique des versions

| Version | Évolution |
|---|---|
| v3.8 | Nouvelles photos pour les exercices 2, 8 et 9 |
| v3.7 | Cartes de statistiques compactées (toutes visibles d'un coup) |
| v3.6 | Statistiques enrichies : temps de mobilité, séances par semaine, meilleur mois |
| v3.5 | Semaine en pastilles sur l'accueil |
| v3.4 | Mise en pause propre quand l'application passe en arrière-plan |
| v3.3 | Mode hors-ligne (service worker) |
| v3.2 | La Respiration reste toujours à 60 s |
| v3.0 – v3.1 | Durée des exercices réglable : 60 / 90 / 120 s |
| v2.9 | Bouton Précédent pendant la routine |
| v2.8 | Historique enrichi : liste des derniers jours |
| v2.7 | Icône allégée (799 Ko → 47 Ko) |
| v2.6 | Export et import des données |
| v2.5 | Série affichée sur l'écran de fin |
| v2.4 | Textes et annonces vocales correctement accentués |
| v2.2 – v2.3 | Images d'exercices hébergées dans le dépôt, puis agrandies |
| v2.0 – v2.1 | Refonte audio : sons en fichiers MP3 (fiabilité iOS) |
| v1.4 | Correction de la voix absente au premier exercice (iOS) |
| v1.3 | Manifest PWA et verrouillage portrait sur Android |
| v1.2 | Écran « Mode portrait uniquement » |
| v1.1 | Carillon zen de fin de séance |
| v1.0 | Version initiale |

---

## 💡 Pistes d'évolution

- Jalons et badges de progression (7, 30, 50, 100 séances)
- Mode sombre automatique
- Activation / désactivation de certains exercices
- Choix de la voix parmi celles installées sur l'appareil

*Rappel : les notifications de rappel quotidien ne sont pas réalisables pour une PWA sur iPhone sans serveur d'envoi. Une alarme dans l'application Horloge rend le même service.*

---

Projet personnel de la famille **Ninja** 🥷
