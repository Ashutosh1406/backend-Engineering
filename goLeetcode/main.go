package main

import (
	"fmt"
	"math"
)

func max(a, b int) int {
	if a > b {
		return a
	}
	return b
}

func equalSubstring(s string, t string, maxCost int) int {
	n := len(s)
	cost := make([]int, n)

	// Construction of cost between s[i] and t[i]
	for i := 0; i < n; i++ {
		cost[i] = int(math.Abs(float64(s[i] - t[i])))
	}

	currCost := 0
	i := 0
	maxLength := 0 // Initialize to 0, because 0 is the minimum length possible

	for j := 0; j < n; j++ {
		currCost += cost[j]
		for currCost > maxCost { // Shrink the window
			currCost -= cost[i]
			i++
		}
		maxLength = max(maxLength, j-i+1)
	}

	return maxLength
}
func abs(num int) int {
	if num < 0 {
		return -num
	}
	return num
}
func main() {
	s := "abcd"
	t := "bcdf"
	maxCost := 3
	fmt.Println("Maximum Length of Substring:", equalSubstring(s, t, maxCost)) // Output should be 3

	n := len(s)
	cost := make([]int, n)

	// Construction of cost between s[i] and t[i]
	for i := 0; i < n; i++ {
		//cost[i] = int(math.Abs(float64(s[i] - t[i])))
		cost[i] = abs(int(s[i]) - int(t[i]))
	}

	for j := 0; j < n; j++ {
		fmt.Println(cost[j])
	}
}
