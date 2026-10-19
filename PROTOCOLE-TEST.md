# Protocole de test — prototype Training (le test décisif)

## Ce qu'on veut prouver
Écran verrouillé, iPhone dans la poche : les 9 annonces vocales de la séance
test (3 minutes) arrivent **toutes**, **à l'heure** (±2 s), **entières**.
Si oui : le mécanisme « notifications locales à son vocal, cédulées d'avance
auprès d'iOS » remplace le setInterval de la PWA, et on migre l'app complète
dessus. Si non : on passe au plan B (piste audio composée en natif) avant
d'investir plus loin.

## Avant le test (une fois)
1. Clé de déploiement ajoutée au dépôt `training` (Settings → Deploy keys).
2. Muse pousse la branche `proto-capacitor`, le CI fabrique le `.ipa`.
3. SideStore installé sur l'iPhone (installation unique avec l'ordinateur :
   appairage + VPN local ; Mode développeur activé dans
   Réglages → Confidentialité et sécurité).
4. Dans SideStore : ajouter la source du dépôt (fichier `apps.json` publié par
   le CI), installer « Training Proto », accepter la permission Notifications.

## Le test
1. Ouvre Training Proto, lis la grille des annonces affichée.
2. Prépare une montre (ou un deuxième appareil) affichant les secondes.
3. Tape **Lancer le test**, puis **dans la première seconde** : verrouille
   l'écran (bouton latéral) et mets l'iPhone **dans ta poche**.
4. Ne touche à rien pendant 3 minutes. Écoute.
5. Grille attendue (départ = 0:00) :
   - 0:01 Échauffement — marche *(cédulée à +1 s, le temps de verrouiller)*
   - 0:30 Course — cycle 1 de 3
   - 0:50 Marche — cycle 1 de 3
   - 1:10 Course — cycle 2 de 3
   - 1:30 Marche — cycle 2 de 3
   - 1:50 Course — cycle 3 de 3
   - 2:10 Marche — cycle 3 de 3
   - 2:30 Retour au calme
   - 3:00 Entraînement terminé — bravo
6. Après : déverrouille et regarde le centre de notifications — chaque
   annonce doit aussi y figurer comme notification « Training » (la preuve
   écrite, indépendante de ce que tu as entendu).

## Variantes à essayer ensuite (si le test de base passe)
- Même test avec des **écouteurs** (Bluetooth puis filaire si possible).
- Même test en **mode Ne pas déranger / Concentration** activé : dis-moi ce
  qui passe ou pas — ça décidera des réglages à recommander.
- Lancer une autre app audio (musique) avant de verrouiller : les annonces
  doivent se superposer ou mettre la musique en pause brièvement.

## Ce qu'il faut me rapporter
- Quelle annonce a manqué, été coupée ou en retard (numéro dans la grille),
  ou « 9/9 » si tout a passé.
- Écouteurs ou haut-parleur ; Concentration activée ou non.
- Le niveau de la voix par rapport à ce que tu veux pendant une course.
Critère de réussite : 9/9 à l'heure et entières, dans la poche.
