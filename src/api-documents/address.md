# Addres API Spec

## Create Address API

Endpoint : POST /api/contact/:contactId/addresess

Header :

- Authorization : token

Request Body :

```
{
    "street" : "asdasdasd",
    "city" : "sdfsdf",
    "province" : "adfadfad",
    "country" : "adfadfad",
    "postal_code" : "84705304"
}
```

Response Body Success :

```
{
    "data" : {
        "id" : 1,
        "street" : "asdasdasd",
        "city" : "sdfsdf",
        "province" : "adfadfad",
        "country" : "adfadfad",
        "postal_code" : "84705304"
    }
}
```

Response Body Error :

```
{
    "errors" : "Country is required"
}
```

## Update Address API

Endpoint : PUT /api/contact/:contactId/addresess/:addressId

Header :

- Authorization : token

Request Body :

```
{
    "street" : "asdasdasd",
    "city" : "sdfsdf",
    "province" : "adfadfad",
    "country" : "adfadfad",
    "postal_code" : "84705304"
}
```

Response Body Success :

```
{
    "data" : {
        "id" : 1,
        "street" : "asdasdasd",
        "city" : "sdfsdf",
        "province" : "adfadfad",
        "country" : "adfadfad",
        "postal_code" : "84705304"
    }
}
```

Response Body Error :

```
{
    "errors" : "Country is required"
}
```

## Get Address API

Endpoint : GET /api/contact/:contactId/addresess/:addressId

Header :

- Authorization : token

Response Body Success :

```
{
    "data" : {
        "id" : 1,
        "street" : "asdasdasd",
        "city" : "sdfsdf",
        "province" : "adfadfad",
        "country" : "adfadfad",
        "postal_code" : "84705304"
    }
}
```

Response Body Error :

```
{
    "errors" : "Contact not found"
}
```

## List Address API

Endpoint : GET /api/contact/:contactId/addresess

Header :

- Authorization : token

Response Body Success :

```
{
    "data" : {
        {
            "id" : 1,
            "street" : "asdasdasd",
            "city" : "sdfsdf",
            "province" : "adfadfad",
            "country" : "adfadfad",
            "postal_code" : "84705304"
        },
        {
            "id" : 2,
            "street" : "asdasdasd",
            "city" : "sdfsdf",
            "province" : "adfadfad",
            "country" : "adfadfad",
            "postal_code" : "84705304"
        }
    }
}
```

Response Body Error :

```
{
    "errors" : "Contact not found"
}
```

## Remove Address API

Endpoint : DELETE /api/contact/:contactId/addresess/:addressId

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
    "errors" : "Data not found"
}
```
