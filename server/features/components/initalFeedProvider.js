import { v4 as uuidv4 } from 'uuid';

class feed {
    constructor(name, url, color){
        this.name = name;
        this.url = url;
        this.id = uuidv4();
        this.color = color;
    }
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
        return new feed("Raimo Seero", feedUrl, "#87CEEB");
    }
}



export { initialFeedProvider, feed, article }