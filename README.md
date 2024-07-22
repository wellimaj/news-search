# news-searcto

requirements :
node 19.9.0

1 .run npm install in frontend and backend folder 2. run npm run dev in backend and front end folder

Base URL
/protected

Middleware
All routes in this controller are protected by an authentication middleware that verifies tokens.

Endpoints

1. Get News Articles
   Fetch news articles based on query parameters.

Endpoint: /articles

Method: GET

Query Parameters:

q (string, optional): Query string to search for specific articles.
page (number, optional): Page number for pagination.
searchIn (string, optional): Filter to search within specific fields (e.g., title, description, content).
Response:

Status: 200 OK
Body: Array of articles based on the search criteria.
Example Request:

vbnet

GET /protected/articles?q=technology&page=1&searchIn=title
Example Response:

json

[
{
"title": "Latest in Technology",
"description": "New advancements in technology are being made every day.",
"content": "..."
},
...
] 2. Summarize Article
Summarize a specific article based on its URL.

Endpoint: /summarize

Method: GET

Query Parameters:

url (string, required): URL of the article to be summarized.
Response:

Status: 200 OK
Body: Summarized content of the article.
Example Request:

arduino

GET /protected/summarize?url=https://example.com/article
Example Response:

json

{
"summary": "This article discusses the recent advancements in AI technology..."
}
Middleware Details
AuthMiddleware

This middleware verifies the token to ensure that the request is authenticated before accessing the protected routes.

Services
NewsService

This service is responsible for interacting with the news API and summarizing articles.

Methods:

articles(q: string, page: number, searchIn: string): Fetches articles based on query parameters.
summarize(url: string): Summarizes an article based on the given URL.
Example Usage
Fetching Articles
bash

curl -X GET "http://yourdomain.com/protected/articles?q=health&page=2&searchIn=description" -H "Authorization: Bearer YOUR_TOKEN"
Summarizing an Article
bash

curl -X GET "http://yourdomain.com/protected/summarize?url=https://example.com/some-article" -H "Authorization: Bearer YOUR_TOKEN"
Error Handling
401 Unauthorized: If the token is missing or invalid.
400 Bad Request: If required query parameters are missing or invalid.
500 Internal Server Error: If there is an issue with the server or the external news service.
This documentation provides a detailed overview of the ProtectedController class APIs, including their endpoints, methods, query parameters, responses, and example usage.
