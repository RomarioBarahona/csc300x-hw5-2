# Jokebook API Documentation

This document provides detailed information about the Jokebook API endpoints and their usage.

## Base URL

The base URL for accessing the Jokebook API is `http://localhost:3000`.

## Endpoints

### 1. Get Joke Categories

Retrieve a list of available joke categories.

- **URL**: `/jokebook/categories`
- **Method**: `GET`
- **Response**: An array of strings representing joke categories.

### 2. Get Jokes by Category

Retrieve jokes belonging to a specific category.

- **URL**: `/jokebook/joke/:category`
- **Method**: `GET`
- **URL Parameters**:
  - `category`: The category of jokes to retrieve.
- **Query Parameters**:
  - `limit` (optional): Limits the number of jokes returned.
- **Response**: An array of objects, each containing a joke and its corresponding response.

### 3. Add New Joke

Add a new joke to the Jokebook.

- **URL**: `/jokebook/joke/new`
- **Method**: `POST`
- **Request Body**: JSON object with the following properties:
  - `category`: The category of the joke.
  - `joke`: The text of the joke.
  - `response`: The response to the joke.
- **Response**: The newly added joke object.

## Example Usage

### 1. Get Joke Categories

```http
GET /jokebook/categories
```

Response:

```json
[
    "funnyJoke",
    "lameJoke"
]
```

### 2. Get Jokes by Category

```http
GET /jokebook/joke/funnyJoke?limit=5
```

Response:

```json
[
    {
        "joke": "Why don't scientists trust atoms?",
        "response": "Because they make up everything!"
    },
    {
        "joke": "Why did the scarecrow win an award?",
        "response": "Because he was outstanding in his field!"
    },
    ...
]
```

### 3. Add New Joke

```http
POST /jokebook/joke/new
Content-Type: application/json

{
    "category": "funnyJoke",
    "joke": "Why did the chicken cross the road?",
    "response": "To get to the other side!"
}
```

Response:

```json
{
    "category": "funnyJoke",
    "joke": "Why did the chicken cross the road?",
    "response": "To get to the other side!"
}
```
