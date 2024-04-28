# Wiz Lightbulb Control App

This app allows you to control a Wiz Lightbulb from your computer.

## IMPORTANT

You still need to register the lightbulb on the official phone app in order to find it's IP.

![](/images/app-example.png)

## Technologies

- [Tauri](https://tauri.app/) - backend
- [React.js](https://react.dev/) - frontend
- [Wireshark](https://www.wireshark.org/) was used to scan the packets sent by the official (phone) app.  
Info:
  - UDP
  - listens on port 38899
  - Packet payloads:
    - {"id":1,"method":"setPilot","params":{"r":`0-255`,"g":`0-255`,"b":`0-255`,"dimming": `10-100%`}} for changing rgb color
    - {"id":1,"method":"setPilot","params":{"temp":`2200-6400`,"dimming":`10-100%`}} for changing temperature
- The rust backend sends an UDP message to the lightbulb with either of the payloads.



## Installation

- **Windows (64-bit)**

  - [Download Installer](https://github.com/rVladq/Wiz_Lightbulb_Controller/blob/main/wiz_0.1.0_x64-setup.exe)

- **Linux**
  - Clone the repository
  - `npm install`
  - `npm run tauri build`

## Usage

   - Enter the IP **(remains saved)**.
   - Select your settings.
   - Press **SEND**.

## Instructions for retrieving the IP from the official (phone) app:

These instructions are also available in *this* app (click on `i`):

- Open the Wiz App on your phone/tablet.
- Open the side menu and go to 'Lights'.
- Select your lightbulb, then click on 'Model'.
- You should be looking at a list of informations now.
- Find the IP.
