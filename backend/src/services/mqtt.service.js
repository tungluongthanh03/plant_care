import mqtt from "mqtt";

const client = mqtt.connect(process.env.BROKER_URL, {
  username: process.env.MQTT_USERNAME,
  password: process.env.MQTT_KEY,
});

var count = 0;

console.log("Connecting to MQTT broker...");
client.on("error", (err) => {
  console.error("❌ MQTT connection error:", err);
});

client.on("connect", () => {
  console.log("MQTT connected");

  // Subscribe to sensor feeds
  client.subscribe(`${process.env.MQTT_USERNAME}/feeds/sm`);
  client.subscribe(`${process.env.MQTT_USERNAME}/feeds/rt`);
  client.subscribe(`${process.env.MQTT_USERNAME}/feeds/rh`);
  client.subscribe(`${process.env.MQTT_USERNAME}/feeds/lux`);
});

client.on('message', (topic, message) => {
  const feed = topic.split('/').pop();
  const value = message.toString();

  // if (feed === "sm") {
  //   // Handle soil moisture data
  //   const threshold = 5;
  //   if (parseInt(value) < threshold) {
  //     client.publish(`${process.env.MQTT_USERNAME}/feeds/pump`, "1");
  //   }
  // }
  // if (feed === "sm") {
  //   // Handle soil moisture data
  //   const threshold = 5;
  //   if (parseInt(value) < threshold) {
  //     client.publish(`${process.env.MQTT_USERNAME}/feeds/pump`, "1");
  //   }
  // }
  if (feed === "rt") {
    // Handle soil moisture data
    const threshold = 33;
    if (parseFloat(value) > threshold) {
      client.publish(`${process.env.MQTT_USERNAME}/feeds/fan`, "1");
    } else {
      client.publish(`${process.env.MQTT_USERNAME}/feeds/fan`, "0");
    }
  }

  if (feed === "lux") {
    // Handle soil moisture data
    const threshold = 30;
    if (parseFloat(value) < threshold) {
      client.publish(`${process.env.MQTT_USERNAME}/feeds/light`, "1");
    } else {
      client.publish(`${process.env.MQTT_USERNAME}/feeds/light`, "0");
    }
  }

  console.log(`[${feed}] = ${value}`, count++);
});


export { client };
