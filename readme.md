## X-Map-10.

Google Chrome Web Browser Application for Showing X-Plane 10 Flight Simulator Location Data on a Google Map.

## Purpose

X Plane is capable of showing a map in flight, but it is sparse, shows little in the way of detail and commonly tanks the framerate.  This application allows you to show the location of your plane in an easy, efficient and flexible way, using the google chrome web browser

## Installation

Download the Zip, enable developer mode for chrome extensions, then install upacked extension, pointing to the root folder you extracted the zip into.  Alternatively, wait, and it will be released on the chrome app store.

## Version 1.0

*non-compiled, non-signed bare code.

*barebones features include:

  Location of Plane as Triangular Icon on a Google Map
  
  Google Map Auto-Centers to the Location of your Plane
  
  That's it.

## HOW TO:
*To Connect X-Plane (either version 9 or 10 will work), complete the following:
  *You must be running X-Plane 9 or 10 on a local network.
  *Go to settings->Data Input & Output, you must select the first check boxes for data references 17 and 20.
  *On the same page, set the UDP rate to the desired polling rate for the map.  Somewhere between 30 and 60 times a second is more than usable.  X Plane is designed for this not to affect your framerate.
  *Close that window by clicking the X at the top right.
  *Once you have returned to the main simulation window, select settings->Net Connections
  *Click on the Data Tab, at the top right of the window
  *In the "IP for Data Output" Section, there are two white boxes for data entry.  The box on the right, you MUST ENTER THE FOLLOWING NUMBER: 49003.  This is the UDP port that X-Plane will send to.
  *If you are running X-Plane and X-Map 10 on the same physical compter, if you are using a multi-window or multi-monitor setup, in the leftmost box, enter your computer's local IP Address, which will have the form 192.168.xxx.xxx
  *If you are running X-Map 10 on a separate physical computer, such as a laptop, ensure the computers are on the same local network and can talk to each other, then enter the IP Address of the receiving machine in the leftmost box.
  *Ensure the "IP of data receiver" checkbox is checked, and contains a tick.
  *Close the window with the X at the top right.
 
 X Plane 10 and the X-Map 10 chrome extension should now communicate successfully.
  
## Contributors

Let people know how they can dive into the project, include important links to things like issue trackers, irc, twitter accounts if applicable.

## License

Copyright Jack Farrand 01/03/2015, all rights reserved for now.  If you want to make use of this, or want to tell me how crap my code is, contact me at jack dot farrand at gmail dot com
