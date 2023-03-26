require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const connection = mongoose.connection;
const app = express();
const ejs = require("ejs");
const path = require("path");
const cookieParser = require("cookie-parser");
const expressLayout = require("express-ejs-layouts");

const PORT = process.env.PORT || 3300 || 3301;
const session = require("express-session");
const flash = require("express-flash");

const MongoDbStore = require("connect-mongo")(session);
const passport = require("passport");
const Emitter = require("events");

mongoose.connect(
    "mongodb://localhost:27017/pizza", { useNewUrlParser: true, useUnifiedTopology: true },
    (err) => {
        if (!err) console.log("Database connect...");
        else console.log("Database error");
    }
);


let mongoStore = new MongoDbStore({
    url: "mongodb://localhost:27017/pizza",
    mongooseConection: connection,
    collection: "sessions",
});

r̥
const eventEmitter = new Emitter();

app.set("eventEmitter", eventEmitter);


app.use(
    session({

        secret: process.env.COOKIE_SECRET,
        resave: false,
        store: mongoStore,
        saveUninitialized: false,
        cookie: { maxAge: 1000 * 60 * 60 * 24 },
    })
);
app.use(cookieParser());
app.use(passport.initialize());

app.use(passport.session());

const passportInit = require("./app/config/passport");
const { join } = require("path");
passportInit(passport);

app.use(flash());


app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


app.use((req, res, next) => {
    res.locals.session = req.session;
    res.locals.user = req.user;

    next();
});


app.use(expressLayout);
app.set("views", path.join(__dirname, "/resources/views"));
app.set("view engine", "ejs");
require("./routes/web")(app);

const server = app.listen(PORT, () => {
    console.log(`listen on port ${PORT}`);
});



const io = require("socket.io")(server);

io.on("connection", (socket) => {


    socket.on("join", (roomName) => {
        socket.join(roomName);
    });
});

eventEmitter.on("orderUpdated", (data) => {
    io.to(`order_${data.id}`).emit("orderUpdated", data);

});

eventEmitter.on("orderPlaced", (data) => {
    io.to(`adminRoom`).emit("orderPlaced", data);

});