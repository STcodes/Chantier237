import {
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableHighlight,
} from "react-native";
import React, { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";

const DatePicker = (props) => {
  const { defaultDate, onDateChange } = props;

  const [date, setDate] = useState(new Date(defaultDate));
  const [show, setShow] = useState(false);

  const onChange = (e, selectedDate) => {
    setDate(new Date(selectedDate));
  };

  const onAndroidChange = (e, selectedDate) => {
    setShow(false);
    if (selectedDate) {
      setDate(new Date(selectedDate));
    }
  };

  const onCancelPress = () => {
    setDate(new Date(date));
    setShow(false);
  };
  const onDonePress = () => {
    onDateChange(date);
    setShow(false);
  };

  const renderDatePicker = () => {
    return (
      <>
        <DateTimePicker
          display={Platform.OS === "ios" ? "spinner" : "default"}
          timeZoneOffsetInMinutes={0}
          value={new Date(date)}
          mode="date"
          minimumDate={new Date(1920, 10, 20)}
          maximumDate={new Date()}
          onChange={Platform.OS === "ios" ? onChange : onAndroidChange}
          style={{ backgroundColor: "black", color: "white" }}
        />
      </>
    );
  };

  return (
    <Pressable
      style={styles.box}
      onPress={() => setShow(true)}
      activeOpacity={0}
    >
      <View style={styles.box1}>
        <Text style={styles.txt}>{`${date.getDate()} - ${
          date.getMonth() + 1
        } - ${date.getFullYear()}
        `}</Text>
        {Platform.OS !== "ios" && show && renderDatePicker()}

        {Platform.OS === "ios" && (
          <Modal
            transparent={true}
            animationType="slide"
            visible={show}
            supportedOrientations={["portrait"]}
            onRequestClose={() => setShow(!show)}
          >
            <View style={styles.screen}>
              <TouchableHighlight
                underlayColor={"#FFF"}
                style={styles.pickerContainer}
              >
                <View style={{ backgroundColor: "#fff" }}>
                  <View style={{ marginTop: 20 }}>{renderDatePicker()}</View>
                  <TouchableHighlight
                    underlayColor={"transparent"}
                    onPress={onCancelPress}
                    style={[styles.btnText, styles.btnCancel]}
                  >
                    <Text style={{ fontSize: 18, color: "white" }}>
                      Annuler
                    </Text>
                  </TouchableHighlight>
                  <TouchableHighlight
                    underlayColor={"transparent"}
                    onPress={onDonePress}
                    style={[styles.btnText, styles.btnDone]}
                  >
                    <Text style={{ fontSize: 18, color: "white" }}>Ok</Text>
                  </TouchableHighlight>
                </View>
              </TouchableHighlight>
            </View>
          </Modal>
        )}
      </View>
    </Pressable>
  );
};

export default DatePicker;

const styles = StyleSheet.create({
  pickerContainer: {
    backgroundColor: "#fff",
    width: "100%",
    height: "20%",
    position: "absolute",
    bottom: 20,
  },
  box1: {
    width: "100%",
  },
  box: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    height: 45,
    paddingVertical: 10,
    backgroundColor: "white",
    marginVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    borderColor: "black",
    borderWidth: 0.5,
  },
  txt: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  screen: {
    flex: 1,
  },
  btnText: {
    position: "absolute",
    top: 20,
    height: 50,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  btnCancel: {
    left: 0,
  },
  btnDone: {
    right: 0,
  },
  textDate: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
});
