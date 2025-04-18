export interface Course{
    id: number;
    name: string;
    description: string;
    location: string;
    teacher: string;
    type: string;
    image: string | null;  
    date: Date;
    timeStart: string; 
    timeEnd: string;
    contactEmail: string;
    contactPhone: string;
}