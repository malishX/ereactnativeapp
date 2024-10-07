import React, { useState } from 'react';
import CCAVENUE from './CCAvnueModule';
import { View, Text, Button, Platform, TouchableOpacity, TextInput, KeyboardAvoidingView, ScrollView, SafeAreaView, Modal, ActivityIndicator, Dimensions, NativeModules } from 'react-native';
// import CheckBox from '@react-native-community/checkbox';
// import { MerchantParams, Constants, InitialParams } from '../../Utils';
import { AvenuesParams, Constants, MerchantParams, InitialParams, CardPattern } from '../../../utils';
import { Dropdown } from 'react-native-element-dropdown';
import Radio from './Cart/appRadio';
import moment from 'moment';
const { width, height } = Dimensions.get("screen");
const { CCAvenueModule } = NativeModules;

function HomeScreen({ navigation }) {

  var num = Math.floor(Math.random() * 9999999) + 1;
  const [isProgress, setDialog] = useState(false);
  const [accessCode, setAccessCode] = useState(MerchantParams.access_code);
  const [merchantId, setMerchantId] = useState(MerchantParams.merchant_id);
  const [orderId, setOrderId] = useState(num.toString());
  const [currency, setCurrency] = useState(MerchantParams.currency);
  const [amount, setAmount] = useState(MerchantParams.amount);
  const [redirectUrl, setRedirectUrl] = useState(MerchantParams.redirect_url);
  const [cancelUrl, setCancelUrl] = useState(MerchantParams.cancel_url);
  const [rsaUrl, setRsaUrl] = useState(MerchantParams.rsa_url);
  const [customerId, setCustomerId] = useState(MerchantParams.customer_identifier);
  const [promoCode, setPromoCode] = useState('');
  const [merchantParam1, setMerchantParam1] = useState(InitialParams.MERCHANT_PARAM1);
  const [merchantParam2, setMerchantParam2] = useState(InitialParams.MERCHANT_PARAM2);
  const [merchantParam3, setMerchantParam3] = useState(InitialParams.MERCHANT_PARAM3);
  const [merchantParam4, setMerchantParam4] = useState(InitialParams.MERCHANT_PARAM4);
  const [merchantParam5, setMerchantParam5] = useState(InitialParams.MERCHANT_PARAM5);

  const [billingName, setBillingName] = useState(InitialParams.BILLING_NAME);
  const [billingAddress, setBillingAddress] = useState(InitialParams.BILLING_ADDRESS);
  const [billingCity, setBillingCity] = useState(InitialParams.BILLING_CITY);
  const [billingCountry, setBillingCountry] = useState(InitialParams.BILLING_COUNTRY);
  const [billingState, setBillingState] = useState(InitialParams.BILLING_STATE);
  const [billingTelephone, setBillingTelephone] = useState(InitialParams.BILLING_TEL);
  const [billingEmail, setBillingEmail] = useState(InitialParams.BILLING_EMAIL);

  const [shippingName, setShippingName] = useState(InitialParams.DELIVERY_NAME);
  const [shippingAddress, setShippingAddress] = useState(InitialParams.DELIVERY_ADDRESS);
  const [shippingCity, setShippingCity] = useState(InitialParams.DELIVERY_CITY);
  const [shippingCountry, setShippingCountry] = useState(InitialParams.DELIVERY_COUNTRY);
  const [shippingState, setShippingState] = useState(InitialParams.DELIVERY_STATE);
  const [shippingTelephone, setShippingTelephone] = useState(InitialParams.DELIVERY_TEL);

  const [siRefNo, setSiRefNo] = useState('');
  const [siAmount, setSiAmount] = useState('');
  const [siFreq, setSiFreq] = useState('');
  const [siBillCycle, setSiBillCycle] = useState('');
  const [siDate, setSiDate] = useState('');

  const [value, setValue] = useState('2');
  const [isFocus, setIsFocus] = useState(false);

  const [siType, setSiStype] = useState(2);
  const [siAmountSetup, setSiAmountSetup] = useState(0);
  const [siRreqType, setSiFreqType] = useState(0);

  const [isShowAddress, setIsShowAddress] = useState(true);

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
    //console.log(" iam clicked")
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {

    console.log("A date has been picked: ", moment.format(date, "dd-MM-yyyy"));

    hideDatePicker();
    var now = new Date().get;
    setSiDate(moment.format(date, "dd-MM-yyyy"));
  };

  const renderLabel = () => {
    if (value || isFocus) {
      return (
        <Text
        // style={[styles.label, isFocus && { color: 'blue' }]}
        >
          Select Environment
        </Text>
      );
    }
    return null;
  };

  const data = [
    { label: 'TEST', value: '1' },
    { label: 'LIVE', value: '2' },
    { label: 'STAGING', value: '3' }
  ];

  const getEnvValue = () => {
    if (Platform.OS === "android") {
      if (value == '1') {
        return 'TEST'
      }
      if (value == '2') {
        return 'LIVE'
      }
      if (value == '3') {
        return 'STAGING'
      }
    } else {
      if (value == '1') {
        return 'QA'
      }
      if (value == '2') {
        return 'live'
      }
      if (value == '3') {
        return 'staging'
      }
    }

  }
  const siTypeName = () => {
    if (Platform.OS == "android") {
      return siType == 0
        ? "FIXED"
        : siType == 1
          ? "ONDEMAND"
          : "";
    } else {
      return siType == 0
        ? "FIXED"
        : siType == 1
          ? "ONDEMAND"
          : "";
    }
  }

  const siAmountSetupName = () => {
    return siAmountSetup == 0 ? "Y" : "N";
  }
  const siFreqTypeName = () => {
    if (siType == 1) {
      return ""
    }
    if (Platform.OS == "android") {
      return siRreqType == 0
        ? "days"
        : siRreqType == 1
          ? "month"
          : "year";
    } else {
      return siRreqType == 0
        ? "days"
        : siRreqType == 1
          ? "month"
          : "year";
    }
  }

  const sendToPaymentOptionScreen = () => {
    if (accessCode === '') {
      alert('Please enter access code.');
    } else if (merchantId === '') {
      alert('Please enter Merchant id.');
    } else if (currency === '') {
      alert('Please enter currency.');
    } else if (amount === '') {
      alert('Please enter amount.');
    } else if (parseInt(amount) === 0) {
      alert('Please enter amount greater then 0.');
    } else if (redirectUrl === '') {
      alert('Please enter redirect URL.');
    } else if (cancelUrl === '') {
      alert('Please enter cancel URL.');
    } else if (rsaUrl === '') {
      alert('Please enter RSA URL.');
    }

    else {
      if (siType != 2) {
        if (siDate === '') {
          alert('Please enter si start date.');
          return;
        } else if (siAmount === '' && siType == 0) {
          alert('Please enter si Amount');
          return;
        } else if (siFreq === '' && siType == 0) {
          alert('Please enter si Frq');
          return;
        } else if (siBillCycle === '' && siType == 0) {
          alert('Please enter si bill cycle');
          return;
        }
      }
      const payData = {
        'mId': merchantId,
        'accessCode': accessCode,
        'currency': currency,
        'amount': amount,
        'redirect_url': redirectUrl,
        'cancel_url': cancelUrl,
        'rsa_url': rsaUrl,
        'order_id': orderId,
        'customer_id': customerId,
        'promo': promoCode,
        'merchantParam1': merchantParam1,
        'merchantParam2': merchantParam2,
        'merchantParam3': merchantParam3,
        'merchantParam4': merchantParam4,
        'merchantParam5': merchantParam5,
        'envType': getEnvValue(),
        'billing_name': billingName,
        'billing_address': billingAddress,
        'billing_country': billingCountry,
        'billing_state': billingState,
        'billing_city': billingCity,
        'billing_telephone': billingTelephone,
        'billing_email': billingEmail,
        'shipping_name': shippingName,
        'shipping_address': shippingAddress,
        'shipping_country': shippingCountry,
        'shipping_state': shippingState,
        'shipping_city': shippingCity,
        'shipping_telephone': shippingTelephone,
        'siType': siTypeName(),
        'siRef': siRefNo,
        'siSetupAmount': siAmountSetupName(),
        'siAmount': siAmount,
        'siStartDate': siDate,
        'siFreqType': siFreqTypeName(),
        'siFreq': siFreq,
        'siBillCycle': siBillCycle,
        'showAddress': isShowAddress
      }

      console.log("pay Data is ", payData)

      CCAvenueModule.startPayment(payData,
        // (response) => console.log("call ccavenue module", response))
        (response) => {
          navigation.navigate('PaymentStatus', { data: response })
        }
      );
    }
  }

  const setEnvValue = (value) => {
    switch (value) {
      case '1':
        setAccessCode(MerchantParams.access_code_test)
        setMerchantId(MerchantParams.merchant_id_test)
        setRsaUrl(MerchantParams.rsa_url_test)
        setRedirectUrl(MerchantParams.redirect_url_test)
        setCancelUrl(MerchantParams.cancel_url_test)
        break;
      case '2':
        setAccessCode(MerchantParams.access_code)
        setMerchantId(MerchantParams.merchant_id)
        setRsaUrl(MerchantParams.rsa_url)
        setRedirectUrl(MerchantParams.redirect_url)
        setCancelUrl(MerchantParams.cancel_url)
        break;
      case '3':
        setAccessCode(MerchantParams.access_code_stg)
        setMerchantId(MerchantParams.merchant_id_stg)
        setRsaUrl(MerchantParams.rsa_url_stg)
        setRedirectUrl(MerchantParams.redirect_url_stg)
        setCancelUrl(MerchantParams.cancel_url_stg)
        break;

      default:
        setAccessCode(MerchantParams.access_code_test)
        setMerchantId(MerchantParams.merchant_id_test)
        setRsaUrl(MerchantParams.rsa_url_test)
        setRedirectUrl(MerchantParams.redirect_url_test)
        setCancelUrl(MerchantParams.cancel_url_test)
    }
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        keyboardShouldPersistTaps="handled">
        <KeyboardAvoidingView
        // style={styles.center}
        //behavior={Platform.OS === "ios" ? "padding" : Dimensions.get('window').height}
        >
          <Text
          // style={styles.headerText}
          >
            MERCHANT DETAILS</Text>
          {/* <View style={styles.divider} /> */}
          <View
          // style={{ ...styles.container, width: width / 1.2 }}
          >
            {renderLabel()}
            <Dropdown
              // style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
              // placeholderStyle={styles.placeholderStyle}
              // selectedTextStyle={styles.selectedTextStyle}
              // inputSearchStyle={styles.inputSearchStyle}
              // iconStyle={styles.iconStyle}
              data={data}
              //search
              maxHeight={180}
              labelField="label"
              valueField="value"
              // placeholder={!isFocus ? 'Select item' : '...'}
              searchPlaceholder="Search..."
              value={value}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={item => {
                setValue(item.value);
                setIsFocus(false);
                setEnvValue(item.value);
              }}
            />
          </View>
          <View
          // style={styles.inputContainer}
          >
            <Text>Access Code</Text>
            <TextInput
              placeholder="Access Code"
              // style={styles.input}
              value={accessCode}
              onChangeText={text => setAccessCode(text)}
            />
          </View>
          <View
          // style={styles.inputContainer}
          >
            <Text>Merchant Id</Text>
            <TextInput
              // style={styles.input}
              placeholder="Merchant Id"
              value={merchantId}
              onChangeText={text => setMerchantId(text)}
            />
          </View>
          <View
          // style={styles.inputContainer}
          >
            <Text>Order Id</Text>
            <TextInput
              placeholder="Order Id"
              // style={styles.input}
              value={orderId}
              onChangeText={text => setOrderId(text)}

            /></View>

          <View
          // style={styles.inputContainer}
          >
            <Text>Currency</Text>
            <TextInput
              placeholder="Currency"
              // style={styles.input}
              value={currency}
              onChangeText={text => setCurrency(text)}

            /></View>
          <View
          // style={styles.inputContainer}
          >
            <Text>Amount</Text>
            <TextInput
              // style={styles.input}
              placeholder="Amount"
              value={amount}
              onChangeText={text => setAmount(text)}

            /></View>
          <View
          // style={styles.inputContainer}
          >
            <Text>Redirect url</Text>
            <TextInput
              // style={styles.input}
              placeholder="Redirect url"
              value={redirectUrl}
              onChangeText={text => setRedirectUrl(text)}

            /></View>
          <View
          // style={styles.inputContainer}
          >
            <Text>Cancel url</Text>
            <TextInput
              // style={styles.input}
              placeholder="Cancel url"
              value={cancelUrl}
              onChangeText={text => setCancelUrl(text)}

            /></View>
          <View
          // style={styles.inputContainer}
          >
            <Text>RSA url</Text>
            <TextInput
              // style={styles.input}
              placeholder="RSA url"
              value={rsaUrl}
              onChangeText={text => setRsaUrl(text)}

            />
          </View>
          <View
          // style={styles.inputContainer}
          >
            <Text>Customer id</Text>
            <TextInput
              // style={styles.input}
              placeholder="Customer id"
              value={customerId}
              onChangeText={text => setCustomerId(text)}

            /></View>

          <View
          // style={styles.inputContainer}
          >
            <Text>Promo code</Text>
            <TextInput
              // style={styles.input}
              placeholder="Promo code"
              value={promoCode}
              onChangeText={text => setPromoCode(text)}

            />
          </View>
          <View
          // style={styles.inputContainer}
          >
            <Text>Merchant Param1</Text>
            <TextInput
              // style={styles.input}
              placeholder="Merchant Param1"
              value={merchantParam1}
              onChangeText={text => setMerchantParam1(text)}

            />
          </View>
          <View
          // style={styles.inputContainer}
          >
            <Text>Merchant Param2</Text>
            <TextInput
              // style={styles.input}
              placeholder="Merchant Param2"
              value={merchantParam2}
              onChangeText={text => setMerchantParam2(text)}

            /></View>
          <View
          // style={styles.inputContainer}
          >
            <Text>Merchant Param3</Text>
            <TextInput
              // style={styles.input}
              placeholder="Merchant Param3"
              value={merchantParam3}
              onChangeText={text => setMerchantParam3(text)}

            /></View>
          <View
          // style={styles.inputContainer}
          >
            <Text>Merchant Param4</Text>
            <TextInput
              // style={styles.input}
              placeholder="Merchant Param4"
              value={merchantParam4}
              onChangeText={text => setMerchantParam4(text)}

            /></View>
          <View
          // style={styles.inputContainer}
          >
            <Text>Merchant Param5</Text>
            <TextInput
              // style={styles.input}
              placeholder="Merchant Param5"
              value={merchantParam5}
              onChangeText={text => setMerchantParam5(text)}

            /></View>
          <Text
          // style={styles.headerText}
          >BILLING ADDRESS</Text>
          {/* <View style={styles.divider} /> */}

          <View
          // style={styles.inputContainer}
          >
            <Text>Name</Text>
            <TextInput
              // style={styles.input}
              placeholder="Name"
              value={billingName}
              onChangeText={text => setBillingName(text)}

            /></View>
          <View
          // style={styles.inputContainer}
          >
            <Text>Address</Text>
            <TextInput
              // style={styles.input}
              placeholder="Address"
              value={billingAddress}
              onChangeText={text => setBillingAddress(text)}

            /></View>
          <View
          // style={styles.inputContainer}
          >
            <Text>City</Text>
            <TextInput
              // style={styles.input}
              placeholder="City"
              value={billingCity}
              onChangeText={text => setBillingCity(text)}

            /></View>
          <View
          // style={styles.inputContainer}
          >
            <Text>State</Text>
            <TextInput
              // style={styles.input}
              placeholder="State"
              value={billingState}
              onChangeText={text => setBillingState(text)}

            /></View>
          <View
          // style={styles.inputContainer}
          >
            <Text>Country</Text>
            <TextInput
              // style={styles.input}
              placeholder="Country"
              value={billingCountry}
              onChangeText={text => setBillingCountry(text)}

            /></View>
          <View
          // style={styles.inputContainer}
          >
            <Text>Telephone</Text>
            <TextInput
              // style={styles.input}
              placeholder="Telephone"
              value={billingTelephone}
              onChangeText={text => setBillingTelephone(text)}

            /></View>
          <View
          // style={styles.inputContainer}
          >
            <Text>Email</Text>
            <TextInput
              // style={styles.input}
              placeholder="Email"
              value={billingEmail}
              onChangeText={text => setBillingEmail(text)}

            /></View>
          <Text
          // style={styles.headerText}
          >SHIPPING ADDRESS</Text>
          {/* <View style={styles.divider} /> */}

          <View
          // style={styles.inputContainer}
          >
            <Text>Name</Text>
            <TextInput
              // style={styles.input}
              placeholder="Name"
              value={shippingName}
              onChangeText={text => setShippingName(text)}

            /></View>
          <View
          // style={styles.inputContainer}
          >
            <Text>Address</Text>
            <TextInput
              // style={styles.input}
              placeholder="Address"
              value={shippingAddress}
              onChangeText={text => setShippingAddress(text)}

            /></View>
          <View
          // style={styles.inputContainer}
          >
            <Text>City</Text>
            <TextInput
              // style={styles.input}
              placeholder="City"
              value={shippingCity}
              onChangeText={text => setShippingCity(text)}

            /></View>
          <View
          // style={styles.inputContainer}
          >
            <Text>State</Text>
            <TextInput
              // style={styles.input}
              placeholder="State"
              value={shippingState}
              onChangeText={text => setShippingState(text)}

            /></View>
          <View
          // style={styles.inputContainer}
          >
            <Text>Country</Text>
            <TextInput
              // style={styles.input}
              placeholder="Country"
              value={shippingCountry}
              onChangeText={text => setShippingCountry(text)}

            /></View>
          <View
          // style={styles.inputContainer}
          >
            <Text>Telephone</Text>
            <TextInput
              // style={styles.input}
              placeholder="Telephone"
              value={shippingTelephone}
              onChangeText={text => setShippingTelephone(text)}

            />
          </View>
          <Text
          // style={styles.headerText}
          >Standard Instructions</Text>
          {/* <View style={styles.divider} /> */}
          <View
          // style={styles.radioContainer}
          >
            <Text>Si Type :</Text>
            <Radio
              list={["Fixed", "On Demand", "None"]}
              default={2}
              onChange={(value) => {
                console.log("selcted value is " + value);
                setSiStype(value)
              }}
            ></Radio>
          </View>
          {siType == 0 || siType == 1 ? <View>
            <View
            // style={styles.inputContainer}
            >
              <Text>Ref No. (Optional)</Text>
              <TextInput
                // style={styles.input}
                placeholder="Ref No."
                value={siRefNo}
                onChangeText={text => setSiRefNo(text)}

              />
            </View>
            <View
            // style={styles.radioContainer}
            >
              <Text>Setup Amt. (Y/N) :</Text>
              <Radio
                list={["Yes", "No"]}
                default={0}
                onChange={(value) => {
                  console.log("selcted value is " + value);
                  setSiAmountSetup(value)
                }}
              ></Radio>
            </View>
            {siType == 0 ? <View
            // style={styles.inputContainer}
            >
              <Text>Amount</Text>
              <TextInput
                // style={styles.input}
                placeholder="Amount"
                keyboardType='number-pad'
                value={siAmount}
                onChangeText={text => setSiAmount(text)}
              />
            </View> : <View />}
            {/* <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="date"
              minimumDate={new Date()}
              display={Platform.OS === 'ios' ? 'inline' : 'default'}
              onConfirm={handleConfirm}
              onCancel={hideDatePicker}
            /> */}
            <View
            // style={styles.inputContainer}
            >
              <Text>Start Date</Text>
              <TouchableOpacity
                onPress={showDatePicker}
              >

                <View
                // style={{ ...styles.input, color: 'black' }}
                // placeholder="DD/MM/YYYY"
                // editable={false}
                // selectTextOnFocus={false}
                // value={siDate}

                // onChangeText={text => setSiDate(text)}
                >
                  <Text
                  // style={{ color: 'black' }}
                  >{siDate}</Text>
                </View>
              </TouchableOpacity>

            </View>
            {siType == 0 ? <View>
              <View
              // style={styles.radioContainer}
              >
                <Text>Freq. Type :</Text>
                <Radio
                  list={["Days", "Month", "Year"]}
                  default={0}
                  onChange={(value) => {
                    console.log("selcted value is " + value);
                    setSiFreqType(value)
                  }}
                ></Radio>
              </View>
              <View
              // style={styles.inputContainer}
              >
                <Text>SI Freq.</Text>
                <TextInput
                  // style={styles.input}
                  keyboardType='number-pad'
                  placeholder=""
                  value={siFreq}
                  onChangeText={text => setSiFreq(text)}
                />
              </View>
              <View
              // style={styles.inputContainer}
              >
                <Text>SI Bill Cycle.</Text>
                <TextInput
                  // style={styles.input}
                  keyboardType='number-pad'
                  placeholder=""
                  value={siBillCycle}
                  onChangeText={text => setSiBillCycle(text)}
                />
              </View>
            </View> : <View />}
          </View> : <View />}
          <Text
          // style={styles.headerText}
          >Show Address</Text>
          <View
          // style={styles.divider} 
          />
          <View
          // style={styles.radioContainer}
          >
            <Text>Show Address :</Text>
            <Radio
              list={["YES", "NO"]}
              default={0}
              onChange={(value) => {
                console.log("selcted show address value is " + value);
                if (value == 0) {
                  setIsShowAddress(true)
                } else {
                  setIsShowAddress(false)
                }

              }}
            ></Radio>
          </View>
          <TouchableOpacity
            // style={styles.button} 
            onPress={() => {
              sendToPaymentOptionScreen()
            }

            }>
            <Text
            // style={styles.androidButtonText}
            >Pay</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
};


export default HomeScreen;
