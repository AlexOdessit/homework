// mongodb+srv://alexgofresh:<password>@cluster0.wplmqlg.mongodb.net/

//Create - создать коллеккцию

//вставить одну запись
db.users.insertOne({
  firstName: 'First',
  LastName: 'User',
  email: 'user@user.com',
  isMale: true,
  height: 1.91,
  birtday: Date(1986, 3, 29),
  adress: {
    city: 'Odessa',
    country: 'Ukraine',
    phone: +380970479968
  }
})

db.users.insertOne({
  fullName: 'Test User',
  gender: 'male',
  height: 2.0,
  weight: 85,
  adress: {
    city: 'Kiev',
    country: 'Ukraine',
    phone: +34000000
  }
})

//вставка многих записей

db.users.insertMany([
  {
    fullName: 'John Doe',
    weight: 98,
    height: 190,
    deliveryAdresses: [
      {
        city: 'Odessa',
        country: 'Ukraine',
        district: 'Kievskiy',
        street: 'Tairova'
      },
      {
        city: 'Odessa',
        country: 'Ukraine',
        district: 'Kievskiy',
        street: 'Fontan'
      },

      {
        email: 'user3@gmail.com'
      }
    ]
  }
])

db.inventory.insertMany([
  { item: 'journal', qty: 25, size: { h: 14, w: 21, uom: 'cm' }, status: 'A' },
  {
    item: 'notebook',
    qty: 50,
    size: { h: 8.5, w: 11, uom: 'in' },
    status: 'A'
  },
  { item: 'paper', qty: 100, size: { h: 8.5, w: 11, uom: 'in' }, status: 'D' },
  {
    item: 'planner',
    qty: 75,
    size: { h: 22.85, w: 30, uom: 'cm' },
    status: 'D'
  },
  {
    item: 'postcard',
    qty: 45,
    size: { h: 10, w: 15.25, uom: 'cm' },
    status: 'A'
  }
])

// Read - получениe дан Inventory
//SELECT * FROM inventory
//db.collection.find(query,projection,options);
/* query -обьект фильтрации данных 
   projection - обьект списка выборки
   options - другие настройки 
*/

//SELECT * FROM inventory WHERE status  "D"
db.inventory.find({
  status: 'D'
})
//SELECT * FROM inventory WHERE qty < 60

db.inventory.find({
  qty: { $lt: 50 }
})

//SELECT * FROM inventory WHERE qty >= 50  AND status  "D"
db.inventory.find({
  qty: { $gte: 50 },
  status: 'D'
})

//v2
db.inventory.find({
  $and: [{ status: 'D' }, { qty: { $gte: 50 } }]
})

//SELECT * FROM inventory WHERE qty >= 50  OR status  "D"
db.inventory.find({
  $or: [{ qty: { $gte: 50 } }, { status: 'D' }]
})

//SELECT * FROM inventory WHERE qty >= 50  OR status  "D" AND item  = "journal"
db.inventory.find({
  $or: [{ qty: { $gte: 50 } }, { status: 'D', item: 'journal' }]
})

//обращение к свойствам обьекта
//SELECT * FROM size.uom = 'cm';
db.users.find()

db.inventory.find({
  'size.uom': 'cm'
})

//отфильтровать все записи где существует определенное  поле
//все пользователи с полем email
db.users.find({
  email: { $exists: true }
})

db.users.find()
db.inventory.find()

//Update -   обновить данные
//updateOne - первая запись по критерию
db.inventory.updateOne(
  { status: 'A' },
  { $set: { status: 'Accepted', 'size.uom': 'cm' } }
)

//Update  inventory set status  = "Accepted" WHERE status = 'A' or size.uom = "cm"
//update many
db.inventory.updateMany(
  { status: 'A' },
  { $set: { status: 'Accepted', 'size.uom': 'cm' } }
)

//DELETE
// удалить запись
//DELETE FROM users;
db.users.deleteOne({
  _id: new ObjectId('66169aacdcc4fe4d97cc0750')
})
//delete all without email
db.users.deleteMany({ email: { $exists: false } })

//delete all collection
db.inventory.drop()

//Insert cats collection
db.cats.insertOne({
  name: 'Valdemar',
  details: {
    age: 0.7,
    gender: 'male',
    weight: 0.89,
    breed: 'Scotish fold'
  }
})

db.cats.insertMany([
  {
    name: 'Garfield',
    details: {
      age: 5,
      gender: 'male',
      weight: 2,
      breed: 'Scotich fold'
    }
  },
  {
    name: 'Nastya',
    details: {
      age: 7,
      gender: 'female',
      weight: 3.5,
      breed: 'Somali'
    }
  },
  {
    name: 'Max',
    details: {
      age: 2,
      gender: 'male',
      weight: 1,
      breed: 'Ceylon'
    }
  }
])

db.cats.updateMany(
  {
    'details.breed': 'Scotich fold'
  },
  { $set: { breed: 'Scotish' } }
)

db.cats.find()

//
// db.cats.updateOne({ name: 'Garfield' }, { $unset: { breed: 'Scotish' } }); -удаляем опредеденное поле по условию

// db.cats.updateOne(
//   { 'details.breed': 'Scotish fold' },
//   { $set: { 'details.breed': 'Scotish' } }
// );

db.cats.updateOne(
  { name: 'Valdemar' },
  {
    $set: {
      'details.age': 3
    }
  }
)
