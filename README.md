# Cow Hat API (Node.js, Express.js, MongoDB)

### Project Description

This is a REST API for a cow hat shop. It has user creation, pagination, filtering, and sorting features. It is built with Node.js, Express.js, and MongoDB. It is a backend project. It is deployed on Vercel.

### Live Link: https://mna-cow-hat.vercel.app/

### GitHub Link: https://github.com/Programming-Hero-Web-Course4/l2a3-cow-hut-backend-assignment-NahidAhmed07

### Application Routes:

#### User

- api/v1/user/create-user (POST)

  - Required body:

  ```ts

  "password":"123456",
  "role": "seller" or "buyer",
  "name":{
    "firstName": "Naim ",
    "lastName": "Hasan"
  },
  "phoneNumber":"01758597463",
  "address": "Pabna",
  "budget":0,
  "income":0

  ```

- api/v1/user (GET)
  - Query Params: `?role=seller` or `?role=buyer` or `searchTerm=Na` or `?sortBy=income&sortOrder=asc` or `?pag=1&limit=10`
- api/v1/user/6177a5b87d32123f08d2f5d4 (Single GET)
  -Require Params: `userId = 6177a5b87d32123f08d2f5d4`
- api/v1/users/6177a5b87d32123f08d2f5d4 (PATCH)
  -Require Params: `userId = 6177a5b87d32123f08d2f5d4`
  - Required body: `at lest one field you want to update like: "budget": 100000`
- api/v1/user/6177a5b87d32123f08d2f5d4 (DELETE)
  -Require Params: `userId = 6177a5b87d32123f08d2f5d4`

#### Cows

- api/v1/cows (POST)
- api/v1/cows (GET)
- api/v1/cows/6177a5b87d32123f08d2f5d4 (Single GET) Include an id that is saved in your database
- api/v1/cows/6177a5b87d32123f08d2f5d4 (PATCH)
- api/v1/cows/6177a5b87d32123f08d2f5d4 (DELETE) Include an id that is saved in your database

### Pagination and Filtering routes of Cows

- api/v1/cows?pag=1&limit=10
- api/v1/cows?sortBy=price&sortOrder=asc
- api/v1/cows?minPrice=20000&maxPrice=70000
- api/v1/cows?location=Chattogram
- api/v1/cows?searchTerm=Cha

#### Orders

- api/v1/orders (POST)
- api/v1/orders (GET)
