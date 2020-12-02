import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  SafeAreaView,
  FlatList,
} from "react-native";
import "react-native-gesture-handler";
import axios from "axios";

const apiBaseURL = "https://zipcloud.ibsnet.co.jp/api/search";

export default function Main() {
  const [searchnum, setSearchNum] = React.useState("");
  const [post, setPost] = React.useState<string[]>([]);

  const [isLoading, setIsLoading] = useState(false);
  const loadingView = <Text>loading</Text>;

  const getPostInfoAsync = async (postnumber: string) => {
    setIsLoading(true);
    try {
      const requestConfig = apiBaseURL + "?zipcode=" + postnumber;
      const response = await axios(requestConfig);
      const items = response.data.results;
      console.log(items);

      const result:string[] = [];
      items.map((item:AddressInfo) => {
        result.push(item.address1 + item.address2 + item.address3);
      });
      setPost(result);
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
        onChangeText={(searchnum) => {
          setSearchNum(searchnum);
        }}
      />
      <Button
        onPress={() => {
          getPostInfoAsync(searchnum);
        }}
        title="検索"
      />
      {isLoading ? loadingView : null}
      <FlatList
        data={post}
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
