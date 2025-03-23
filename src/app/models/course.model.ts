export interface Course{
    id:number | null;
    name:string;
    location:string;
    teacher: string;
    image:string | null; //url
    date:Date | null;
    timeStart:string; 
}