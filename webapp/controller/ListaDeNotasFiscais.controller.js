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
			const dados = await response.json();
			const modeloNotasFiscais = "notas";

			return this.getView().setModel(new JSONModel(dados), modeloNotasFiscais);
		},

		aoFiltrarNotasFiscais: function (evento) {
			const filtro = [];
			const parametro = "query";
			const propriedade = "title";
			const query = evento.getParameter(parametro);
			if (query) {
				filtro.push(new Filter(propriedade, FilterOperator.Contains, query));
			}
			const idTabelaNotas = "tabelaNotasFiscais";
			const bindDaTabela = "items";
			const tabela = this.byId(idTabelaNotas);
			const binding = tabela.getBinding(bindDaTabela);
			binding.filter(filtro);
		},

		_obterIdSelecionadoNaLista: function (evento) {
			const modeloNotasFiscais = "notas";
			return evento
				.getSource()
				.getBindingContext(modeloNotasFiscais)
				.getObject().id;

		},

		aoSelecionarItemNaTabela: function (evento) {
			const idSelecionado = this._obterIdSelecionadoNaLista(evento);
			const router = this.getOwnerComponent().getRouter();
			const rotaViewDetalhes = "detalhesNotaFiscal";

			return router.navTo(rotaViewDetalhes, { id: idSelecionado });
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
			const idSearchField = "searchFieldNotasFiscais";
			this.byId(idSearchField).setValue(stringVazia);
			this._definirModeloDasNotasFiscais();
        },
	});
});
