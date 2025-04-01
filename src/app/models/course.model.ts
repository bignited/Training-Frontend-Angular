export interface Course{
    id: number;
    name: string;
    description: string;
    location: string;
    teacher: string;
    imageUrl: string | null;  
    date: Date;
    timeStart: string; 
    timeEnd: string;
}