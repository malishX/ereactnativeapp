export interface CreditAutofillResponse {
    success: number,
    specification: string,
    data: CreditAutofillResult
}

export interface CreditAutofillResult {
    customer_id: number,
    outlet_name: string,
    person_name: string,
    person_title: string,
    person_details: string,
    emirate: string,
    trade_license_number: string,
    page1: string,
    page_2_content_1: string,
    page_1_terms: string,
    page_2_terms_1: string,
    page_2_terms_2: string,
    page_2_terms_3: string,
    page_2_content_2: string,
}
