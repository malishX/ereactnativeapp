export interface RewardPointsCasesResponse {
    success: number,
    specification: string,
    data: Data
}

export interface Data {
    spending_style: string,
    spend_points: string,
    monetary_step: string,
    spend_min_points: string,
    spend_max_points: string,
    can_use_reward: boolean
}
