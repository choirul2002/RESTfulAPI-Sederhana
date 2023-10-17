# Contact API Spec

## Create Contact API

Endpoint : POST /api/contact

Header :

- Authorization : token

Request Body :

```
{
    "first_name" : "ahmad",
    "last_name" : "choirul",
    "email" : "ahshkj@gmail.com",
    "phone" : "84705304"
}
```

Response Body Success :

```
{
    "data" : {
        "id" : 1,
        "first_name" : "ahmad",
        "last_name" : "choirul",
        "email" : "ahshkj@gmail.com",
        "phone" : "84705304"
    }
}
```

Response Body Error :

```
{
    "errors" : "Email is not valid format"
}
```

## Update Contact API

Endpoint : PUT /api/contact/:id

Header :

- Authorization : token

Request Body :

```
{
    "first_name" : "ahmad",
    "last_name" : "choirul",
    "email" : "ahshkj@gmail.com",
    "phone" : "84705304"
}
```

Response Body Success :

```
{
    "data" : {
        "id" : 1,
        "first_name" : "ahmad",
        "last_name" : "choirul",
        "email" : "ahshkj@gmail.com",
        "phone" : "84705304"
    }
}
```

Response Body Error :

```
{
    "errors" : "Email is not valid format"
}
```

## Get Contact API

Endpoint : GET /api/contact/:id

Header :

- Authorization : token

Response Body Success :

```
{
    "data" : {
        "id" : 1,
        "first_name" : "ahmad",
        "last_name" : "choirul",
        "email" : "ahshkj@gmail.com",
        "phone" : "84705304"
    }
}
```

Response Body Error :

```
{
    "errors" : "Contact is Not found"
}
```

## Search Contact API

Endpoint : GET /api/contact

Header :

- Authorization : token

Query params :

- name : Search by first_name or last_name
- email : Searh by email
- phone : Search by phone
- page : number or page, default 1
- size : size per page, default 10

Response Body Success :

```
{
    "data" : {
        {
            "id" : 1,
            "first_name" : "ahmad",
            "last_name" : "choirul",
            "email" : "ahshkj@gmail.com",
            "phone" : "84705304"
        },
        {
            "id" : 1,
            "first_name" : "ahmad",
            "last_name" : "choirul",
            "email" : "ahshkj@gmail.com",
            "phone" : "84705304"
        }
    },
    paging : {
        "page" : 1,
        "total_page" : 3,
        "total_item" : 30
    }
}
```

Response Body Error :

```
{
    "errors" : "Data not found"
}
```

## Remove Contact API

Endpoint : DELETE /api/contact/:id

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
    "errors" : "Contact is not found"
}
```
