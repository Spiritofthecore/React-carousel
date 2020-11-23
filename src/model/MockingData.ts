class Data {
    title: string
    items: string[]
    constructor(title: string, items: string[]) {
        this.title = title
        this.items = items
    }
}

module.exports=[ new Data("Slider 1", ["1.1", "1.2", "1.3"]), 
new Data ("Slider 2", ["1.1", "1.2", "1.3", "1.4", "1.5", "1.6"])]