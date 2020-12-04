import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  Button,
  SafeAreaView,
  FlatList,
} from "react-native";
import "react-native-gesture-handler";
import axios from "axios";

const apiBaseURL = "https://zipcloud.ibsnet.co.jp/api/search";

export default function Main() {
  const [searchNum, setSearchNum] = React.useState("");
  const [addresses, setAddresses] = React.useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const loadingView = <Text>loading</Text>;

  const getPostInfoAsync = async (postnumber: string) => {
    setIsLoading(true);
    try {
      const requestUri = apiBaseURL + "?zipcode=" + postnumber;
      const response = await axios(requestUri);
      const items = response.data.results;

      // foerEachメソッドの書き方(mapメソッドは新しい配列を返すメソッドのため、この書き方は無駄が多い)
      // const result:string[] = [];
      // items.map((item:AddressInfo) => {
      //   result.push(item.address1 + item.address2 + item.address3);
      // });
      //mapメソッドの書き方
      const result = items.map((item: AddressInfo) => {
        return item.address1 + item.address2 + item.address3;
      });
      setAddresses(result);
    } catch (error) {
      alert(error);
    }
    setIsLoading(false);
  }

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        placeholder="郵便番号"
        multiline
        onChangeText={(searchNum) => {
          setSearchNum(searchNum);
        }}
      />
      <Button
        onPress={() => {
          getPostInfoAsync(searchNum);
        }}
        title="検索"
      />
      {isLoading ? loadingView : null}
      <FlatList
        data={addresses}
        renderItem={({ item }) => {
          return <Text>{item}</Text>;
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
