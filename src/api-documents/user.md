# User API Spec

## Register User API

Endpoint : POST /api/users

Request Body :

```
{
    "username" : "jon",
    "password" : "rahasia",
    "name" : "ahmad choirul huda"
}
```

Response Body Success :

```
{
    "data" : {
        "username" : "jon",
        "name" : "ahmad choirul huda"
    }
}
```

Response Body Error :

```
{
    "errors" : "Username already registred"
}
```

## Login User API

Endpoint : POST /api/users/login

Request Body :

```
{
    "username" : "jon",
    "password" : "rahasia"
}
```

Response Body Success :

```
{
    "data" : {
        "token" : "unique-token"
    }
}
```

Response Body Error :

```
{
    "errors" : "Username pr password wrong"
}
```

## Update User API

Endpoint : PATCH /api/users/:id

Header :

- Authorization : token

Request Body :

```
{
    "name" : "programmer",
    "password" : "new password"
}
```

Response Body Success :

```
{
    "data" : {
        "name" : "jon",
        "password" : "new password"
    }
}
```

Response Body Error :

```
{
    "errors" : "Name length max"
}
```

## Get User API

Endpoint : GET /api/users/current

Header :

- Authorization : token

Response Body Success :

```
{
    "data" : {
        "username" : "jon",
        "name" : "choirul huda"
    }
}
```

Response Body Error :

```
{
    "errors" : "Unauthorized"
}
```

## Logout User API

Endpoint : DELETE /api/users/logout

Header :

- Authorization : token

Response Body Success :

```
{
    "data" : "OK"
}
```

Response Body Error :

```
{
    "errors" : "Unauthorized"
}
```
