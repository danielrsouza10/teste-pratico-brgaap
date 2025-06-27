sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"
], (Controller, JSONModel, Filter, FilterOperator) => {
	"use strict";

	return Controller.extend("ui5.teste-pratico-brgaap.controller.ListaDeNotasFiscais", {
		onInit: async function () {
			const response = await fetch("https://jsonplaceholder.typicode.com/todos");
			const data = await response.json();

			this.getView().setModel(new JSONModel(data), "invoice");
		},

		onFilterNotasFiscaiss: function (oEvent) {
			const aFilter = [];
			const sQuery = oEvent.getParameter("query");
			if (sQuery) {
				aFilter.push(new Filter("title", FilterOperator.Contains, sQuery));
			}

			const oList = this.byId("invoiceList");
			const oBinding = oList.getBinding("items");
			oBinding.filter(aFilter);
		}
	});
});
