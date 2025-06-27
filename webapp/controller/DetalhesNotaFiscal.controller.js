sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"
], (Controller, JSONModel, Filter, FilterOperator) => {
	"use strict";

	return Controller.extend("ui5.teste-pratico-brgaap.controller.DetalhesNotaFiscal", {
		
        onInit() {
			const oRouter = this.getOwnerComponent().getRouter();
			oRouter.getRoute("detalhesNotaFiscal").attachPatternMatched(this.aoCoincidirRota, this);
		},

		aoCoincidirRota(evento) {
            let id = evento.getParameter("arguments").id;
            this._definirModeloDaNotaFiscal(id);
		},

		_definirModeloDaNotaFiscal: async function (id) {
            let uri = "https://jsonplaceholder.typicode.com/todos/" + id;
            console.log(uri);
			const response = await fetch(uri);
			const data = await response.json();

			return this.getView().setModel(new JSONModel(data), "nota");
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
		}
	});
});
