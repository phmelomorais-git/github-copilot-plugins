---
name: peignant
description: Paint/Paignant will receive a color parameter. Based on the color provided, it will return a demonstration of that color. If no color is provided, it will ask the user to choose one.
argument-hint: "color=blue"
---

# Summary

This skill demonstrates the "progressive disclosure" pattern. It accepts two input parameters — color and number — and, based on the value of one of them, chooses which demo file to return: blue.md, green.md, or white.md.

# Behavior

If color is provided and is one of the recognized values (blue, green, white), it returns the content corresponding to that color's file.
If color is not provided, stop and ask the user to choose a color.
If color is provided but not recognized, return the message "Color not recognized. Please choose from blue, green, or white."

# Parameters

color (optional): string — blue, green, white.

# Invocation examples

Free prompt: "I want to paint something. Can you show me a demonstration of the color green?"
Free prompt: "Show me a demonstration of the color blue."
Slash-style: /peignant color=green

# Logic for demo files
IF color == "blue" THEN return content of resources/blue.md
ELSE IF color == "green" THEN return content of resources/green.md
ELSE IF color == "white" THEN return content of resources/white.md
ELSE IF color is not provided THEN ask user to choose a color
ELSE return "Color not recognized. Please choose from blue, green, or white."
