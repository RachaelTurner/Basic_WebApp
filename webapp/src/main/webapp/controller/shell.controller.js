sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
], function (Controller, JSONModel) {
    "use strict";

    return Controller.extend("com.rach.controller.shell",{
        onInit: function () {
            this.viewModel = new JSONModel();
            this.getView().setModel(this.viewModel);
            this.viewData = {
                selectedImage:"https://i.ytimg.com/vi/zecueq-mo4M/maxresdefault.jpg"
            };
            this.viewModel.setData(this.viewData);
        },

        onChoosePress: function () {
            var dialogView = sap.ui.xmlview("com.rach.view.ChooseDialog");
            this.getView().addDependent(dialogView);
            var dialogController = dialogView.getController();
            dialogController.showDialog(this.getView().getController());
        },

        setSelectedImage: function (selectedImageURL) {
            this.viewModel.setProperty("/selectedImage", selectedImageURL);
        }
    });
});