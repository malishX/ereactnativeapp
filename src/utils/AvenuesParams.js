export const AvenuesParams = {
  COMMAND: "command",
  ACCESS_CODE: "access_code",
  MERCHANT_ID: "merchant_id",
  ORDER_ID: "order_id",
  AMOUNT: "amount",
  CURRENCY: "currency",
  REDIRECT_URL: "redirect_url",
  CANCEL_URL: "cancel_url",
  LANGUAGE: "language",
  BILLING_NAME: "billing_name",
  BILLING_ADDRESS: "billing_address",
  BILLING_CITY: "billing_city",
  BILLING_STATE: "billing_state",
  BILLING_ZIP: "billing_zip",
  BILLING_COUNTRY: "billing_country",
  BILLING_TEL: "billing_tel",
  BILLING_EMAIL: "billing_email",
  DELIVERY_NAME: "delivery_name",
  DELIVERY_ADDRESS: "delivery_address",
  DELIVERY_CITY: "delivery_city",
  DELIVERY_STATE: "delivery_state",
  DELIVERY_ZIP: "delivery_zip",
  DELIVERY_COUNTRY: "delivery_country",
  DELIVERY_TEL: "delivery_tel",
  MERCHANT_PARAM1: "merchant_param1",
  MERCHANT_PARAM2: "merchant_param2",
  MERCHANT_PARAM3: "merchant_param3",
  MERCHANT_PARAM4: "merchant_param4",
  MERCHANT_PARAM5: "merchant_param5",
  PAYMENT_OPTION: "payment_option",
  CARD_TYPE: "card_type",
  CARD_NAME: "card_name",
  DATA_ACCEPTED_AT: "data_accept",
  CARD_NUMBER: "card_number",
  EXPIRY_MONTH: "expiry_month",
  EXPIRY_YEAR: "expiry_year",
  CVV: "cvv_number",
  ISSUING_BANK: "issuing_bank",
  ENC_VAL: "enc_val",
  RSA_KEY_URL: "rsa_key_url",
  CUSTOMER_IDENTIFIER: "customer_identifier",
  SAVE_CARD: "saveCard",
  EMI_PLAN_ID: "emi_plan_id",
  EMI_TENURE_ID: "emi_tenure_id",
  RESP_TYPE: "response_type",
  PROMO_CODE: "promo_code",

  SI_TYPE: "si_type",
  SI_REF_NO: "si_mer_ref_no",
  SI_SETUP_AMT: "si_is_setup_amt",
  SI_AMT: "si_amount",
  SI_START_DATE: "si_start_date",
  SI_FREQ_TYPE: "si_frequency_type",
  SI_FREQ: "si_frequency",
  SI_BILL_CYCLE: "si_bill_cycle",

  BILL: 'Bill',
  SHIP: 'Ship',
  PROMO: 'Promo'
}

export const Constants = {
  PARAMETER_SEP: "&",
  PARAMETER_EQUALS: "=",
  JSON_URL: "https://securetest.ccavenue.ae/transaction/transaction.do",
  TRANS_URL: "https://securetest.ccavenue.ae/transaction/initTrans",
  SETTING_URL: "https://securetest.ccavenue.ae/transaction/appapi.do?command=getMerchantSetting",
  Discount_Url: "https://securetest.ccavenue.ae/transaction/appapi.do?command=getDiscountApply",
  PromotionList_URL: "https://securetest.ccavenue.ae/transaction/appapi.do?command=getPromotionsListingSDK",
  ApplyPromoCode_URL: "https://securetest.ccavenue.ae/transaction/appapi.do?command=getPromotionsApply",
  ColorThemeURL: "https://login.ccavenue.ae/appapi",
  //https://secure.ccavenue.ae/transaction/appapi.do?command=getMerchantSetting
  VAULT: "",
  BILLING: "",
  SHIPPING: "",
  PROMOTION: "",
  DISCOUNT: "",
  SAVECARD: "saveCard",
  DEBITCREDITCARD: "DebitCreditCard",
  UNIONPAY: "UnionPay"
  // TESTC1
}

export const MerchantParams = {

  currency: 'AED',
  amount: '1000.00',
  // live 
  access_code: 'AVIW03HC39BT24WITB',  //'AVBW03HH54CM75WBMC'
  merchant_id: '46535', //'43273',
  customer_identifier: 'qwe',
  redirect_url: 'https://www.uae.conektr.com/b2c/ccAvenueResponseHandler.php',
  cancel_url: 'https://www.uae.conektr.com/checkout/onepage/failure',
  rsa_url: 'https://www.uae.conektr.com/b2c/generatekey.php',
  // staging 
  // access_code_stg: 'AVRW03HC39BT25WRTB',  //'AVBW03HH54CM75WBMC'
  // merchant_id_stg: '46535', //'43273',
  // customer_identifier_stg: 'qwe',
  // redirect_url_stg: 'https://www.uae.conektr.com/b2c/ccAvenueResponseHandler.php',
  // cancel_url_stg:'http://122.182.6.212:8080/MobPHPKit/dubai/ccav_resp_64780.php', 
  // rsa_url_stg:'https://www.uae.conektr.com/b2c/generatekey.php',
  //   // test 
  //   access_code_test: 'AVPW02GI29BV34WPVB',  //'AVBW03HH54CM75WBMC'
  //   merchant_id_test: '45990', //'43273',
  //   // customer_identifier_test: 'qwe',
  //   redirect_url_test: 'https://www.uae.conektr.com/b2c/ccAvenueResponseHandler.php',
  //   cancel_url_test:"https://www.uae.conektr.com/checkout/onepage/failure", 
  //   rsa_url_test: "https://www.uae.conektr.com/b2c/generatekey.php",

}

export const InitialParams = {

  BILLING_NAME: "Charli",
  BILLING_ADDRESS: "Room no 1101 near Railway station Ambad",
  BILLING_CITY: "Indore",
  BILLING_STATE: "Maharashtra",
  BILLING_COUNTRY: "India",
  BILLING_TEL: "9595226054",
  BILLING_EMAIL: "paras.gangwal@avenues.info",

  DELIVERY_NAME: "Charli",
  DELIVERY_ADDRESS: "Room no 1101 near Railway station Ambad",
  DELIVERY_CITY: "Indore",
  DELIVERY_STATE: "Maharashtra",
  DELIVERY_COUNTRY: "India",
  DELIVERY_TEL: "9595226054",

  MERCHANT_PARAM1: "test1",
  MERCHANT_PARAM2: "test2",
  MERCHANT_PARAM3: "test3",
  MERCHANT_PARAM4: "test4",
  MERCHANT_PARAM5: "test5",
}

export const CardPattern = {
  visa: /^4[0-9]{2,12}(?:[0-9]{3})?$/,
  master: /^(5[1-5][0-9]{14}|2(22[1-9][0-9]{12}|2[3-9][0-9]{13}|[3-6][0-9]{14}|7[0-1][0-9]{13}|720[0-9]{12}))$/,
  amex: /^3[47][0-9]{1,13}$/,
  discover: /^6(?:011|5[0-9]{2})[0-9]{1,12}$/,
  dinersclub: /^3(?:0[0-5]|[68][0-9])[0-9]{1,11}$/,
  jcb: /^35[0-9]{1,14}$/
}
export const TextPattern = {
  mobile: /^[5-9][0-9]{9}$/,
  name: /^[a-zA-Z][a-zA-Z\s]*$/,
  email: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  pincode: /^[1-9][0-9]{5}$/,
  address: /^[a-zA-Z0-9\s,\/.#()-]+$/,
  onlyNumbers: /^[0-9]*$/
}

export const CardName = {
  visa: "VISA",
  master: "MasterCard",
  amex: "American Express",
  discover: "Discover",
  dinersclub: "Diners Club",
  jcb: "JCB",
}