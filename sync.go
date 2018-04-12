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

func syncCommand(bucket string, name string) string {
	return fmt.Sprintf("aws s3 sync %s s3://%s/%s --grants read=uri=http://acs.amazonaws.com/groups/global/AllUsers", bucket, name, name);
}

func addCommand(commands executor.Deployment, selection string, dir string) executor.Deployment {
	if (selection == "all" || selection == dir) {
		commands = commands.Add(syncCommand("io.flow.aws-s3-public", dir))
		commands = commands.Add(syncCommand("cdn.flow.io", dir))
	}
	return commands
}

func main() {
	selection := "all";
	if (len(os.Args) > 1) {
		selection = os.Args[1]
	}

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
	commands = addCommand(commands, selection, "www")
	commands = addCommand(commands, selection, "docs")
	commands = addCommand(commands, selection, "util")
	commands = addCommand(commands, selection, "email")
	commands = addCommand(commands, selection, "policies")

	commands.Run()
}

