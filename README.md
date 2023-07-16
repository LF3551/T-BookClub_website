# T-Book Club website


### `npm start`


Build and Deploy Your Application
Once you're satisfied with your application, you can build it for production using the following command:

npm run build


run backend
node server.js

to clean port
lsof -i :3006
kill -9 76778

script for deleting PIDs 

clean for frontend
lsof -i :3002 | awk 'NR!=1 {print $2}' | xargs kill -9

clean for backend
lsof -i :3006 | awk 'NR!=1 {print $2}' | xargs kill -9