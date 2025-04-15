export interface Course{
    id: number;
    name: string;
    description: string;
    location: string;
    teacher: string;
    image: string | null;  
    date: Date;
    timeStart: string; 
    timeEnd: string;
}