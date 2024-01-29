import { EquipmentStock } from "./equipment_stock.model";
import { Reservation } from "./reservation,model";

export interface ReservationEquipmentStock{
    id:number,
    reservation:Reservation,
    equipmentStockDTO:EquipmentStock,
    amount:number
}