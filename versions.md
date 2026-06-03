# Notes de version — Fiches PFMP

Historique des mises à jour de l'application.

---

## v0.20.4 — 26 mai 2026

- Bump de validation de la persistance de la bannière « Mise à jour effectuée » en condition réelle (push staging uniquement).

---

## v0.20.3 — 26 mai 2026

- Infrastructure de staging : bandeau orange permanent « Version test » sur l'URL `samfon973.github.io/fiches-pfmp-test/` et nom de PWA distinct (« Fiches PFMP — VERSION TEST ») pour éviter les confusions.
- Aucun changement visible sur la version de production.

---

## v0.20.2 — 26 mai 2026

- **Correctif** : la bannière « Mise à jour effectuée » est désormais vraiment persistante pour les utilisateurs déjà existants. Mécanisme de compatibilité automatique lors de la migration depuis une ancienne version.
- Mode test : ajouter `?test-banner=1` à l'URL pour forcer l'affichage de la bannière (utile pour valider visuellement sans attendre une vraie mise à jour).

---

## v0.20.1 — 26 mai 2026

- Tentative de correctif sur la persistance de la bannière (incomplète, voir v0.20.2).

---

## v0.20.0 — 26 mai 2026

- Bannière de mise à jour **persistante** : reste visible jusqu'au clic sur la croix.
- Nouvelle fenêtre **« Notes de version »** accessible depuis le pied de page de l'accueil.
- Pied de page épuré : plus de description longue, juste la version et la date du build.
- Si une nouvelle mise à jour arrive alors qu'une précédente bannière est encore affichée, elle se transforme automatiquement en « Nouvelle mise à jour disponible ».

---

## v0.19.0 — 26 mai 2026

- Bannière « Mise à jour effectuée » qui s'affiche en haut après chaque mise à jour réussie.
- Bannière discrète « Application à jour » après une vérification manuelle.
- Animation douce d'apparition (glissement vers le bas).

---

## v0.18.2 — 26 mai 2026

- Mot de passe du mode professeur **personnalisable** depuis le menu.
- Bouton « 🔑 Changer le mot de passe du mode prof » visible uniquement en mode prof actif.
- Stockage local du mot de passe (par appareil). Mot de passe par défaut : `othily2026`.

---

## v0.18.1 — 26 mai 2026

- **Protection par mot de passe** du mode professeur : les élèves voient le bouton mais ne peuvent pas l'activer sans le code.
- Les élèves voient automatiquement les commentaires du professeur sans rien activer.

---

## v0.18.0 — 26 mai 2026

**Mode professeur avec annotations**

- Toggle « Mode professeur » dans le menu de l'accueil.
- Bandeau « Retour du professeur » en haut de chaque fiche avec :
  - Sélecteur de statut (En cours / À corriger / À compléter / Validée),
  - Commentaire général,
  - Date du dernier retour,
  - Bouton « Renvoyer annoté à l'élève ».
- Zones de commentaire ciblées sur les pages Description, Compétences, Matériel, Difficultés et Auto-évaluation.
- Côté élève : statut coloré + commentaires en lecture seule + bannière « Nouveau retour du professeur ».
- Nouveau format d'export d'annotations qui fusionne sans doublon et sans écraser le travail de l'élève.

---

## v0.17.0 — 26 mai 2026

**Identification enrichie et accueil restructuré**

- Champs **Prénom** et **Nom de famille** séparés (au lieu d'un seul champ).
- Nouveau champ **Numéro de PFMP** (PFMP 01 à 06 ou Autre).
- Accueil : barre de recherche + sélecteur de groupement (Par élève / Par PFMP / Par classe).
- Cartes de fiche enrichies : nom de l'élève visible, badge PFMP, classe.
- Tri par date de stage puis par date de mise à jour.

---

## v0.16.0 — 18 mai 2026

- Nouveau bouton **« 📤 Envoyer au professeur »** sur l'accueil.
- Partage natif WhatsApp / Mail / Drive / Pronote.

---

## v0.15.1 — 27 avril 2026

- Fiche vierge imprimable : zones ouvertes pour la description et les compétences.
- Signature ancrée en bas de page pour rester avec la dernière section.
- Matériel et logiciels : mise en page compactée.

---

## v0.14.0 — 26 avril 2026

- Conseils chargés depuis le fichier `tips.md` (modifiable indépendamment de l'app).
- Rappels aléatoires d'un conseil ancien tous les 5 jours maximum.

---

*Pour proposer une amélioration ou signaler un problème, contactez votre professeur.*
