import React, { useEffect, useState } from "react";
import { View, Text, Image, Button } from "react-native";
import axios from "axios";

const Card = () => {
 const [card, setCard] = useState("")

  const api = axios.create({
    baseURL: "https://deckofcardsapi.com/api/deck/",
  });

  useEffect(() => {
    const createDeckAndDraw = async () => {
      const { data } = await api.get("new/shuffle/", {
        params: {
          deck_count: 1,
        },
      });
      // console.log(data)
      const { deck_id } = data;
      const { data: cardsResponse } = await api.get(`${deck_id}/draw/`, {
        params: {
          count: 1,
        },
      });
      console.log(cardsResponse.cards[0].image)

      setCard(cardsResponse.cards[0].image)

      // return { ...cardsResponse.cards[0], deck_id };
    };
    createDeckAndDraw()
  }, []);

  return (
    <View style={{ alignItems: "center" }}>
      <Image
        style={{
          resizeMode: "contain",
          width: 340,
          height: 540,
          // borderRadius: 140 / 2,
          marginTop: -50,
        }}
        source={{
          uri: card
        }}
      />
      <Button title="Click Here" onPress={() => alert("Button Clicked!")} />
    </View>
  );
};

export default Card;
