
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

**Front-end:**: `React`, `Javascript`, `CSS3`

**Back-end:**: `Node`, `Express`


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


https://github.com/BorPawel/praca-inz/assets/88384089/acc1d7f7-f72c-4766-af92-ffca25543483



Guild section:


https://github.com/BorPawel/praca-inz/assets/88384089/6d9d487a-e49b-41d5-9927-35852657eef4


