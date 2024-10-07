export interface cartNew2Response {
    success: number,
    specification: string,
    data: Data
}

export interface Data {
    spotiiMin: number,
    orderMin: number,
    taxAmt: number,
    ccavenuepay: number,
    spotiipay: number
}
