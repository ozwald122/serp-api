require('dotenv').config();
const express = require("express");
const {getJson} = require("serpapi");
const cors = require('cors');

const PORT = process.env.PORT || 3001;

const app = express();

app.use(cors())

app.get("/api/search", async (req, res) => {
    try {
        const keyword = req.query.keyword;
        console.log("=>(index.js:12) keyword", keyword);
        if (!keyword) {
            return res.json({data: null, success: true})
        }
        const json = await getJson("google", {
            api_key: process.env.SERP_API_KEY,
            q: keyword
        })
        console.log("=>(index.js:15) json", json);
        res.json({data: json, success: true});
    } catch (e) {
        res.json({message: e, success: false,});
    }
});

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});
