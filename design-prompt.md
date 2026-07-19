You are an expert at making personal websites. You will implement the following website, following the plan step by step and pausing to ask questions along the way if there is any. 

The website will have a hand-drawn/freestyle aesthetic mixed with a bit of a modern tech style. The background will have a grainy/paper look in colour #f9f8f6. The selected fonts are Tuesday Story in #fonts for big titles and headers, and you will use instrument sans for smaller blurbs of text. Additionally, apart from the landing page, there should be doodles randomly populated around photos in sections. Random as in random positions, not as in they refresh to a different doodle every time (i.e. they will be static in the website once you decide their position). 

## Assets 
Menu bar. This should have no background, and is all only text. We will have 6 tab options in the menu: Home (landing page), About Me, Experience, Projects, Blogs, Contact Me
Use the instrument sans font for this. Make all of the text in LOWERCASE
Note that the tags will have the following design: 
NO background, must only be text and on the left of the text will be a drawn dot of colour, which each colour represents that specific tag. I.e. Typescript tag will have its own colour. If you are not able to create a hand-drawn dot, please notify me and I will add it in assets.

Note that static assets are not created. For all the assets not created, you can put a placeholder for now. 

## Landing page 
This will be the home page. When users first initially launch the website, the animation will play (animation is in #assets/animation/landing) where the user will scroll as the animation plays. Ensure that the animation is fitted so that it is compatible with both mobile and laptop. 

### Context
For context, the animation is a shooting star falling down, and landing in a girl's hand. The animation follows the girl to walk until she finds a spot to place the star (in the air). 

### User flow 
The scroll will go vertically as the shooting star is falling, and will go horizontally when the girl starts walking. The girl starts walking in #assets/animations/landing/frame_00018.png. 
Once animation is over, the user automatically scrolls to the title Hi, my name is <br> Isabella. There will be a star asset to the left of the text (give the illusion that it was the girl’s star in the animation). If the user hovers on it, it can shake. On mobile, the user would need to press on it. 

### Important side notes & assets 
As the user scrolls there should be a progress bar at the bottom showing how much the user has scrolled. The progress bar should be very simple, and look like a hand drawn line. If you need me to create a visual of the hand drawn line, please let me know. 
Before the user starts scrolling, the menu bar should still be visible. Only when the user starts scrolling will the menu bar scroll away as well. Users will still be able to access the menu bar if they scroll up (reverse scroll), but disappear when the user scrolls downwards. 
Once the user reaches the end (where it lands on the static Hi my name is..) the menu bar is visible again. 
The user is still able to view the animation (it can replay backwards) as long as the user scrolls are reversed. 


## About Me 

The about me page will show a view of text and beside it will be a photo of me. 
The design should look like a text blurb to the left half, and photo on the right half. The header for the text will be “hello!”. 
The scroll animation for this will be a “snap” motion, where it will show a section/page, and when you scroll to the next section it will lock in place (only from introduction -> next section) 

The next section will be with the header: “get to know me a bit better…” 
Here, we will have 3 photos that are stored in a polaroid photo frame and scattered on top of each other loosely. The user will be able to click on the polaroid, and it will move out of the pile and spring up to a closer view for the user. The polaroid will have the photo, and there will be a handwritten text (you can use Tuesday Story font for now) with the date and a brief title. 

This should fill up the whole page. 

As you scroll down a bit more in this section, it will show my hobbies. This is still part of the current section, so don’t have the “snap” motion for this segment, it simply scrolls down smoothly. The photos here will be drawings that I make beside a small description blurb. 

## Experience
We will have a time line bar on the very left that is vertical. To the right there will be an experience panel that has:
Name of company 
Title (role) 
Tags
description 

And to the right it will have an image of the logo of the company (which will be hand drawn to keep the theme consistent).
 
Note that the text should take ⅔ of the space. 

The timeline bar will have the start date, which is where the panel should align with. 
On the top right of the panel, it should contain the duration (i.e. 4 months). 


## Projects 
The projects will be filled with small panel buttons in a grid format. 

Each panel will have: 

Title of project
Date project was created
Tags

Additionally, each panel will the same as the background, but it looks like it is lifted up a bit from the background (i.e. using box shadow or some other technique) 


### Panel Design 
When a user clicks into the project panel, the menu bar will be gone. The will only be a hand-drawn arrow in the top left indicating the back button. 

We will also have the snap effect in place. The first page will have the text on the left, and an image doodle on the right (both equally around the same size). 

Text on the left will be: 
Name 
Short Description 
Tech stack 
all the tech stack tags in a container 

When you scroll to the next section, it will be a continuous (no snap) scroll, where there are a bunch of similar text with images showing off the UI/UX and backend features, etc. 

## Contact me 
Contact me will have the typical contact me section: first name, last name, email, description and submit button. On the bottom right, there will be the coffee which is in #assets/animations/coffee. The coffee will stay static empty UNTIL the user clicks on it and holds (then animation will play until coffee is full). On a laptop, on hover it will “lift” the coffee asset up. Additionally there will be small text saying “for the coffee lovers :)” 


## Blog 
The blog will also be in grid format, with each component having a sheet of crumbled paper (and when the user hovers it uncrumbles; mobile it will uncrumble when user presses for a second then directs to the blog). Underneath the crumbled paper, it will have the name of the blog and the date created under it.
