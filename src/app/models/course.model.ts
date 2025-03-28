export interface Course{
    id:number;
    name:string;
    location:string;
    teacher: string;
    imageUrl:string | null; //url
    date:Date;
    timeStart:string; 
    timeEnd:string;
}