const express = require('express');
const app = express();

const jobs = {}; // jobs object storing/containing Job-ID

// Putting the job inside jobs from client
app.post("/submit", (req, res) => {
    const jobID = `job:${Date.now()}`;
    jobs[jobID] = 0;

    updateJobs(jobID, 0); // Start updating job progress

    res.end('\n\n' + jobID + '\n\n');
});

// Fetching the status of JobID from jobs through 'LONG POLLING MECHANISM'
app.get('/checkstatus', async (req, res) => {
    try {
        // const jobID = req.query.jobID;
        await longPollCheckStatus(jobID);
        console.log(jobs);
        res.end("\n\nJOB COMPLETED FOR " + jobs[jobID] + "%\n\n");
    } catch (error) {
        res.status(500).end("\n\nERROR CHECKING JOB STATUS\n\n");
    }
});

// Server listen
app.listen(8002, () => console.log('Listening on Port 8002'));

function checkJobComplete(jobID) {
    return jobs[jobID] >= 100;
}

function longPollCheckStatus(jobID) {
    return new Promise((resolve, reject) => {
        const interval = setInterval(() => {
            if (checkJobComplete(jobID)) {
                clearInterval(interval);
                resolve();
            }
        }, 1000);
    });
}

function updateJobs(jobID, progress) {
    jobs[jobID] = progress;
    if (progress >= 100) {
        console.log('finished');
        return;
    }

    console.log(`Updated progress for ${jobID} to ${progress}`);
    setTimeout(() => {
        updateJobs(jobID, progress + 10);
    }, 4000);
}
