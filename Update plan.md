## Rapport de nouvelle architecture pour ADRO BIO FARM

### Objectif
Construire une architecture de site claire, modulaire et orientée catalogue pour ADRO BIO FARM, en structurant les offres autour de 7 domaines métiers. Le rapport inclut désormais des produits pertinents pour `Événementiel` et `Écologie`.

---

## 1. Vision générale

Le site passe d’une vitrine statique à une plateforme catalogue :

- données centralisées dans `data/`
- pages `products` et `services` dynamiques
- fiches détaillées par `slug`
- composants réutilisables
- positionnement métier clair

L’architecture permet d’ajouter facilement :
- pépinière
- formation
- hébergement
- événements
- offres écologiques

---

## 2. Structure de dossiers recommandée

```
app/
  layout.tsx
  page.tsx
  products/
    page.tsx
    [slug]/
      page.tsx
  services/
    page.tsx
    [slug]/
      page.tsx
  contact/
    page.tsx
  about/
    page.tsx
app/components/
  Navbar.tsx
  Footer.tsx
  HeroSection.tsx
  SectionHeader.tsx
  CardGrid.tsx
  ProductCard.tsx
  ServiceCard.tsx
  PoleTabs.tsx
  RelatedItems.tsx
data/
  poles.ts
  products.ts
  services.ts
lib/
  catalog.ts
  helpers.ts
styles/
  globals.css
```

---

## 3. Domaines métiers proposés

- `Ferme`
- `Végétal`
- `Pépinière`
- `Formation`
- `Hébergement`
- `Événementiel`
- `Écologie`

Chaque domaine possède :
- un label métier
- une description
- une liste de produits
- une liste de services

---

## 4. Modèle de données

### `data/poles.ts`
- `slug`
- `label`
- `shortDescription`
- `icon?`

### `data/products.ts`
- `slug`
- `title`
- `pole`
- `category`
- `shortDescription`
- `description`
- `features`
- `image?`

### `data/services.ts`
- `slug`
- `title`
- `pole`
- `category`
- `description`
- `methodology`
- `deliverables`
- `duration?`
- `audience?`
- `image?`

---

## 5. Pages et flux

### Page d’accueil
- Hero coopérative
- Présentation des 7 domaines
- Sélection de produits phares
- Sélection de services phares
- CTA vers `/products` et `/services`

### Catalogue produits
- Filtres par domaine
- Grille de produits
- Sections descriptives par domaine
- CTA commande / contact

### Catalogue services
- Filtres par domaine
- Grille de services
- Sections descriptives par domaine
- CTA devis / contact

### Pages détail
- `app/products/[slug]/page.tsx`
- `app/services/[slug]/page.tsx`
- Contenu : badge domaine, description, caractéristiques, items associés

---

## 6. Contenu recommandé par domaine

### 1. Ferme
- Produits
  - Œufs bio de plein air
  - Poulets fermiers
  - Cailles & œufs de cailles
  - Lapins fermiers
  - Moutons de pâturage
  - Panier fermier saisonnier
- Services
  - Commande directe à la ferme
  - Livraison locale de panier
  - Abonnement paniers hebdomadaires
  - Vente sur marché artisanal

### 2. Végétal
- Produits
  - Légumes de saison
  - Fruits rouges et petits fruits
  - Herbes aromatiques
  - Salades ultra-fraîches
  - Produits transformés (conserves, pesto)
- Services
  - Panier légumes sur mesure
  - Récoltes sur commande
  - Conseil culture maraîchère

### 3. Pépinière
- Produits
  - Plants de légumes bio
  - Aromatiques & médicinales
  - Plantes vivaces & couvre-sol
  - Plants d’arbres fruitiers
  - Coffret semis débutant
- Services
  - Vente de plants en boutique fermière
  - Pack pépinière sur commande
  - Kit de démarrage horticole
  - Conseil repiquage et installation

### 4. Formation
- Produits
  - Pack pédagogique “Découverte de la ferme”
- Services
  - Atelier permaculture
  - Atelier hydroponie / aquaponie
  - Stage éco-ferme pour scolaires
  - Journée team-building durable
  - Formation agroécologie
  - Coaching projet ferme pédagogique

### 5. Hébergement
- Produits
  - Séjour immersion nature
- Services
  - Hébergement à la ferme
  - Week-end découverte durable
  - Accueil groupes / familles
  - Résidence artistique & musicale

### 6. Événementiel
- Produits
  - Kit d’accueil éco-responsable
  - Panier terroir événementiel
  - Stations de pause bien-être
  - Photobooth champêtre
  - Coffret animation pédagogique
- Services
  - Accueil de séminaires nature
  - Journée team-building ferme
  - Résidence d’artiste
  - Événement éco-citoyen
  - Location d’espace pour tournage / photo

### 7. Écologie
- Produits
  - Kit de compostage domestique
  - Kit de plantation zéro déchet
  - Pack support de formation écolo
  - Kit d’herbes aromatiques durables
  - Coffret “Maison verte”
- Services
  - Diagnostic ferme durable
  - Atelier compostage et recyclage
  - Mise en place de zones humides
  - Conseil agroforesterie
  - Intervention sur circuit vert / zéro déchet

---

## 7. Tableau résumé

| Domaine | Nombre de produits | Produits | Nombre de services | Services |
|---|---|---|---|---|
| Ferme | 6 | Œufs bio de plein air; Poulets fermiers; Cailles & œufs de cailles; Lapins fermiers; Moutons de pâturage; Panier fermier saisonnier | 4 | Commande directe à la ferme; Livraison locale de panier; Abonnement paniers hebdomadaires; Vente sur marché artisanal |
| Végétal | 5 | Légumes de saison; Fruits rouges et petits fruits; Herbes aromatiques; Salades ultra-fraîches; Produits transformés (conserves, pesto) | 3 | Panier légumes sur mesure; Récoltes sur commande; Conseil culture maraîchère |
| Pépinière | 5 | Plants de légumes bio; Aromatiques & médicinales; Plantes vivaces & couvre-sol; Plants d’arbres fruitiers; Coffret semis débutant | 4 | Vente de plants en boutique fermière; Pack pépinière sur commande; Kit de démarrage horticole; Conseil repiquage et installation |
| Formation | 1 | Pack pédagogique “Découverte de la ferme” | 6 | Atelier permaculture; Atelier hydroponie / aquaponie; Stage éco-ferme pour scolaires; Journée team-building durable; Formation agroécologie; Coaching projet ferme pédagogique |
| Hébergement | 1 | Séjour immersion nature | 4 | Hébergement à la ferme; Week-end découverte durable; Accueil groupes / familles; Résidence artistique & musicale |
| Événementiel | 5 | Kit d’accueil éco-responsable; Panier terroir événementiel; Stations de pause bien-être; Photobooth champêtre; Coffret animation pédagogique | 5 | Accueil de séminaires nature; Journée team-building ferme; Résidence d’artiste; Événement éco-citoyen; Location d’espace pour tournage / photo |
| Écologie | 5 | Kit de compostage domestique; Kit de plantation zéro déchet; Pack support de formation écolo; Kit d’herbes aromatiques durables; Coffret “Maison verte” | 5 | Diagnostic ferme durable; Atelier compostage et recyclage; Mise en place de zones humides; Conseil agroforesterie; Intervention sur circuit vert / zéro déchet |

---

## 8. Totaux recommandés

- Total produits : 28
- Total services : 31

---

## 9. Priorités de mise en œuvre

1. Créer les données métiers : `data/poles.ts`, `data/products.ts`, `data/services.ts`
2. Mettre à jour page.tsx et page.tsx pour les parcourir
3. Ajouter pages détail dynamiques `app/products/[slug]/page.tsx` et `app/services/[slug]/page.tsx`
4. Construire les composants réutilisables
5. Mettre en avant les domaines `Événementiel` et `Écologie` avec leurs produits dédiés

---

## 10. Conclusion

Ce rapport est le plan opérationnel pour transformer le site ADRO BIO FARM en une architecture catalogue complète. Il inclut désormais des produits pertinents pour les domaines `Événementiel` et `Écologie`, ce qui permet de vendre des offres tangibles dans ces contextes tout en renforçant l’identité durable de la coopérative.