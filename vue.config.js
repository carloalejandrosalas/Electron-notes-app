module.exports = {
  "pluginOptions": {
    "electronBuilder": {
      "builderOptions": {
        "appId": "com.carloalejandrosalas.notes",
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