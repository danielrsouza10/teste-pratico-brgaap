sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"
], (Controller, JSONModel, Filter, FilterOperator) => {
	"use strict";

	return Controller.extend("ui5.teste-pratico-brgaap.controller.ListaDeNotasFiscais", {
		onInit: async function () {
			await this._definirModeloDasNotasFiscais();
		},

		_definirModeloDasNotasFiscais: async function (){
			const response = await fetch("https://jsonplaceholder.typicode.com/todos");
			const data = await response.json();

			return this.getView().setModel(new JSONModel(data), "notas");
		},

		aoFiltrarNotasFiscais: function (evento) {
			const filtro = [];
			const query = evento.getParameter("query");
			if (query) {
				filtro.push(new Filter("title", FilterOperator.Contains, query));
			}

			const tabela = this.byId("tabelaNotasFiscais");
			const binding = tabela.getBinding("items");
			binding.filter(filtro);
		}
	});
});
