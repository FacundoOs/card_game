import React, { useEffect, useState } from "react";
import { View, Image, Button, Text } from "react-native";
import axios from "axios";

const Card = () => {
  const [card, setCard] = useState("");
  const [cards_id, setCards_id] = useState(null);
  const [value, setValue] = useState("");
  const [actualValue, setActualValue] = useState("");
  const [option, setOption] = useState("");
  const [cont, setCont] = useState(0);

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
      const { deck_id } = data;
      const { data: cardsResponse } = await api.get(`${deck_id}/draw/`, {
        params: {
          count: 1,
        },
      });
      console.log(cardsResponse.cards[0].image, deck_id);
      setCard(cardsResponse.cards[0].image);
      setCards_id(deck_id);
      setValue(cardsResponse.cards[0].value);
    };
    createDeckAndDraw();
  }, []);

  const buttonOnClick = async () => {
    const { data } = await api.get(`${cards_id}/draw/`, {
      params: {
        count: 1,
      },
    });
    console.log(data.cards[0].image);
    setCard(data.cards[0].image);
    setActualValue(data.cards[0].value);

    if (option === "Up") {
      if (value > actualValue) {
        setCont(cont + 1);
        console.log(cont);
      }
    }

    if (option === "Down") {
      if (value < actualValue) {
        setCont(cont + 1);
        console.log(cont);
      }
    }
  };

  return (
    <View style={{ alignItems: "center" }}>
      <Image
        style={{
          resizeMode: "contain",
          width: 340,
          height: 540,
          marginTop: -50,
        }}
        source={{
          uri: card,
        }}
      />
      <Button
        title="Up"
        onPress={() => {
          setOption("Up"), buttonOnClick();
        }}
      />
      <Button
        title="Down"
        onPress={() => {
          buttonOnClick(), setOption("Down");
        }}
      />
      <Text>{cont && <Text>{cont}</Text>}</Text>
    </View>
  );
};

export default Card;
