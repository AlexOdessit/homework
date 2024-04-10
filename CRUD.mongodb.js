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
    phone: +380970479968,
  },
});

db.users.insertOne({
  fullName: 'Test User',
  gender: 'male',
  height: 2.0,
  weight: 85,
  adress: {
    city: 'Kiev',
    country: 'Ukraine',
    phone: +34000000,
  },
});
