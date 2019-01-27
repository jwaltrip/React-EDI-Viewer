# React EDI Web Portal
This project was inspired due to a lack of a user friendly way to view incoming purchase order data sent over
a B2B X12 EDI document exchange.

#### Backstory  
A company that I worked for had recently setup an automated B2B EDI document exchange which included these documents:
- (850) Purchase Orders
- (855) Purchase Order Acknowledgements
- (856) Advanced Ship Notice
- (810) Invoice

All of these document transactions were sent directly into a SQL database, and the B2B partnership moved to production
status before a tool was made for our customer service team to easily be able to view the incoming purchase order data

It was rather inconvenient to have our CS team use a SQL database explorer - these typically included much more functionality
than what was needed, along with various risks of misinterpretting the data or altering the table definitions

What we needed was a minimal, read-only web portal for our CS team to view the incoming purchase order data for individual
orders - and this is what I aimed to provide with this app!

## See it in Action!
https://aca-final-project-edi-viewer.herokuapp.com

Feel free to register an account and browse through the purchase orders (all sensitive data has been scrubbed)

## Features
- Lists all incoming purchase orders, and when an order is clicked a modal is displayed containing relevant order information
- Search function that can search based on: order #, date, SKU, or name
- A calendar button next to search field to select a date to search
- Can select how many rows per page are displayed
- Pagination that adjusts to number of rows per page selected
- A sticky table header on scroll down when viewing 50 or 100 orders per page
- User authentication based on JWT

## Technologies Used
- React + React Router v4 + Redux + Redux Thunk
- Node
- Express
- MongoDB
- Mongoose
- Passport.js
- JWT Authentication
- Bcrypt.js
- Reactstrap
- Bootstrap CSS
- Classnames
- Validator.js
- Deployed on Heroku