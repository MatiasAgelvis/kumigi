![](images/avatara.png)

# Avatara

Create simple avatars with text from a simple and composable API.

## Paths

<dl>
<dt>background</dt>
	<dd>Basic shape, will cover all canvas.</dd>
<dt>rectangle</dt>
	<dd>Rectangular Shape that goes from side to side in the x axis and has margins in the y axis.</dd>
<dt>square</dt>
	<dd>Rectangular Shape that will have the same margins in the both axis.</dd>
<dt>circle</dt>
	<dd>Elliptical Shape that will have the same margins in the both axis.</dd>
<dt>gradient</dt>
	<dd>Overlays diagonally a linear gradient form transparent to the given color, used with `background` creates a two color transition.</dd>
</dl>

## Options

The following parameters can be passed to all queries.

-   `width` : Number, sets the width of the resulting image (ex. `width=300`)
-   `height` : Number, sets the height of the resulting image (ex. `height=140`)
-   `colors` : String-Array of CSS parsable color strings (ex. `colors=[rgb(100,0,200),dodgerblue]`)
-   `textColor` : CSS parsable color string (ex. `textColor=rgba(12,78,230,0.7)`)
-   `text` : String of up to 3 characters, if its longer only the first 3 chars are going to be used (ex. text=ABC)
-   `font` : One of [ plex, courier, cousine, pt, roboto ] (ex. font=pt)


## Example

    https://avatara.herokuapp.com/circle?colors=[#234567]&text=MAD&textColor=fff&font=courier

<p align="center">
<img src="images/example.png">
</p>
