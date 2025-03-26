export interface Course{
    id:number;
    name:string;
    location:string;
    teacher: string;
    image:string | null; //url
    date:Date;
    timeStart:string; 
}