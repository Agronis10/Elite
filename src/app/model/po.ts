import { PoLine } from './po-line';

export class Po {
    public PONum:string;
    public OrderDate:Date;
    public SuppInvoice:string;
    public CurrencyName:string;
    public SLineAmount:number;
    public lines:PoLine[];
}
