# Deploy Example:
1. Unzip file
2. Go into project folder
3. Run `npm install` to install node packages
4. Run `npm run start`
5. The app will start in a minute and can be open on "localhost:8080"

# Achivements:
- Work for mobile and desktop devices
- support swipes
- work for any HTML content
- animated, finger-following swipes
- Supports multiple slides on the screen
- Supports scrolling to a selected slide
- Good performance

# Interactions: 
- Swipe 
- Click arrow buttons 
- Click paging buttons
[![Watch the video](https://imgur.com/toadGEa)](https://youtu.be/_M0FFK09vxw)

# How to use: 
- Copy Slider.tsx to your project and use as a component
- Parameters
 + dataList: any[] - your data list, every item will pass to renderItem function 
 + visibleNum: number - number of visible views on screen 
 + renderItem: (item: any) => JSX.Element - function to render view in slider, `item` is item in dataList