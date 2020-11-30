class Data {
    title: string
    items: Quote[] | BackgroundImage[]
    constructor(title: string, items: any[]) {
        this.title = title
        this.items = items
    }
}

class Quote {
    author: string
    content: string
    constructor(author: string, content: string) {
        this.author = author
        this.content = content
    }
}

class BackgroundImage {
    imageURL: string
    alt: string
    constructor(imageURL: string, alt: string) {
        this.imageURL = imageURL
        this.alt = alt
    }
}

module.exports=[ new Data("", [
    new BackgroundImage("https://cdn.pixabay.com/photo/2017/08/30/01/05/milky-way-2695569_1280.jpg", "universe"),
    new BackgroundImage("https://cdn.pixabay.com/photo/2013/08/20/15/47/poppies-174276_1280.jpg","flowers"),
    new BackgroundImage("https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg","sunset")
]), 
new Data ("Quotes", [
    new Quote("Haleema Felix","Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."),
    new Quote("Georga Salazar","Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."),
    new Quote("Rikki Emerson","Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."),
    new Quote("Imaan Crossley","Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."),
    new Quote("Taylah Holloway","Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."),
    new Quote("Beck Morse","Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."),
])]