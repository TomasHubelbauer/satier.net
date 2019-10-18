# [Satier.net](https://satier.net)

![](https://github.com/tomashubelbauer/satier.net/workflows/.github/workflows/main.yml/badge.svg)

## To-Do

- Upgrade TypeScript and use the Elvis operator where applicable
- Set up CD for the BE and configure NGinx to serve `/api` from it
- Configure the 404 page in the NGinx configuration
- Fix the `react-snap` warning about 404 page title missing `404`
- Import/connect food database values
  - https://world.openfoodfacts.org
  - https://www.foodrepo.org
  - https://fdc.nal.usda.gov
  - https://www.nutritionvalue.org
  - https://nutritiondata.self.com
  - https://www.nutritionix.com
  - https://www.efsa.europa.eu/en/microstrategy/food-composition-data
  - https://data.europa.eu/euodp/en/data/dataset/food-composition-database
  - http://www.foodstandards.gov.au/science/monitoringnutrients/afcd/Pages/default.aspx
  - http://www.foodstandards.gov.au/science/monitoringnutrients/ausnut/foodnutrient/Pages/default.aspx
  - https://www.who.int/nutrition/databases/en

## Design

- Allow free data entry in case of unknown values / missing foods for later revision
- Provide a global database and a user-custom database for overrides / custom foods
- Distinguish foods from the main index, my database and from other users' databases
- Support nutritional values tables of the various countries

## Schema

Here are a few examples of foods entries as they might end up looking in the database:

```jsonc
{
  "id": 1,
  "type": "package",
  "brand": "Albert",
  "name": "Fresh Bistro",
  "variant": "anglický s vejcem a slaninou",
  "energy": {
    "amount": 1141,
    "unit": "kj"
  },
  "label": { // https://en.wikipedia.org/wiki/List_of_macronutrients
    "type": "czech-republic", // per 100 g
    "proteins": 10,
    "carbs": {
      "total": 27,
      "sugars": 2
    },
    "lipids": {
      "total": 14,
      "saturated": 5
    },
    "salt": 1,
    "phe": 0.48
  }
}
```

```jsonc
{
  "id": 1,
  "type": "ingredient",
  "label": {} // …
}
```

```jsonc
{
  "id": 1,
  "type": "composition",
  "ingredients": [
    // …
  ]
}
```
