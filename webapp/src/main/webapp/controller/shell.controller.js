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
            var that = this;
            var openDialog = function (images) {
                var dialogView = sap.ui.xmlview("com.rach.view.ChooseDialog");
                that.getView().addDependent(dialogView);
                var dialogController = dialogView.getController();
                dialogController.showDialog(that.getView().getController(), images);
            };

            var endpoint = "/api/rach/v1/image";
            jQuery.ajax({
                type: "GET",
                url: endpoint,
                async: true,
                success: function (response) {
                    openDialog(response);
                },
                error: function () {

                }

            });
        },

        setSelectedImage: function (selectedImageURL) {
            this.viewModel.setProperty("/selectedImage", selectedImageURL);
        },

        handleUploadComplete: function (response) {
            sap.m.MessageToast.show(response.sId);
        },

        handleUploadPress: function () {
            var fileUploader = this.getView().byId("fileUploader");
            fileUploader.upload();
        }
    });
});