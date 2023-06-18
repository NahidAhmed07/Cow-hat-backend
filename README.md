# Cow Hat API (Node.js, Express.js, MongoDB)

### Project Description

This is a REST API for a cow hat shop. It has user creation, pagination, filtering, and sorting features. It is built with Node.js, Express.js, and MongoDB. It is a backend project. It is deployed on Vercel.

### Live Link: https://mna-cow-hat.vercel.app/

### GitHub Link: https://github.com/Programming-Hero-Web-Course4/l2a3-cow-hut-backend-assignment-NahidAhmed07

### Application Routes:

#### User

- api/v1/user/create-user (POST)

  - Required body: `name`, `password`, `role`, `phoneNumber`, `budget` , `income` and `address`

- api/v1/user (GET)
  - Query Params: `?role=seller` or `?role=buyer` or `searchTerm=Na` or `?sortBy=income&sortOrder=asc` or `?pag=1&limit=10`
- api/v1/user/6177a5b87d32123f08d2f5d4 (Single GET)
  - Require Params: `userId = 6177a5b87d32123f08d2f5d4`
- api/v1/user/6177a5b87d32123f08d2f5d4 (PATCH)
  - Require Params: `userId = 6177a5b87d32123f08d2f5d4`
  - Required body: `at lest one field you want to update like: "budget": 100000`
- api/v1/user/6177a5b87d32123f08d2f5d4 (DELETE)
  - Require Params: `userId = 6177a5b87d32123f08d2f5d4`

#### Cows

- api/v1/cow (POST)

  - Required body:

  ```ts
  "name": "Goru 5",
  "age": 2,
  "price": 90000,
  "location": "Khulna",
  "breed": "Dehhi",
  "weight": 120,
  "label": "for sale",
  "category": "Beef",
  "seller": "648d4896f8593e44d39bd8e3"

  ```

- api/v1/cow (GET)
  - Query Params: `?category=Beef` or `?label=for sale` or `?location=Khulna` or `?searchTerm=Go` or `?sortBy=price&sortOrder=asc` or `?pag=1&limit=10` or `?minPrice=20000&maxPrice=70000` or `?minWeight=100&maxWeight=200`
- api/v1/cow/6177a5b87d32123f08d2f5d4 (Single GET)
  - Require Params: `cowId = 6177a5b87d32123f08d2f5d4`
- api/v1/cow/6177a5b87d32123f08d2f5d4 (PATCH)
  - Require Params: `cowId = 6177a5b87d32123f08d2f5d4`
- api/v1/cow/6177a5b87d32123f08d2f5d4 (DELETE)
  - Require Params: `cowId = 6177a5b87d32123f08d2f5d4`

#### Orders

- api/v1/order (POST)

  - Required body:

  ```ts
  "cow": "6177a5b87d32123f08d2f5d4",
  "buyer": "6177a5b87d32123f08d2f5d4",

  ```

- api/v1/order(GET Single)
  - Require Params: `orderId = 6177a5b87d32123f08d2f5d4`
- api/v1/order(GET)
  - Query Params: `buyer=6177a5b87d32123f08d2f5d4`
