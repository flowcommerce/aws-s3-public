package main

import (
	"github.com/flowcommerce/tools/executor"
	"fmt"
	"os"
)

func isEmpty(path string) bool {	
	file, err := os.Open(path)
	if err != nil {
		panic(err)
	}
	fi, err := file.Stat()
	if err != nil {
		panic(err)
	}
	return (fi.Size() == 0)
}

func syncCommand(name string) string {
	return fmt.Sprintf("aws s3 sync %s s3://io.flow.aws-s3-public/%s --grants read=uri=http://acs.amazonaws.com/groups/global/AllUsers", name, name);
}

func main() {
	name := "cdn.flow.io"
	tmp := fmt.Sprintf("/tmp/%s.tmp", name)

	commands := executor.Create(name + "-1")

	commands = commands.Add("git checkout master")
	commands = commands.Add("git pull --rebase")
	commands = commands.Add(fmt.Sprintf("git status --porcelain > %s", tmp))
	commands.Run()
	if (!isEmpty(tmp)) {
		fmt.Println("git checkout is dirty")
		os.Exit(1)
	}

	commands = executor.Create(name + "-2")
	commands = commands.Add("dev tag")
	commands = commands.Add(syncCommand("www"))
	commands = commands.Add(syncCommand("docs"))
	commands = commands.Add(syncCommand("util"))
	commands = commands.Add(syncCommand("email"))
	commands = commands.Add(syncCommand("policies"))

	commands.Run()
}

