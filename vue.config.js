module.exports = {
    pluginOptions: {
      electronBuilder: {
        builderOptions: {
            // options placed here will be merged with default configuration and passed to electron-builder
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
    }
  }