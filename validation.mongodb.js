//Create db colllection with validation schema

db.createCollection('cars', {
  validator: {
    //структура документа в коллекции
    $jsonSchema: {
      //тип данных записей
      bsonType: 'object',
      //массив назв полей ,которые есть обязательными для обьекта
      required: ['model', 'price'],
      //cвойства нашего документа котрые мы хотим валидовать
      properties: {
        //валидациоанная схема для свойства с конкретн. назв.
        model: {
          bsonType: 'string',
        },
        producedYear: {
          bsonType: 'int',
        },
        isUsed: {
          bsonType: 'bool',
        },

        price: {
          bsonType: 'number',
        },

        manufacturer: {
          bsonType: 'object',
          required: ['name'],
          properties: {
            name: {
              bsonType: 'string',
            },
          },
        },
      },
    },
  },
});
