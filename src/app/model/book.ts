export class Book {
    public author:string;
    public cityId:number;
    public companyId:number;
    public countryId: number;
    public description: string;
    public formaId:number;
    public id:number;
    public isbn:string;
    public pages:number;
    public price:number;
    public title:number

    constructor(author:string,
        cityId:number,
        companyId:number,
        countryId: number,
        description: string,
        formaId:number,
        id:number,
        isbn:string,
        pages:number,
        price:number,
        title:number) {
            this.author = author;
            this.cityId = cityId;
            this.companyId = companyId;
            this.countryId = countryId;
            this.description = description;
            this.formaId = formaId;
            this.id = id;
            this.isbn = isbn;
            this.pages = pages;
            this.price =price;
            this.title = title;
    }

}