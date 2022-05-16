import urlJoin from "url-join";

function extractProps(array, prop) {
	return array.map((x) => x[prop]);
}

function urlParam(name, value) {
	return value ? `&${name}=[${value}]` : "";
}

export default function URLfromLayers(layers) {
	const BASE = "https://avatara.herokuapp.com/v2";

	const shapes = extractProps(layers, "shape").filter((x) => x);
	const colors = extractProps(layers, "color")
		.filter((x) => x)
		.toString();
	const texts = extractProps(layers, "text")
		.filter((x) => x)
		.toString();
	const fonts = extractProps(layers, "font")
		.filter((x) => x)
		.toString();

	const params =
		urlParam("colors", colors) +
		urlParam("texts", texts) +
		urlParam("fonts", fonts);

	const URL = (
		urlJoin(BASE, ...shapes) + (shapes.length > 0 ? "?" + params : "")
	).replace(/ /g, "");

	return URL
}
