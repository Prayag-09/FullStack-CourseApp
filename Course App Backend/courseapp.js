const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());

const port = 3000;
const secretCode = 's3cr3t-123';

const adminSchema = mongoose.Schema({
    Admin: String,
    Password: String 
});

const userSchema = mongoose.Schema({
    username: String,
    password: String,
    purchased_courses:[{
        type: mongoose.Schema.Types.ObjectId, // To autheticate and verify purchase
    ref:'Course' // Refernce to that of Course Schema
    }]
});

const courseSchema = mongoose.Schema({
    Title:String,
    Description:String,
    pirce: Number,
    ImgLink: String,
    published: Boolean // Don't show unpublished courses
});

const Admin = mongoose.model('Admin Panel' , adminSchema);
const User = mongoose.model('User Panel' , userSchema);
const Course = mongoose.model('Course', courseSchema);


const autheticateJWT = (req,res,next) =>{
    const authHead = req.headers.authorization;
    if(authHead){
        const token = authHead.split('');
        // Verifying the token using Secret Code
        jwt.verify(token,secretCode,(err, user) => {
            if(err) return res.sendStatus(403) // When error send 403
            req.user = user; // No error --> Show User
        next(); // Move on / Code will be blocked here
        });
    } else {
        res.send(401);
    }
}
// Without connecting, the DB will never work
    mongoose.connect('mongodb+srv://learning:prayag12345@cluster0.ltsj5wi.mongodb.net/courses');


// Now CRUD - Backend
// For Admin Panel
app.post('/admin/signup', async (req, res) =>{
    const {username , password} = req.body;
    const admin = await Admin.findOne({username});
    if(admin){
        res.status(200).json({
            // Try changing into ${username}
            message: ` Username already exist`
        });
    } else {
        // Create a new Admin
        const object = {username, password};

        // Creating a new Admin Panel using Admin Schema
        const newAdmin = new Admin(obj);
        newAdmin.save(); // Adding into DB

        // Assigning role using JWT
        // .sign - To create a token
        const token = jwt.sign({ 
                username, // Automatically assigned username
                role: 'admin' // Provides a new role as Admin
                },secretCode,{
                expiresIn: '3h' 
            });
        res.json({ message: 'Admin created successfully', token });
    }
});
app.post('/admin/login',async (req, res) =>{
    const {username , password} = req.headers;
    const admin = await Admin.findOne({username , password });
    if(admin){
        const token = jwt.sign({username, role: 'Admin'},secretCode,{expiresIn: '5h'})
        res.json({
            message: ' Logged In Succesfully . Welcome back '
        }, token)
    } else {
        res.status(403).json({
            message: " Invalid Username / Password. Please Try Again "
        });
    }
});

app.post('/admin/courses',autheticateJWT, async (req, res) => {
    const course = new Course(req.body);
    await course.save(); // Wating time is needed to save into DB
    res.json({ message : 'Course added Successfully' , courseId: course.id });
});

app.put('admin/course/:courseId', autheticateJWT , async (req, res) => {
    const course = await Course.findByIdAndUpdate(req.params.courseId, req.body,{ new: true});
    if(course){
        res.json({message : 'Course Updated Succesfully'})
    } else {
        res.status(404).json({ message: 'Course not found' });
    }
});

app.get('/admin/courses' ,autheticateJWT,async (req, res) =>{
    const course = Course.find({}) // Empty will find everything
    res.json({ course });
});

// For User Panel
app.post('/user/signup', async (req, res) =>{
    // Used a seperate Obj ( Made Changes )
    const userObj = {username , password};
    const user = await User.findOne({username});
    if(user){
        res.json({
            message: 'User already exists'
        })
    } else {
        const newUser = new User(userObj); // (Made Changes)
        const token = jwt.sign({username,role:'User'},secretCode, {expiresIn:'1h'});
        res.json({
            message: 'User created succesfully',
            token
        });
    }
});


app.post('/user/login', async (req,res) => {
    const {username, password} = req.headers ;
    const user = await User.findOne({username , password });

    if(user) {
        const token = jwt.sign({username, role:'User'},secretCode,{expiresIn:'1h'});
        res.json({ message: 'Logged in successfully', token });
    } else {
        res.json({
            message: ' User not found '
        });
    }
});
app.get('/user/courses',autheticateJWT,async (req,res) => {
    const course = await Course.find({published:true});
    res.json({course});
});

// User to Purchase a course
app.post('/users/courses/:courseId', autheticateJWT,async (req,res) => {
    const course = await Course.findById(req.parans.courseId);
    console.log(course);
    if(course){
        const user = await User.findOne({username : req.user.username});
        if(user) {
            user.purchasedCourses.push(course);
            await user.save();
            res.json({ message: 'Course purchased successfully' });
        } else {
            res.status(403).json({ message: 'User not found' });
        }
    } else {
        res.status(400).json({
            message: 'Course not found'
        })
    }
});
// Show Purchased courses
app.get('/users/purchasedCourse',autheticateJWT,async (req,res) => {
    const user = await User.findOne({username: req.user.username}).populate('purchasedCourse');
    if (user) {
        res.json({ purchasedCourses: user.purchasedCourses || [] });
    } else {
        res.status(403).json({ message: 'User not found' });
    }
});

app.listen(port , () => {
    console.log(`Server is up and running on Host : ${port}`)
})