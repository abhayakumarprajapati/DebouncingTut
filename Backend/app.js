import express from 'express'


import mongoose from 'mongoose';

import cors from 'cors'

const app = express();

app.use(express.json())

app.use(cors({
    origin: ["http://localhost:3000"],

}))
const realmePhones = [
    // Realme Number Series
    "Realme 14 Pro 5G", "Realme 14 Pro+", "Realme 14",
    "Realme 13+ 5G", "Realme 13 5G", "Realme 13",
    "Realme 12 Pro 5G", "Realme 12 Pro+", "Realme 12",
    "Realme 11 Pro 5G", "Realme 11 Pro+", "Realme 11",
    "Realme 10 Pro 5G", "Realme 10 Pro+", "Realme 10",
    "Realme 9 Pro 5G", "Realme 9 Pro+", "Realme 9",
    "Realme 8 Pro", "Realme 8", "Realme 7 Pro", "Realme 7",
    "Realme 6 Pro", "Realme 6", "Realme 5 Pro", "Realme 5",
    "Realme 4 Pro", "Realme 4", "Realme 3 Pro", "Realme 3",
    "Realme 2 Pro", "Realme 2", "Realme 1",

    // Realme GT Series
    "Realme GT 5 Pro", "Realme GT 5", "Realme GT 4 Pro", "Realme GT 4",
    "Realme GT 3 Pro", "Realme GT 3", "Realme GT 2 Pro", "Realme GT 2",
    "Realme GT Neo 5", "Realme GT Neo 4", "Realme GT Neo 3", "Realme GT Neo 2",
    "Realme GT Master Edition", "Realme GT",

    // Realme X Series
    "Realme X50 Pro", "Realme X50", "Realme X3 SuperZoom", "Realme X3",
    "Realme X2 Pro", "Realme X2", "Realme X",

    // Realme Narzo Series
    "Realme Narzo 60 Pro", "Realme Narzo 60", "Realme Narzo 50 Pro", "Realme Narzo 50",
    "Realme Narzo 30 Pro", "Realme Narzo 30", "Realme Narzo 20 Pro", "Realme Narzo 20",
    "Realme Narzo 10",

    // Realme C Series
    "Realme C55", "Realme C35", "Realme C25", "Realme C15", "Realme C11",

    // Realme V Series
    "Realme V30", "Realme V25", "Realme V20", "Realme V15", "Realme V11",

    // Realme Q Series
    "Realme Q5 Pro", "Realme Q5", "Realme Q3 Pro", "Realme Q3", "Realme Q2 Pro", "Realme Q2",

    // Realme U Series
    "Realme U2", "Realme U1"
];









const connectDB = async () => {

    try {
        mongoose.connect('mongodb://localhost:27017/Event').then(() => {
            console.log('database is connected')
        })
    } catch (error) {
        console.log('database not connected')
    }

}

await connectDB()


const EventSchema = new mongoose.Schema({
    eventName: String,
    totalSeats: Number,
    createdat: {
        type: String,
        default: new Date()
    }

})

const Event = mongoose.model("Event", EventSchema)



const ProductSchema = new mongoose.Schema({
    name: String,


})

const Product = mongoose.model("Product", ProductSchema)


app.post('/create-product', async (req, res, next) => {



    for (const item of realmePhones) {
        const product = new Product({
            name: item
        })
        await product.save();
    }





    res.status(200).json({


        message: "successfully created"
    })


})


app.get('/allproduct', async (req, res, next) => {

    let query = {};

    if (req.query.name) {
        query.name = { $regex: req.query.name ?? '', $options: 'i' };
    }

    const products = await Product.find(query)

    res.status(200).json({
        data: products,
        message: "fetched successfully"
    })

})



app.post('/create-event', async (req, res, next) => {

    const { name, seats } = req.body;

    const event = new Event({
        eventName: name,
        totalSeats: seats
    })

    await event.save();

    res.status(200).json({
        data: event,

        message: "successfully created"
    })


})

app.get('/all', async (req, res, next) => {

    const events = await Event.find({})

    res.status(200).json({
        data: events,
        message: "fetched successfully"
    })

})

app.post('/book', async (req, res, next) => {

    const id = req.body.id;

    const numofSeats = req.body.seat;

    const event = await Event.findById(id);

    console.log(event)
    console.log(numofSeats)
    console.log(event.totalSeats)
    console.log(numofSeats <= event.totalSeats)
    // 2<=10

    if (event.totalSeats > 0 && numofSeats <= event.totalSeats) {

        event.totalSeats = event.totalSeats - numofSeats;

        await event.save();

        res.status(200).json({
            data: event,
            message: "success"
        })


    } else {

        res.status(200).json({
            message: "seats not available"
        })

    }



})

app.listen(4000, () => {

    console.log('server is running')

})