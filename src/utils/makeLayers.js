import { circular } from "../utils/common";

export function makeLayers(shapes, colors, texts, fonts) {
	return shapes.map((shape, i) => {
		return {
			shape: shape, 
			color: circular(colors, i), 
			...(shape == "text" && {
				text: texts.shift(), 
				font: circular(fonts)
			})
		};
	});

}