package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"os/exec"
	"strings"
)

var cmd = "docker"
var infile = "/data/docker.js"

type Result struct {
	Output   map[string]string `json:"output"`
	Addstate string            `json:"addstate"`
	Delstate string            `json:"delstate"`
}

func main() {
	fmt.Println("Start")
	rawinput, err := ioutil.ReadFile(infile)
	if err != nil {
		fmt.Printf("Error reading from %s: %s\n", infile, err)
		return
	}

	// need to skip:
	preamble := []byte("define (function() { return ")
	// and remove from end:
	postamble := []byte("; });")
	input := rawinput[len(preamble) : len(rawinput)-len(postamble)-1]

	fmt.Printf("START\n%s\nEND\n", input)

	var results map[string]Result
	err = json.Unmarshal(input, &results)
	if err != nil {
		fmt.Printf("Error parsing JSON from %s: %s\n", infile, err)
		return
	}
	for k, _ := range results {
		fmt.Printf("key: %s\n", k)
		c := exec.Command(cmd, strings.Split(k, " ")...)
		output, err := c.CombinedOutput()
		if err != nil {
			fmt.Printf("Error running cmd%s: %s\n", c, err)
			//return
		}
		results[k] = Result{
			Output: map[string]string{
				"_default": string(output),
			},
		}
		//		for s, o := range v.Output {
		//			fmt.Printf("\t%s = %s\n", s, o)
		//		}
	}
	fmt.Println("read Done")
	//results["sven"] = Result{
	//		Output: map[string]string{
	//			"_default":    "sven was here",
	//			"pull-debian": "sven wasn't here",
	//		},
	//	}

	output, err := json.MarshalIndent(results, "", "   ")
	if err != nil {
		fmt.Printf("Error marshaling JSON: %s\n", err)
		return
	}
	complete := append(preamble, output...)
	output = append(complete, postamble...)
	err = ioutil.WriteFile("/data/docker.out", output, 0444)
	if err != nil {
		fmt.Printf("Error writing to file: %s\n", err)
		return
	}
	fmt.Println("Done")
}
