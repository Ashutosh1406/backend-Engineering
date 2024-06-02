const amqp = require("amqplib");


const message = {number: process.argv[2]}

connect();

async function connect() {

    try {
        //By default 200 channels are provided(free)
        const amqpServer = "amqps://hqpivvqu:tjbVIHZBUEmuC_cwLwcF-9hDnJ4qFZ68@gerbil.rmq.cloudamqp.com/hqpivvqu"
        const connection = await amqp.connect(amqpServer)

        const channel = await connection.createChannel();
        await channel.assertQueue('jobs'); //jobs queue on AMQP-CLOUD
        await channel.sendToQueue('jobs',Buffer.from(JSON.stringify(message)))
        console.log(`Job sent to cloud mq ${message.number}`);
        await channel.close();
        await connection.close();
    } catch (error) {
        console.log(error)
    }
}