import { PoLine } from './po-line';

export class Po {
    public PONum:string;
    public OrderDate:Date;
    public Invoice:string;
    public Currency:string;
    public SLineAmount:number;
    public POLines:PoLine[];
}
