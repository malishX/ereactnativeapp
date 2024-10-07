export interface MyRewardResponse {
    success: number,
    specification: string,
    result: number,
    "data": MyRewardData[]
}

export interface MyRewardData {
    transaction_id: string,
    amount: string,
    comment: string,
    created_at: string
}