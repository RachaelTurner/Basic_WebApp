sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
], function (Controller, JSONModel) {
    "use strict";

    return Controller.extend("com.rach.controller.ChooseDialog",{
        onInit: function () {
            this.dialog = this.getView().byId("ChooseDialog");
            this.viewModel = new JSONModel();
            this.getView().setModel(this.viewModel);
            this.viewData = {
                images: [
                ],
                okEnabled: false,
                selectedImage: ""

            };
            this.viewModel.setData(this.viewData);
            this.shellController = undefined;

        },
        onSelect: function (sender) {
            var item = sender.getParameter("listItem");
            var itemPathInModel = item.getBindingContext().getPath();
            this.viewModel.setProperty("/selectedImage", itemPathInModel);
            this.viewModel.setProperty("/okEnabled",true);
        },
        showDialog: function (shellController, images) {
            this.shellController = shellController;
            this.processImages(images);
            this.dialog.open();
        },
        onCancelPress: function () {
            this.dialog.close();
        },
        onOKPress: function () {
            var selectedImageRef = this.viewModel.getProperty("/selectedImage");
            var selectedImage = this.viewModel.getProperty(selectedImageRef);
            var selectedImageURL = selectedImage.imagePath;
            this.shellController.setSelectedImage(selectedImageURL);
            this.dialog.close();
        },
        processImages: function (images) {
            var imagesArray = [];
            for(var i = 0; i < images.length; i++){
                var imageName = images[i];
                imagesArray.push({imageName: imageName, imagePath: "../Images/" + imageName});
            }
            this.viewModel.setProperty("/images", imagesArray);
        }
    });
});