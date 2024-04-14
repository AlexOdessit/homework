//Create db colllection with validation schema
db.createCollection('cars', {
  validator: {
    //структура документа в коллекции
    $jsonSchema: {
      //тип данных записей
      //prettier-ignore
      bsonType: "object",
      //массив назв полей ,которые есть обязательными для обьекта
      required: ['model', 'price', 'manufacturer'],
      //cвойства нашего документа котрые мы хотим валидовать
      properties: {
        //валидациоанная схема для свойства с конкретн. назв.
        model: {
          bsonType: 'string'
        },
        producedYear: {
          bsonType: 'int'
        },
        isUsed: {
          bsonType: 'bool'
        },

        price: {
          bsonType: 'number'
        },

        manufacturer: {
          bsonType: 'object',
          required: ['name'],
          properties: {
            name: {
              bsonType: 'string'
            }
          }
        },
        wheels: {
          bsonType: 'array',
          items: {
            bsonType: 'object',
            properties: {
              size: {
                bsonType: 'string'
              },
              manufacturer: {
                bsonType: 'string'
              }
            }
          }
        }
      }
    }
  }
  // validationLevel: 'strict'
})

//нормальная вставка
db.cars.insertOne({
  model: 'Corolla',
  producedYear: 2016,
  price: 35000,
  manufacturer: { name: 'Toyota', email: 'toyotamy@gmail.com' },
  wheels: [
    {
      size: 'medium'
    },
    {
      size: 'medium'
    },
    {
      size: 'medium'
    },
    {
      size: 'medium'
    }
  ]
})

//ненормальная вставка
db.cars.insertOne({
  model: 'Camry',
  producedYear: 2012,
  price: 70000
})
