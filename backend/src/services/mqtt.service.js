import mqtt from "mqtt";

const client = mqtt.connect(process.env.BROKER_URL, {
  username: process.env.MQTT_USERNAME,
  password: process.env.MQTT_KEY,
});

export var information = {
  sm: 0,
  rt: 0,
  rh: 0,
  lux: 0,
}

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
  information[feed] = message;
  const value = message.toString();

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

  if (feed === "sm") {
    // Handle soil moisture data
    const threshold = 30;
    if (parseFloat(value) < threshold) {
      client.publish(`${process.env.MQTT_USERNAME}/feeds/pump`, "1");
    } else {
      client.publish(`${process.env.MQTT_USERNAME}/feeds/pump`, "0");
    }
  }

  console.log(`[${feed}] = ${value}`);
});


export { client };
