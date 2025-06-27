sap.ui.define([
	"sap/ui/core/ComponentContainer"
], (ComponentContainer) => {
	"use strict";

	new ComponentContainer({
		name: "ui5.teste-pratico-brgaap",
		settings : {
			id : "teste-pratico-brgaap"
		},
		async: true
	}).placeAt("content");
});