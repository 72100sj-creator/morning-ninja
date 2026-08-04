# 🥷 Morning Ninja

**Quelques minutes de mobilité pour bien commencer la journée.**

Morning Ninja est une application web (PWA) de routine matinale : une routine d'exercices de mobilité guidés, composée à la carte dans une banque de 26 exercices, avec minuteur, annonces vocales, suivi de progression et mode hors-ligne.

👉 **[Ouvrir l'application](https://72100sj-creator.github.io/morning-ninja/)** &nbsp;·&nbsp; 📖 **[Le guide des exercices](https://72100sj-creator.github.io/morning-ninja/guide.html)**

Version actuelle : **v5.3**

---

## ✨ Fonctionnalités

**La séance**
- Enchaînement d'exercices de mobilité, avec photo, consigne et minuteur circulaire
- Annonces vocales à chaque exercice (synthèse vocale du navigateur), avec « Change de côté » ou « Change de sens » à mi-parcours sur les exercices concernés
- Rappels pour la montre connectée : démarrer l'activité au lancement, l'enregistrer à la fin
- Gong sonore aux transitions et carillon zen de réussite en fin de séance
- Boutons Précédent / Suivant et pause à tout moment
- Durée réglable : 60, 90 ou 120 secondes par exercice (la Respiration reste toujours à 60 s)
- L'écran reste allumé pendant la séance
- Mise en pause automatique si l'application passe en arrière-plan (appel, changement d'app)

**Ma routine** *(onglet dédié)*
- Banque de **26 exercices** : allongé sur le dos, à quatre pattes, assis, debout
- Activer, désactiver et réordonner librement les exercices ; durée estimée affichée en direct
- Enregistrer plusieurs routines nommées (« Réveil court », « Dimanche long »…) et les charger d'un appui
- Une routine porte une ★ : c'est la routine de référence, elle ne peut pas être supprimée
- La routine par défaut reprend les 9 exercices d'origine ; les autres restent disponibles, désactivés

**Le guide des exercices**
- Une page illustrée détaillant les 26 exercices : à quoi sert chaque mouvement, son déroulé en trois étapes, le conseil qui change tout et l'erreur à éviter
- Accessible depuis les Paramètres, consultable hors connexion

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

### 🎧 Améliorer la voix (iPhone)

*Réglages → Accessibilité → Contenu énoncé → Voix → Français* : télécharger une voix marquée **Améliorée** ou **Premium**. L'application l'utilise automatiquement, la différence de qualité est très nette.

---

## 🔐 Données personnelles

Toutes les données restent **sur l'appareil** (stockage local du navigateur). Aucun compte, aucun serveur, aucun envoi vers l'extérieur.

Sont enregistrés :
- les dates des séances effectuées ;
- l'activation des annonces vocales et le volume ;
- la durée d'exercice choisie ;
- la composition de la routine et les routines enregistrées.

**Sauvegarde** : Paramètres → *Exporter mes données* télécharge un fichier `.json`. *Importer une sauvegarde* le réinjecte en **fusionnant** avec l'historique existant, sans jamais rien écraser ni supprimer.

---

## 📂 Structure du projet

| Fichier | Rôle |
|---|---|
| `index.html` | Toute l'application (HTML, CSS et JavaScript dans un seul fichier) |
| `guide.html` | Le guide des exercices (page indépendante) |
| `sw.js` | Service worker : gère le mode hors-ligne |
| `manifest.json` | Carte d'identité de la PWA (nom, couleurs, orientation portrait) |
| `icon-ios-v2.png` | Icône iOS (180×180) |
| `icon-512.png` | Icône PWA standard (512×512) |
| `sound-ding.mp3` | Gong des transitions |
| `sound-success.mp3` | Carillon de fin de séance |
| `exercise-1.jpg` … `exercise-26.jpg` | Photos des 26 exercices de la banque |

Aucune dépendance, aucun outil de build : le projet est déployé tel quel via **GitHub Pages**.

---

## 🔄 Mettre à jour l'application

1. Déposer les fichiers modifiés à la racine du dépôt (glisser-déposer sur GitHub).
2. Attendre 1 à 2 minutes que GitHub Pages publie.
3. Fermer complètement l'application sur le téléphone, puis la rouvrir.
4. Vérifier le numéro de version affiché sur l'écran d'accueil.

**Quatre règles à respecter :**

- Le numéro de version en bas de l'accueil (`index.html`, classe `home-version`) doit être incrémenté à chaque livraison : c'est le témoin fiable qu'une mise à jour est bien arrivée.
- Si un **son, une image ou une icône** est modifié, il faut aussi changer la valeur de `CACHE_NAME` dans `sw.js` (ex. `morning-ninja-v3.8` → `morning-ninja-v3.9`). Sans cela, les appareils continueraient d'afficher les anciens fichiers gardés en réserve hors-ligne. Le fichier `index.html` est, lui, toujours rechargé depuis le réseau : il n'est jamais servi en version périmée.
- Pour ajouter ou modifier un exercice : déposer sa photo (`exercise-N.jpg`, carrée, 800×800) puis mettre à jour son entrée dans le tableau `CATALOG` d'`index.html` — identifiant unique, nom affiché, nom prononcé, texte vocal, consigne, et `midCue` pour l'annonce de mi-parcours (« Change de côté. » ou « Change de sens. ») si l'exercice l'exige. Un exercice ajouté apparaît désactivé dans les routines existantes : aucune routine n'est modifiée à l'insu de l'utilisateur. **Ne jamais changer l'identifiant d'un exercice existant** : il est référencé dans les routines enregistrées des utilisateurs. Penser aussi à mettre à jour sa fiche dans `guide.html`.
- Si l'**icône** change, il faut lui donner un **nouveau nom de fichier** (ex. `icon-ios-v2.png` → `icon-ios-v3.png`) et mettre à jour `index.html`, `manifest.json` et `sw.js`. iOS mémorise l'icône par son nom : à nom identique, l'ancienne image resterait affichée indéfiniment.

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
| v5.3 | « Mobilité thoracique » devient « Livre ouvert » : photo et consignes plus parlantes |
| v5.2 | Guide accessible depuis les Paramètres et disponible hors connexion ; annonces de mi-parcours complétées |
| v5.1 | La routine de référence ne peut plus être supprimée |
| v5.0 | Les 26 exercices de la banque disponibles ; onglet « Ma routine » dédié |
| v4.9 | Correction du défilement des pages longues et de l'enregistrement des routines |
| v4.8 | Routines nommées : enregistrer, charger, définir une référence |
| v4.7 | Composer sa routine : activer, désactiver et réordonner les exercices |
| v4.6 | Photos corrigées pour les exercices 2, 8 et 9 |
| v4.5 | Noms prononcés distincts des noms affichés ; correction du dernier mot tronqué sur iOS |
| v4.4 | Prononciation améliorée : ponctuation, débit plus posé, tutoiement cohérent |
| v4.3 | Exercice 5 corrigé (fente basse) et annonce « Change de côté » à mi-parcours |
| v4.1 | Icône renommée pour contourner la mémoire d'iOS |
| v4.0 | La durée d'exercice entre dans la sauvegarde |
| v3.9 | Rappels pour la montre connectée |
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

- Choix de la voix parmi celles installées sur l'appareil

**Écartés volontairement :**
- *Badges et jalons de progression* : l'application se veut zen et sans pression.
- *Mode sombre* : c'est une application du réveil, la palette claire est assumée.
- *Notifications de rappel quotidien* : irréalisables pour une PWA sur iPhone sans serveur d'envoi. Une alarme dans l'application Horloge rend le même service.
- *Import d'un entraînement Garmin* : Garmin Connect permet d'importer un fichier `.FIT`, pas d'exporter une séance créée ; et le format ne transporterait ni les photos, ni les consignes, ni les textes de la voix. Le fichier de sauvegarde de l'application couvre déjà ce besoin.

---

Projet personnel de la famille **Ninja** 🥷
