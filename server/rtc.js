import { WebSocketServer } from "ws";
import { RTC_PORT } from "./constants.js";

export const wss = new WebSocketServer({port: RTC_PORT});

const channels = {};

wss.on("connection", async function onConnect(ws) {
    let channelId = null;
    
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
