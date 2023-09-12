
# Web application to collect, present and process information and statistical data from game World of Warcraft

Application created as part of the thesis.


## Table of Contents
* [General Info](#general-information)
* [Technologies Used](#tech-stack)
* [Features](#features)
* [Usage](#usage)

## General Information
The application allows the user to search for any character or guild in game and presents all relevant information about them in a simple and clear way.

Key things I had to do in this project to get it to work:
* Create the appropriate end-points on the back-end side to establish communication with the external API.
* Monitor the number of requests executed per second to avoid exceeding the limit imposed by the game developers.
* Downloading and displaying data in asynchronous mode to reduce the waiting time for the full content to load and avoid long waits.
* Proper input data validation and error handling.
* Provide the user with a convenient interface, using existing graphical conventions from the game to enhance the application's clarity and user experience.


## Tech Stack

**Client:** React, Javascript, CSS3

**Server:** Node, Express


## Features

Character section:
- Character name, level, item level and title,
- Equipment with all relevant informations,
- All Primary, Secondary and Minor Statistics for character,
- Character avatar,
- Talents,
- Mythic+ progress,
- Raid progress,
- Achievements,
- Pet and Mounts collection

Guild section:
- Guild baner, name, server, members and avg item level
- List of all members which contains:
    - Name
    - Item level
    - Race
    - Class
    - Specialization
    - Rank
- Charts with Class and Specjalization Statistics


## Usage

Character section:
[char.webm](https://github.com/BorPawel/praca-inz/assets/88384089/4c892169-226e-48f6-9b38-09a167823e53)

Guild section:
[guild.webm](https://github.com/BorPawel/praca-inz/assets/88384089/a4eaf1f0-a396-406d-9fa5-9ce5de6b6b52)
