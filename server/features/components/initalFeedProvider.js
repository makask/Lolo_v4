import { v4 as uuidv4 } from 'uuid';
import RSSParser from "rss-parser";

class feed {
    constructor(name, url){
        this.name = name;
        this.url = url;
        this.id = uuidv4();
        //this.articles = [];
    }

    /*addArticle(article){
        this.articles.push(article);
    }*/
}

class article {
    constructor(author, content, creator, link, isoDate, pubDate, title, categories ){
        this.id = uuidv4();
        this.author = author;
        this.content = content;
        this.creator = creator;
        this.link = link;
        this.isoDate = isoDate;
        this.pubDate = pubDate;
        this.title = title;
        this.categories = categories;
    }
}

class initialFeedProvider {
    async provide(feedUrl){
        return new feed("raimoseero", feedUrl);
        /*return items.map(item => {
            const feedItem = item.item; 
            const feedName = new URL(feedItem.link).host;
            const newFeed = new feed(feedName, feedItem.categories);
            newFeed.addArticle(new article(feedItem.author, feedItem.content, feedItem.creator, feedItem.link, feedItem.isoDate, feedItem.pubDate, feedItem.title, feedItem.categories));
            return newFeed;
        });*/
    }
}



export { initialFeedProvider, feed, article }