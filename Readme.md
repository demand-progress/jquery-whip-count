# jquery-whip-count

A jQuery pluggin + CSS to create a Senate and/or House of Representatives whip count visualization

## Include
```
<script src="whip-count.min.js"></script>
<link rel="stylesheet" href="whip-count.css"></link>
```

## Usage
```javascript
$('#chart').whipCount({
	house : {
		firmYea : 81,
		leanYea : 21,
		leanNay : 20,
		firmNay : 50
	},
	senate : {
		firmYea : 20,
		leanYea : 10,
		leanNay : 10,
		firmNay : 20
	},
	filibuster : false,	// show the filibuster 60% marker
	legend : true		// show legend
});
```