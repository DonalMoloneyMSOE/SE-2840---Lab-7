# SE-2840---Lab-7 From (1/26/2018)
Overview

In this assignment, you will modify your BusTracker application (from Lab 6):

1) You will modify your Bus Tracker server to implement a new route - /BusSpeed - that retrieves bus data from a Mongo database. You will use a provided application - MongoBusDataCollector - that will collect bus data and store it in a  BusTracker database populated and maintained by your local MongoDB server.

2) You will modify your BusTracker.html and BusTracker.js web page to include a new feature: the ability to retrieve information from the BusTracker database and display the busses that exceed a specified speed limit in the table and on the map.

3) Your MongoDB BusTracker database will be populated when you run your copy of mongoBusDataCollector, which is available on the course website. You will have to make a simple modification to this application to capture the data for your assigned route. Make sure you run this application for AT LEAST an hour total, split up around different time periods (rush hours, lunch hour, midday). Do not capture data between midnight and 5am, since it's unlikely that there are many busses running then. The application captures data every 15s - meaning you should have AT LEAST 240 entries in your BusTracker database. You may have more, but you may not have less. Don't go overboard - you don't want a database that is so large that it consumes all the memory/filespace on your laptop.
Implementation
BusTrackerServer.js

In your NodeJS-based Bus Tracker server code, keep all existing routes and functionality, and add a new /BusSpeed route. In that section of code,  base your implementation on the sample code from the /all route of mongoPhoneServer.js on the course website. Apply a find() filter to only return the busses that exceed a specified speed (provided as a parameter to the /BusSpeed HTTP GET request).

Be sure to use NPM to install all necessary mongoose package to your project.
BusTracker.html and BusTracker.js

In BusTracker.html, retain all existing functionality, and add a new "Report" button that invokes a "generateReport" method when pressed. In the generateReport method, read the value that is in the Route text field. Supply this value as a parameter to an Ajax GET request to the /BusSpeed route of your Bus Tracker server, where your server interprets the value as a speed and returns a collection of all busses exceeding that speed. This collection may be empty (if your speed threshold is high) or quite large (if the speed threshold is low).

Output this collection to the table, as in Lab 6. Since your table may be large, make sure that it's scrollable.

For the map: you will add a marker on the map for each bus (the number of markers is the same as the number of rows in your table). The map is static in this case, and does not need to be updated at regular intervals. Change the indicators on the marker to display the vehicle id and speed together (for example: 5516:47MPH). When you hover (mapquest) or click (google maps), the time should be displayed.

 In the message field, indicate how many busses are contained in the table (and shown as markers on the map).
Submission

Review your graded work from Lab 6  to eliminate errors you may have had in that submission.

    Include your name and plenty of comments within the BusTracker.html and BusTracker.js, and BusTrackerServer.js files.
    Zip the files together.
    Be sure not to include the node_modules folder.
    Submit the files to Blackboard (under Lab 7).
