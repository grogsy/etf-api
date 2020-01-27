# Preface 

# API Documentation & Access
Postman documentation can be found at: https://documenter.getpostman.com/view/8410071/SWTA9yGU?version=latest. The documentation describes how to use the API.

This project is deployed at: https://spdr-etf-api.herokuapp.com/

# Setting up
Install project dependencies:

`npm install`

Then run the setup script using npm:

`npm run init-setup`

The setup script only needs to be run once. It populates the database with initial etf data. It also caches the links to individual etf pages, which will be used when performing database updates.

It is important to note the setup script also uses the Selenium framework to scrape the page https://www.ssga.com/us/en/individual/etfs/fund-finder, so a webdriver(i.e. geckodriver for firefox) is required as well.

# API Key expiration policy
Generated API keys are set to expire after 24 hours from creation.