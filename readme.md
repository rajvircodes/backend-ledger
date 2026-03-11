Steps: 
1. Create a express server (server.js - app.js)
2. connect to database (config/db.js)
3. create a user Schema (models/user.model.js)
4. password hash and compare : bcrypt package 
5. create User model => mongoose.model("User", userSchema)
6. create routes (routes/auth.route.js) - import in app.js 
7. create controllers (controllers/auth.controller.js)
8. generate a token => jsonwebtoken package
9. set token into cookie parser => cookie-parser package
    ---- pending 

    