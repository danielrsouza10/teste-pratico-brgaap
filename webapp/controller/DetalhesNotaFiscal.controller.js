sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/ui/core/routing/History"
], (Controller, JSONModel, History) => {
	"use strict";

	return Controller.extend("ui5.teste-pratico-brgaap.controller.DetalhesNotaFiscal", {
		
        onInit() {
			const router = this.getOwnerComponent().getRouter();
			const rotaDetalhesNotaFiscal = "detalhesNotaFiscal";
			router.getRoute(rotaDetalhesNotaFiscal).attachPatternMatched(this.aoCoincidirRota, this);
		},

		aoCoincidirRota(evento) {
            let id = evento.getParameter("arguments").id;
            this._definirModeloDaNotaFiscal(id);
		},

		_definirModeloDaNotaFiscal: async function (id) {
            let uri = "https://jsonplaceholder.typicode.com/todos/" + id;
			const response = await fetch(uri);
			const dados = await response.json();
			const modeloNotaFiscal = "nota";

			return this.getView().setModel(new JSONModel(dados), modeloNotaFiscal);
		},

		onNavBack() {
			const historico = History.getInstance();
			const hashAnterior = historico.getPreviousHash();
			const rotaPaginaPrincipal = "overview";

			if (hashAnterior !== undefined) {
				window.history.go(-1);
			} else {
				const router = this.getOwnerComponent().getRouter();
				router.navTo(rotaPaginaPrincipal, {}, true);
			}
		},
	});
});
