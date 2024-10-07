export interface storePickupSlotResponse {
    success: number;
    specification: string;
    data: CalenderData[]
}

export interface CalenderData {
    day: string,
    slots: any[]
}

