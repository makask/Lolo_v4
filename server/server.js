import cors from "cors";
import RSSParser from "rss-parser";
import express from "express";
import bodyParser from "body-parser";
import { initialFeedProvider, feed, article  } from "./features/components/initalFeedProvider.js";

const feedURL = "https://flipboard.com/@raimoseero/feed-nii8kd0sz.rss";
//const feedURL = "https://ir.netflix.net/rss/pressrelease.aspx";
//const feedURL = "https://rss.nytimes.com/services/xml/rss/nyt/HomePage.xml";

const port = 7000;
let app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

const parser = new RSSParser();

const parse = async url => {
    let articles = [];
    const feed = await parser.parseURL(url);
    feed.items.forEach(item => {
        articles.push({ item })
    });
    return articles;
}

app.get("/initial", async (req, res)=> {
    const initialFeed = await new initialFeedProvider().provide(feedURL);
    res.send(initialFeed);
});

app.post("/articles", async (req, res)=> {
    const{url} = req.body;
    const articles = (await parse(url)).map(x => x.item);
    res.send(articles);
});

app.post("/add", async (req, res) => {
    const{url, name } = req.body;
    try{
        var parsedFeed = await parser.parseURL(url);
        const newFeed = new feed(name, url);
        res.send(newFeed);
    }catch(err){
        return err;
    }
});

app.post("/", async (req, res) => {
    const{url} = req.body;
    try{
        console.log(url);
    }catch(err){
        console.error(err);
    }
});


let parsedArticle = {};

app.get("/mercury", async( req, res) => {
    res.send(parsedArticle);
})

app.post("/mercury", async (req, res) => {
    const{url} = req.body;
    try{
        const response = await fetch('https://uptime-mercury-api.azurewebsites.net/webparser', {
                method : "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ url: url})
            });
            const data = await response.json();
            res.send(response);
            parsedArticle = data;
    }catch(err){
        console.error(err);
    }
});


app.listen(port, () => {
    console.log(`Server running on port ${port}.`);
});
