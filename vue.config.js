module.exports = {
  "pluginOptions": {
    "electronBuilder": {
      "builderOptions": {
        "appId": "com.carloalejandrosalas.notes",
        "productName": "Electro Vue Notes",
        "linux": {
          "category": "Utility",
          "target": [
            "deb",
            "snap",
            "rpm"
          ],
          "maintainer": "carloalejandrosalas"
        }
      }
    }
  },
  "transpileDependencies": [
    "vuetify"
  ]
}