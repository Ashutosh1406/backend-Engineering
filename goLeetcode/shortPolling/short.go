package main

import (
	"fmt"
	"net/http"
	"sync"
	"time"
)

var (
	jobs = make(map[string]int)
	mu   sync.Mutex
)

func main() {
	http.HandleFunc("/submit", submitHandler)
	http.HandleFunc("/check-status", checkStatusHandler)

	fmt.Println("Listening on Port 8008")

	if err := http.ListenAndServe(":8008", nil); err != nil {
		fmt.Println("Error starting server", err)
	}
}

func submitHandler(w http.ResponseWriter, r *http.Request) {
	jobID := fmt.Sprintf("job:%d", time.Now().UnixNano())
	mu.Lock()
	jobs[jobID] = 0
	mu.Unlock()

	go updateJobs(jobID, 0)

	fmt.Fprintf(w, "\n\n %s\n\n", jobID)
}

func checkStatusHandler(w http.ResponseWriter, r *http.Request) {
	jobID := r.URL.Query().Get("jobID")

	mu.Lock()
	progress, exsits := jobs[jobID]
	mu.Unlock()

	if !exsits {
		http.Error(w, "JobID not found for mentioned job", http.StatusNotFound)
		return
	}

	fmt.Fprintf(w, "\n\n %d\n\n", progress)
}

func updateJobs(jobID string, progress int) { //main server side proccessing of job

	mu.Lock()
	jobs[jobID] = progress
	mu.Unlock()

	if progress == 100 {
		fmt.Println("finished job Successfully")
		return
	}

	fmt.Printf("Updated Progress for %s to %d\n", jobID, progress)
	time.AfterFunc(5*time.Second, func() {
		updateJobs(jobID, progress+10) //incrementing progress by 10 after 3 seconds
	})
}
