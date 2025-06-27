sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"sap/ui/model/Sorter",
], (Controller, JSONModel, Filter, FilterOperator, Sorter) => {
	"use strict";

	return Controller.extend("ui5.teste-pratico-brgaap.controller.ListaDeNotasFiscais", {
		onInit: async function () {
			await this._definirModeloDasNotasFiscais();
		},

		_definirModeloDasNotasFiscais: async function () {
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
		},

		_obterIdSelecionadoNaLista: function (evento) {
			return evento
				.getSource()
				.getBindingContext("notas")
				.getObject().id;

		},

		aoSelecionarItemNaTabela: function (evento) {
			const idSelecionado = this._obterIdSelecionadoNaLista(evento);
			const router = this.getOwnerComponent().getRouter();

			return router.navTo("detalhesNotaFiscal", { id: idSelecionado });
		},

		aoOrganizar: function () {
			const idTabelaNotasFiscais = "tabelaNotasFiscais";
			const propriedade = "items";
			const propriedadeOrdenada = "title";
			var lista = this.byId(idTabelaNotasFiscais);
			var binding = lista.getBinding(propriedade);
			var sorter = new Sorter(propriedadeOrdenada);
			binding.sort(sorter);
		},

		aoAgrupar: function () {
			const idTabelaNotasFiscais = "tabelaNotasFiscais";
			const propriedade = "items";
			const propriedadeOrdenada = "userId";
			var lista = this.byId(idTabelaNotasFiscais);
			var binding = lista.getBinding(propriedade);
			var sorter = new Sorter(propriedadeOrdenada, false, function (contexto) {
				var userId = contexto.getProperty(propriedadeOrdenada);
				return {
					key: userId,
					text: userId,
				};
			});
			binding.sort(sorter);
		},

		aoResetar: function () {
			const stringVazia = "";
			const idSearchField = "searchFieldPersonagens";
			this.filtros = {};
			this.byId(idSearchField).setValue(stringVazia);
			this._definirModeloDasNotasFiscais();
        },
	});
});
