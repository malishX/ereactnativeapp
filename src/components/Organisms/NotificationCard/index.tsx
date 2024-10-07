import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { getFontSize, scale } from "config/responsive";
import { NotificationButton } from "components/Atoms/NotificationButtons";
import { BaseStyle, font, FontFamily, Images, useTheme } from "config";
import ImageView from "components/Atoms/imageView";
import { NotificationType } from "config/notificationType";
import { NotificationListData } from "services/Responses/CouponList/GetNotificationListResponse";
import { timeDifference } from "utils/timeController";
import { useTranslation } from "react-i18next";

interface NotificationCardProps {
  notificationData: NotificationListData;
  userName: string;
  onDeclinePress(data: any): void;
  onAcceptPress(data: any): void;
  onCardClick(data: any,time: any): void;
}

const NotificationCard = ({
  notificationData,
  userName,
  onAcceptPress,
  onDeclinePress,
  onCardClick,
}: NotificationCardProps) => {
  const { colors } = useTheme();
  const baseStyles = BaseStyle();
  const { t } = useTranslation();
  let isDisabled = false;
  const time = timeDifference(
    new Date(),
    new Date(notificationData.updated_at)
  );

  console.log("TIMEING", time);

  const receivedCouponText = `${t("Hi")} ${userName}. ${t(
    "you_have_received_coupon_from"
  )} ${notificationData.text}.`; //"Hi John Doe. You have received a coupon from John doe2!";
  const transferredCouponText =
    "Your Promocode 'GJ0550' is successfully transferred to John doe2";
  const expiringCouponText = ""; //"Alert! Your Promocode 'GJ0550' is going to expire in 2 days. Use it now";

  const notificationText =
    notificationData.types == "1"
      ? receivedCouponText
      : notificationData.types == "2"
      ? expiringCouponText
      : notificationData.types == "3"
      ? (isDisabled = true) && ""
      : "";

  return (
    <TouchableOpacity
      style={{
        flex: 1,
        width: "100%",
        height: "100%",
        marginTop: scale(10),
      }}
      onPress={() => {
         onCardClick(notificationText,time);
      }}
      disabled={isDisabled}
    >
      <View
        style={{
          // height: 100,
          width: "100%",
          backgroundColor: colors.card,
          borderRadius: scale(10),
        }}
      >
        <View
          style={{
            flexDirection: "row",
            paddingHorizontal: scale(10),
            paddingTop: scale(10),
          }}
        >
          {/* <ImageView
            imageSource={Images.amazon}
            height={50}
            width={50}
            style={{ marginHorizontal: scale(5) }}
            sizeMode="contain"
            isSVG={false}
          /> */}
          <View
            style={{
              flex: 1,
              marginBottom: scale(10),
              // item.notificationType === NotificationType.TRANSFER_REQUEST
              //   ? scale(0)
              // : scale(10),
            }}
          >
            <Text
              style={{
                fontFamily: font(FontFamily.fontMedium),
                fontSize: getFontSize(12),
                ...baseStyles.textRTLStyle,
              }}
            >
              {notificationText}
            </Text>
            <Text
              style={{
                fontFamily: font(FontFamily.fontRegular),
                fontSize: getFontSize(10),
                ...baseStyles.textRTLStyle,
                color: "rgba(0,0,0,0.5)",
              }}
            >
              {time}
            </Text>
          </View>
        </View>

        {false && (
          <View
            style={{
              flexDirection: "row",
              width: "100%",
              padding: scale(10),
            }}
          >
            <NotificationButton
              title={"Decline"}
              color={colors.declinetButton}
              onPress={() => {}}
            />
            <NotificationButton
              title={"Accept"}
              color={colors.primary}
              onPress={() => {}}
            />
          </View>
        )}
      </View>
      {isDisabled && (
        <View
          style={{
            flex: 1,
            position: "absolute",
            backgroundColor: "rgba(0,0,0,0.4)",
            height: "100%",
            width: "100%",
            borderRadius: scale(10),
          }}
        />
      )}
    </TouchableOpacity>
  );
};

export default NotificationCard;
