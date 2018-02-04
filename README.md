# edx node
## csvtojson
(or edxnode-csvtojson, because all the good unique names have been taken)

To run:
*node index.js input-filename.csv output-filename.json*

>1. Walk us through the design of your project. Why did you design your project the way you did? What difficulties did you overcome?

I initially tried a couple different npm modules but none of them printed out the json in the tabulated form requested. So I wrote something myself. Once I solved a couple off by one errors, and the problems they created, it was smooth sailing.

>2. How did you test your project to verify that it works?

Not as thoroughly as I would have liked. No unit tests or anything. Just duplicated the original csv file and jumbled some things up. Added commas where there shouldn't be any, removed fields from some of the entries, added blank lines.

>3. Let us know if anything doesn't work as intended so your reviewer will know ahead of time

This only works on a single level of json objects, nesting will probably break it. Though, I don't know enough about csv to know if that's even a thing.

The code is well commented and should explain itself enough to be easily understood.