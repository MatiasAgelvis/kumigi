import urlJoin from "url-join";
export const BASE = "https://avatara.herokuapp.com/v2";

function extractProps(array, prop) {
	return array.map((x) => x[prop]);
}

function urlParam(name, value) {
	const isArray = Array.isArray(value);
	return value
		? `&${name}=${isArray ? "[" : ""}${value}${isArray ? "]" : ""}`
		: "";
}

export default function URLfromLayers(layers, parameters = []) {
	const shapes = extractProps(layers, "shape").filter((x) => x);
	const colors = extractProps(layers, "color")
		.filter((x) => x)
		.map((color) => color.replace("#", ""))
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
		urlParam("fonts", fonts) +
		parameters.map((x) => urlParam(x.name, x.value)).join("");

	const URL = (
		urlJoin(BASE, ...shapes) + (shapes.length > 0 ? "?" + params : "")
	).replace(/ /g, "");

	return URL;
}
