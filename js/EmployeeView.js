var EmployeeView = function(employee) {
    this.render = function() {
        this.el.html(EmployeeView.template(employee));
        return this;
    }

    this.addLocation = function(event) {
        event.preventDefault();
        console.log('addLocation');
        navigator.geolocation.getCurrentPosition(
            function(position) {
                $('.location', this.el).html(position.coords.latitude + ',' + position.coords.longitude);
            },
            function() {
                app.showAlert('Error getting location');
            });
        return false;
    };

    this.changePicture = function(event) {
        event.preventDefault();

        if (!navigator.camera) {
            app.showAlert("Camera API not supported", "Error");
            return;
        }

        var options = {
            quality: 50,
            destinationType: Camera.DestinationType.DATA_URL,
            sourceType: 1,
            encodingType: 0
        };

        navigator.camera.getPicture(
            function(imageData) {
                $('.employee-image', this.el).attr('src', 'data:image/jpeg;base64,' + imageData);
            },
            function() {
                app.showAlert("Error taking picture", "Error");
            },
            options);
    };

    this.scanSomething = function(event) {
        event.preventDefault();

        cordova.plugins.barcodeScanner.scan(
            function(result) {
                app.showAlert("Scanned a barcode\n" +
                "Result: " + result.text + "\n" +
                "Format: " + result.format + "\n" +
                "Cancelled: " + result.cancelled);
            },
            function(error) {
                app.showAlery("Scanning failed: " + error);
            }
        )
    };

    this.initialize = function() {
        this.el = $('<div/>');
        this.el.on('click', '.add-location-btn', this.addLocation);
        this.el.on('click', '.change-pic-btn', this.changePicture);
        this.el.on('click', '.scan-btn', this.scanSomething);
    };

    this.initialize();
}

EmployeeView.template = Handlebars.compile($("#employee-tpl").html());