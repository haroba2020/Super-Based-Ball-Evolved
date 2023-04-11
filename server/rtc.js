import { WebSocketServer } from "ws";
import { RTC_PORT } from "./constants.js";

export const wss = new WebSocketServer({port: RTC_PORT});

export const channels = {};

wss.on("connection", async function onConnect(ws) {
    let channelId = null;
    ws.on("close", async function onDisconnect() {
        console.log(`Disconnect from ${channelId}`);
        if (channelId !== null) {
            channels[channelId] = channels[channelId].filter(maybeWS => maybeWS !== ws);
            if (channels[channelId].length === 0) {
                channels[channelId] = undefined;
                console.log(`Deleted ${channelId}`);
            }
        }
    });
    ws.on("message", async function onMessage(data) {
        data = data.toString("utf-8");
        if (channelId == null) {
            channelId = data;
            console.log(`Connecting to ${channelId}`);

            if (channels[channelId] === undefined) {
                channels[channelId] = [];
            }
            channels[channelId].push(ws);
            return;
        }
        console.log(`RTC[${channelId}] -> ${data}`);
        let channel = channels[channelId];
        channel.forEach((otherWs) => {
            otherWs.send(data);
        });
    });
    
})

export default undefined;
