---
name: findfast
description: Find text inside the skill resource documentation file using command-line search tools. Use when you need a quick searche.
keywords:
	- find
	- grep
	- select-string
	- search

---

Purpose
This skill runs a command-line search to locate text patterns. 

Execute the commands:
(Select-String -Pattern "`text to be searched`" resources\example.txt	).Line

Prompt examples
- Input: Find for me the name "Michael Jackson" on the documentation → Return matching lines and counts.
- Input: Find for me the name "Bob Dylan" on the documentation → Return matching lines and counts.


Behavior & Validation
- Run a single command and return stdout and a short summary (match count, lines with matches).
