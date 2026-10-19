# Mon entraînement — V.14 (dépôt `training`)

C'est ici que vit l'app désormais. La V14 reprend **à l'identique** le code,
le design, les icônes et les données de la V13.4 développée dans l'ancien
dépôt `joggin-app` (août 2026) — seul le nom du dépôt change, comme il
aurait toujours dû l'être :

- historique complet de joggin-app conservé dans ce dépôt, branche
  `archive/joggin-app-history` (75 commits) ;
- les 2 commits de la V4 d'origine de `training` restent dans l'historique
  de `main`, sous ce commit de transplantation ;
- nom de base de données et clés de stockage inchangés
  (`gregoire_training_app`) : les données suivent toutes seules.

Suite en préparation : prototype natif Capacitor (branche `proto-capacitor`)
pour des annonces vocales fiables écran verrouillé, installable via
SideStore sans App Store. Voir `PROTOCOLE-TEST.md` sur cette branche.
