package main

import (
	"fmt"
	"strings"
)

func main() {
	str := "AABBABBBAAAABBBB"
	find := "BB"
	fmt.Println("Found", find, strings.Count(str, find), "times.")

	stringi := "Codecademy"
	firstSuffix := "demy"
	secondSuffix := "academy"

	fmt.Println(strings.HasSuffix(stringi, firstSuffix))
	fmt.Println(strings.HasSuffix(stringi, secondSuffix))

	stringi2 := "I love programming with Go!"
	fields := strings.Fields(stringi2)
	for i, field := range fields {
		fmt.Println("Index: ", i)
		fmt.Println("Value: ", field)
		fmt.Println()
	}

	//string methods :=>  from "STRINGS PACKAGE"
	/*

		strings.Compare(str1,str2) => return 0  if same else str1<str2 returns -ve and +ve otherwise
		strings.Contains()
		strings.Count()
		strings.Cut(s,seperator) => before , after , seperator
		strings.CutPrefix(str,prefix)
		strings.CutSuffix(str,Suffix)
		strings.Fields(str)
		strings.hasPrefix()
		strings.hasSuffix()

	*/

}
