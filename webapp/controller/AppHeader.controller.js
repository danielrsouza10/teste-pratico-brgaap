sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageToast"
], (Controller, MessageToast) => {
	"use strict";

	return Controller.extend("ui5.teste-pratico-brgaap.controller.AppHeader", {
		async onOpenDialog() {
			this.oDialog ??= await this.loadFragment({
				name: "ui5.teste-pratico-brgaap.view.Dialog"
			});

			this.oDialog.open();
		},

		onCloseDialog() {
			this.byId("Dialog").close();
		}
	});

});