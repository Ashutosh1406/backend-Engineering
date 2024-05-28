const express = require('express');

const app = express();

app.use(express.json());

const jobs = {};    //jobs object storing/containing Job-ID



// putting the job inside job{dictationary} from client
app.post("/submit",(req,res) => {
    const jobID = `job:${Date.now()}`;
    jobs[jobID] = 0;

    updateJobs(jobID,0)  //10s after every elapsed second(ie 1s)

    res.end('\n \n'  + jobID + '\n \n' );
})

// fetching the status of JobID From jobs[JobID]
app.get('/check-status',(req,res) => {
    console.log(jobs[req.query.jobID])

    res.end('\n \n' + jobs[req.query.jobID] + '%\n\n')
})


// server listen 

app.listen(8002,() => console.log('Listening on Port 8002'));

function updateJobs(jobID , progress){
    jobs[jobID] = progress;
    if(progress==100){
        console.log('finished')
        return;
    }

    console.log(`updated progress for ${jobID} to ${progress}`);
    this.setTimeout(() => {
        updateJobs(jobID,progress+10)
    }, 3000);
}


//const date = new Date
//console.log(new Date(Date.now()))

// const randomId = Math.random()
