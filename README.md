# Training — prototype Capacitor (branche `proto-capacitor`)

But unique de ce prototype : **prouver sur l'iPhone de Grégoire** que des
annonces vocales cédulées d'avance auprès d'iOS (notifications locales dont
le son est la phrase pré-rendue depuis le lexique MP3 de l'app) jouent à
l'heure, écran verrouillé — ce que la PWA ne peut pas garantir.

- Séance test fixe de 3 minutes ; grille et protocole : `PROTOCOLE-TEST.md`.
- Annonces régénérables : `scripts/rendre-annonces.sh <lexique> www/sounds`.
- Build : GitHub Actions (`.github/workflows/build-ipa.yml`) compile sur un
  Mac GitHub, produit `Training-Proto-unsigned.ipa`, le publie en Release
  `proto` et tient la source SideStore (`apps.json`) à jour.
- Installation : SideStore sur l'iPhone (signature gratuite 7 jours,
  rafraîchie sur l'appareil). Aucun Xcode sur le Mac de Grégoire.
- Ce prototype ne remplace pas encore la PWA : si le test passe, l'app
  complète migre dans ce même pipeline, sous le nom `training`.
