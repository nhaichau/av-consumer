av-consumer is an app based on MERN stack to demonstrate AirVantage API.
User needs to pass in AirVantage username/password and API client credentials. Access web token is then provided so that API calls can be used.
The first demo is to get last data points from AirVantage and show them up.

Landing page: two links
    + first link to create user with all required credentials: first find for a user, if not found, create a user
    + second link to use AirVantage API: first enter AirVantage user, if not found, move back to create user. If user is ok, retrieve data for a system