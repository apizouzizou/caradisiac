module.exports = function(app, db) {
  app.post('/populate', (req, res) => {

    const {
      getBrands
    } = require('node-car-api');
    const {
      getModels
    } = require('node-car-api');
    async function print() {
      const brands = await getBrands();
      console.log(brands);

      for (var brand in brands) {
        if (object.hasOwnProperty(brand)) {
          const models = await getModels('brand');
          console.log(models);

        }
      }
    }
    print();
  });
};
