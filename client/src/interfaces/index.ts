export interface IPropertyItem{
    id?:string;
    address:string;
    category:string;
    price:number;
    image:string;
    buyerID?:number;
}
export interface querySearch{
    query:string;
    category:string[];
}
export interface ISearchBoxProps {
    onSearch: (query: querySearch) => void; 
    userName?:string;
}

