import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, ScrollView, ActivityIndicator } from "react-native";
import * as GoogleGenerativeAI from "@google/generative-ai";

export default function MyLibrary() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userInput, setUserInput] = useState("");

  const API_KEY = "AIzaSyAzMJDI59cv373eAMSpuLyqQabYVBZ79jQ"; 

  useEffect(() => {
    const initChat = async () => {
      try {
        const genAI = new GoogleGenerativeAI.GoogleGenerativeAI(API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });

        setMessages([
          { text: "Xin chào! Hôm nay tôi có thể giúp gì cho bạn?", user: false }
        ]);
      } catch (error) {
        console.error("Error Generative AI:", error);
      }
    };

    initChat();
  }, []);

  const sendMessage = async () => {
    if (!userInput.trim()) return;
    setLoading(true);

    try {
      const genAI = new GoogleGenerativeAI.GoogleGenerativeAI(API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      
      const result = await model.generateContent(userInput);
      const responseText = result.response.text();

      setMessages([
        ...messages,
        { text: userInput, user: true },
        { text: responseText, user: false }
      ]);
    } catch (error) {
      console.error("Error calling Google Generative AI API:", error);
      setMessages([
        ...messages,
        { text: "Cảm ơn bạn đã nhắn, chúng tôi sẽ phản hồi sớm...", user: false }
      ]);
    }

    setLoading(false);
    setUserInput("");
  };

  return (
    <View style={{ flex: 1, padding: 10, backgroundColor: "#F5F5F5" }}>
      <ScrollView style={{ flex: 1, marginBottom: 15, marginTop: 50 }}>
        {messages.map((msg, index) => (
          <View
            key={index}
            style={{
              marginVertical: 8,
              alignSelf: msg.user ? "flex-end" : "flex-start",
              backgroundColor: msg.user ? "#DCF8C6" : "#ECECEC",
              borderRadius: 10,
              padding: 10,
              maxWidth: "80%",
            }}
          >
            <Text style={{ fontSize: 16, color: msg.user ? "#000" : "#333" }}>
              {msg.text}
            </Text>
          </View>
        ))}
      </ScrollView>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          borderTopWidth: 1,
          borderColor: "#ccc",
          paddingTop: 10,
        }}
      >
        <TextInput
          style={{
            flex: 1,
            borderWidth: 1,
            borderColor: "#ccc",
            borderRadius: 20,
            paddingHorizontal: 15,
            height: 40,
            backgroundColor: "#F9F9F9",
            marginRight: 10,
          }}
          placeholder="Hãy nhập tin nhắn..."
          value={userInput}
          onChangeText={setUserInput}
        />
        <Button
          title="Gửi"
          onPress={sendMessage}
          color="#4CAF50" 
        />
      </View>
      {loading && (
        <ActivityIndicator
          size="large"
          color="#4CAF50"
          style={{ marginTop: 10 }}
        />
      )}
    </View>
  );
}
