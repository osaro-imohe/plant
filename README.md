# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Start steps

In the project directory, you can run:

### `yarn`
Installs all dependencies

### `yarn start`
Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.



# Key design decisions
* Reusable components, emphasis on modular reusable code
* Custom charts built with D3
* TypeScipt for type safety
* Emphasis on clean and minimalist ui design

 # Biggest problems
 * Encountered some issues with clashing type definitions with d3. I modified the start scipt in package.json to warn about those errors but still allow compilation. This is defintely something I would fix if given more time.
 * I had some difficulty using d3 to segrate data into individual bins for further rendering. That took me a significant amount of time to get right.

 # Possible improvements
 * Percentage break down on histogram component (a little complicated to implement with d3, didn't have enough time to get around to this).
 * Make all text white on row select in table component (small fix)
 * Better integration with d3's type defs 
 * Automated tests
 
 
  # Complaints/Biggest problems
  * No complaints, it was a fun project :)
