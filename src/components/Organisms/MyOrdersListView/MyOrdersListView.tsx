import React from "react";
import { FlatList, Platform, StyleSheet, UIManager, View } from "react-native";
import { OrderListResult } from "../../../services/Responses/Home/GetOrderListResponse";
import ExpanbleListView from "../../Modals/ExpandableListView";

if (Platform.OS === "android") {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

interface MyOrderListViewProps {
  orderListData: OrderListResult[];
  onEndReached(): void;
  onCancelClick(orderId: string): void;
  onReOrderClick(orderId: string): void;
  onTrackOrderClick(orderId: string): void;
  onPayByCardClick(): void;
}

export default function MyOrderListView({
  orderListData,
  onEndReached,
  onCancelClick,
  onPayByCardClick,
  onReOrderClick,
  onTrackOrderClick,
}: MyOrderListViewProps) {
  console.log("orderListData", orderListData);

  return (
    <View style={styles.container}>
      <FlatList
        data={orderListData}
        renderItem={({ item }) => {
          return (
            <ExpanbleListView
              data={item}
              onCancelClick={onCancelClick}
              onPayByCardClick={onPayByCardClick}
              onReOrderClick={onReOrderClick}
              onTrackOrderClick={onTrackOrderClick}
            />
          );
        }}
        onEndReached={onEndReached}
        showsVerticalScrollIndicator={false}
      />
      {/* <ExpanbleListView /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    // padding: 50,
  },
});
