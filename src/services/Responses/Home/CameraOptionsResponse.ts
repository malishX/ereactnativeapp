export interface CameraOptionsResponse {
    success: number;
    specification: string;
    data: CameraOptionsData
}

export interface CameraOptionsData {
    rewards: number,
    options: CameraOptions[],
    options_categories: CameraOptions[]
}

export interface CameraOptions {
    label: string;
    key: string;
    image: string;
    status: number;
}
