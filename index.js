require("dotenv").config();
const express = require("express");

// mongoose connection
const connectDB = require("./connection")

// mongoose model
const userModel = require("./user")

const app = express();

// configuration
app.use(express.json());

// route:       /
// description: To get all user
// parameter:   none
app.get('/', async (req, res) => {
    try{
        const user = await userModel.find();
        return res.json({ user });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

// route:       /user/new
// description: To add all user
// parameter:   none
// request body: user object
// to add new data we use POST method
app.post("/user/new", async (req, res) => {
    try{
        const { newUser } = req.body;
    
        await userModel.create(newUser);
    
        return res.json({ message: "User Created" });
    } catch (error) {        
        return res.status(500).json({ error: error.message });
    }

});

// route:       /user/type/:type
// description: To get all user based on type
// parameter:   type
app.get("/user/type/:type", async (req, res) => {
    try{
        const { type } = req.params;
    
        const user = await userModel.find({userType: type});
    
        if(!user) {
            return res.json({ message: "No user found" });
        }
    
        return res.json({ user });
    } catch (error) {        
        return res.status(500).json({ error: error.message });
    }
    
});

// route:       /user/:_id
// description: To get all user based on id
// parameter:   _id
app.get("/user/:_id", async (req,res) => {
    try{
        const { _id } = req.params;
        const user =  await userModel.findById( _id );
        
        if(!user) {
            return res.json({ message: "No user found" });
        }
    
        return res.json({ user });
    } catch (error) {        
        return res.status(500).json({ error: error.message });
    }

});

// route:       /user/update/:_id
// description: To add new user
// parameter:   none
// request body: user object
app.put("/user/update/:_id", async (req, res) => {
    try{
        const { _id } = req.params;
        const { userData } = req.body;
    
        const updateUser = await userModel.findByIdAndUpdate(
            _id,
    
            // "$set" is used to update a new data inside the object and it is a MongoDB operator
            { $set: userData }, 
    
            // this helps in returning the new data
            // if removed, old data is returned but database is updated with the new data
            { new: true}
        );
    
        return res.json({ user: updateUser});
    } catch (error) {        
        return res.status(500).json({ error: error.message });
    }

});

// route:       /user/delete/:_id
// description: To delete a user by id
// parameter:   _id
// request body: none
app.delete("/user/delete/:_id", async (req, res) => {
    try{
        const { _id } = req.params;
    
        await userModel.findByIdAndDelete(_id);
    
        return res.json({ message: "User Deleted!" });
    } catch (error) {        
        return res.status(500).json({ error: error.message });
    }
    
});

// route:       /user/delete/type/:userType
// description: To delete all users which have the userType
// parameter:   userType
// request body: none
app.delete("/user/delete/type/:userType", async (req, res) => {
    try{
        const { userType } = req.params;
    
        const allUser = await userModel.findOneAndDelete({ userType });
    
        return res.json({ message: "Users Deleted!" });
    } catch (error) {        
        return res.status(500).json({ error: error.message });
    }
    
});

app.listen(4000, () => {
    connectDB()
        .then((data) => console.log("server is running"))
        .catch((error) => console.log(error))
});