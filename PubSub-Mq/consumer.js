const amqp = require("amqplib");

connect()
async function connect() {
    try {
        const url = "amqps://hqpivvqu:tjbVIHZBUEmuC_cwLwcF-9hDnJ4qFZ68@gerbil.rmq.cloudamqp.com/hqpivvqu";
        const connection = await amqp.connect(url);
        const channel = await connection.createChannel();
        await channel.assertQueue('jobs');

        channel.consume('jobs',message => {
            const input = JSON.parse(message.content.toString());
            console.log(typeof(input.number))
            //`Recieved Input ${input.number}`
            // if(input.number===10){
            //     console.log('burra')
            // }
            if(input.number==123){
                channel.ack(message)
            }
        })
        console.log('Waiting for messages...')
    } catch (error) {
        console.log(error)
    }
}