I have used mongodb for storing the data that is fetched from the 3rd party api.
You have to start mongodb first to make the project work properly.
If want to change the link for mongodb the connection for it is present in db.js
and a comment is include there to help.
The server will the hosted on port 3000 and that can be changed in index.js

1.Open the folder in powershell/any cli that u like.
2.Write the command "npm i"
3.Start Mongodb server
4.Go to http://localhost:3000/createDB to initailize the database.
5.Create an API for statistics:- http://localhost:3000/api/v1/stats/March
6.Create an API for bar chart:- http://localhost:3000/api/v1/barchart/May
7.Create an API for pie chart:- http://localhost:3000/api/v1/piechart/November
8.Create an API which fetches the data from all the 3 APIs mentioned above, combines
the response and sends a final response of the combined JSON:- http://localhost:3000/api/v1/getAll/March