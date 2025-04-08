import mqtt from "mqtt";

const client = mqtt.connect(process.env.BROKER_URL, {
  username: process.env.MQTT_USERNAME,
  password: process.env.MQTT_KEY,
});

client.on("connect", () => {
  console.log("MQTT connected");

  // Subscribe to sensor feeds
  client.subscribe(`${ADA_USERNAME}/feeds/sm`);
  client.subscribe(`${ADA_USERNAME}/feeds/rt`);
  client.subscribe(`${ADA_USERNAME}/feeds/rh`);
  client.subscribe(`${ADA_USERNAME}/feeds/lux`);
});

client.on('message', (topic, message) => {
  const feed = topic.split('/').pop();
  const value = message.toString();

  console.log(`[${feed}] = ${value}`);
});


export { client };
