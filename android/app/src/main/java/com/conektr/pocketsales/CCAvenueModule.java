// package com.conektr;

// import android.app.Activity;
// import android.content.Intent;
// import android.widget.Toast;

// import androidx.annotation.NonNull;

// import com.facebook.react.bridge.Callback;
// import com.facebook.react.bridge.ReactApplicationContext;
// import com.facebook.react.bridge.ReactContextBaseJavaModule;
// import com.facebook.react.bridge.ReactMethod;
// import com.facebook.react.bridge.ReadableMap;

// import mumbai.dev.sdkdubai.*;
// import mumbai.dev.sdkdubai.externalModel.*;


// public class CCAvenueModule extends ReactContextBaseJavaModule implements CustomModel.OnCustomStateListener{

//     private static ReactApplicationContext reactContext;
//     private static Callback payCallBack;

//     CCAvenueModule(ReactApplicationContext context){
//         super(context);
//         reactContext  = context;
//     }

//     @ReactMethod
//     public  void show(){
//         Toast.makeText(reactContext,"Hi From Android",Toast.LENGTH_LONG).show();
//     }

//     @ReactMethod
//     public void startPayment(ReadableMap map,Callback callback
//     ){
//         Activity currentActivity = getCurrentActivity();
//         payCallBack = callback;
//         CustomModel.getInstance().setListener(this);
//         MerchantDetails m = new MerchantDetails();
//         m.setAccess_code(map.getString("accessCode"));
//         m.setMerchant_id(map.getString("mId"));
//         m.setCurrency(map.getString("currency"));
//         m.setAmount(map.getString("amount"));
//         m.setRedirect_url(map.getString("redirect_url"));
//         m.setCancel_url(map.getString("cancel_url"));
//         m.setRsa_url(map.getString("rsa_url"));
//         m.setOrder_id(map.getString("order_id"));
//         m.setCustomer_id(map.getString("customer_id"));
//         m.setShow_addr(map.getBoolean("showAddress"));
//         m.setCCAvenue_promo(true);
//         m.setPromo_code(map.getString("promo"));
//         m.setEnv_type(map.getString("envType"));
//         m.setAdd1(map.getString("merchantParam1"));
//         m.setAdd2(map.getString("merchantParam2"));
//         m.setAdd3(map.getString("merchantParam3"));
//         m.setAdd4(map.getString("merchantParam4"));
//         m.setAdd5(map.getString("merchantParam5"));

//         BillingAddress b = new BillingAddress();
//         b.setName(map.getString("billing_name"));
//         b.setAddress(map.getString("billing_address"));
//         b.setCountry(map.getString("billing_country"));
//         b.setState(map.getString("billing_state"));
//         b.setCity(map.getString("billing_city"));
//         b.setTelephone(map.getString("billing_telephone"));
//         b.setEmail(map.getString("billing_email"));


//         ShippingAddress s = new ShippingAddress();
//         s.setName(map.getString("shipping_name"));
//         s.setAddress(map.getString("shipping_address"));
//         s.setCountry(map.getString("shipping_country"));
//         s.setState(map.getString("shipping_state"));
//         s.setCity(map.getString("shipping_city"));
//         s.setTelephone(map.getString("shipping_telephone"));


//         StandardInstructions si = new StandardInstructions();
//         si.setSi_type(map.getString("siType"));
//         si.setSi_mer_ref_no(map.getString("siRef"));
//         si.setSi_is_setup_amt(map.getString("siSetupAmount"));
//         si.setSi_amount(map.getString("siAmount"));
//         si.setSi_start_date(map.getString("siStartDate"));
//         si.setSi_frequency_type(map.getString("siFreqType"));
//         si.setSi_frequency(map.getString("siFreq"));
//         si.setSi_bill_cycle(map.getString("siBillCycle"));

//         Intent i = new Intent(currentActivity, PaymentOptions.class);
//         i.putExtra("merchant", m);
//         i.putExtra("billing", b);
//         i.putExtra("shipping", s);
//         i.putExtra("standard instructions", si);

//          currentActivity.startActivity(i);
//     }

//     @NonNull
//     @Override
//     public String getName() {
//         return "CCAvenueModule";
//     }

//     @Override
//     public void stateChanged() {
//         String modelState = CustomModel.getInstance().getState();
//         payCallBack.invoke(modelState);
//     }
// }