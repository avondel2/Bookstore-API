# Bookstore Backend API Example

## API Document 

#### [API Document Link](https://documenter.getpostman.com/view/9234088/TVRdABr8#98759510-573d-46f1-92e5-c55312d3a6a2)

## API List

| API           | Url                     | Description    |
| ---------    | -----------                     | -------------    |
|RegisterUser   | ./auth/registeruser   | Register new User|
|LoginUser      | ./auth/loginuser      | Login User |
|InsertBook     | ./books/insertbooks   | Insert new Book|
|Getbook        | ./books/getbooks      | Get book data |
|UpdateBook     | ./books/updatebooks   | Update Bookname or Quantity |
|RentBook       | ./books/rentbooks     | Rent book by User |
|ReturnBook     | ./books/returnbooks   | Return Rented book |
|NotReturnBookHistory| ./history/notreturnhistory| History Not Returned Book |
|RentHistory    | ./history/allhistory  | History All |

## Database

Database : Mongodb

### Collection 
| Collection    | Field Name    | DataType  |
| ----------    | ----------    | -------   |
| User          | _id           | ObjectId  |
| User          | username      | String    |
| User          | password      | String    |
| User          | fullname      | String    |
| User          | roles         | String    |
| Books         | _id           | ObjectId  |
| Books         | bookname      | String    |
| Books         | barcode       | Number    |
| Books         | quantity      | Number    |
| History       | _id           | ObjectId  |
| History       | bookID        | ObjectId  |
| History       | userID        | ObjectId  |
| History       | returne       | Boolean   |
| History       | RentDate      | Date      |
| History       | ReturnDate    | Date      |
