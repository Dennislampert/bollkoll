# bollkoll
tenta

#Commandes in mongo to read data
* Mongo bollkoll = connecting to our db

If you just type mongo it will by default connect to test, then type in use bollkoll to connect to db.

* Show collections = showing the table-content in db

To read the content inside a collection, you type in for example:
db.books.find(), this will get you raw data

if you want to be able to read it as an array, type instead:
db.books.find().toArray()




