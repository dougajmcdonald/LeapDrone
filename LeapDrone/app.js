/// <reference path="./typings/leapmotion-0.7.9.d.ts" />
var Leap;


var LeapDroneClient = (function () {
    function LeapDroneClient(options, controllerOptions) {
        this.outputPanel = options.outputPanel;
        this.controllerOptions = controllerOptions;
    }
    LeapDroneClient.prototype.start = function () {
        Leap.loop(this.controllerOptions, function (frame) {
            // Body of callback function
            var frameString = "Frame ID: " + frame.id + "<br />" + "Timestamp: " + frame.timestamp + " &micro;s<br />" + "Hands: " + frame.hands.length + "<br />" + "Fingers: " + frame.fingers.length + "<br />" + "Tools: " + frame.tools.length + "<br />" + "Gestures: " + frame.gestures.length + "<br />";

            //if (previousFrame) {
            //    var translation = frame.translation(previousFrame);
            //    frameString += "Translation: " + vectorToString(translation) + " mm <br />";
            //    var rotationAxis = frame.rotationAxis(previousFrame);
            //    var rotationAngle = frame.rotationAngle(previousFrame);
            //    frameString += "Rotation axis: " + vectorToString(rotationAxis, 2) + "<br />";
            //    frameString += "Rotation angle: " + rotationAngle.toFixed(2) + " radians<br />";
            //    var scaleFactor = frame.scaleFactor(previousFrame);
            //    frameString += "Scale factor: " + scaleFactor.toFixed(2) + "<br />";
            //}
            var handString = "";
            if (frame.hands.length > 0) {
                for (var i = 0; i < frame.hands.length; i++) {
                    var hand = frame.hands[i];

                    handString += "Hand ID: " + hand.id + "<br />";
                    handString += "Direction: " + hand.direction.toString() + "<br />";
                    handString += "Palm normal: " + hand.palmNormal.toString() + "<br />";
                    handString += "Palm position: " + hand.palmPosition.toString() + " mm<br />";
                    handString += "Palm velocity: " + hand.palmVelocity.toString() + " mm/s<br />";
                    handString += "Sphere center: " + hand.sphereCenter.toString() + " mm<br />";
                    handString += "Sphere radius: " + hand.sphereRadius.toFixed(1) + " mm<br />";
                    // And so on...
                }
            }

            // Display Pointable (finger and tool) object data
            var pointableString = "";
            if (frame.pointables.length > 0) {
                for (var i = 0; i < frame.pointables.length; i++) {
                    var pointable = frame.pointables[i];

                    pointableString += "Pointable ID: " + pointable.id + "<br />";
                    pointableString += "Belongs to hand with ID: " + pointable.handId + "<br />";

                    if (pointable.isTool) {
                        pointableString += "Classified as a tool <br />";
                        pointableString += "Length: " + pointable.length.toFixed(1) + " mm<br />";
                        pointableString += "Width: " + pointable.width.toFixed(1) + " mm<br />";
                    } else {
                        pointableString += "Classified as a finger<br />";
                        pointableString += "Length: " + pointable.length.toFixed(1) + " mm<br />";
                    }

                    pointableString += "Direction: " + pointable.direction.toString() + "<br />";
                    pointableString += "Tip position: " + pointable.tipPosition.toString() + " mm<br />";
                    pointableString += "Tip velocity: " + pointable.tipVelocity.toString() + " mm/s<br />";
                }
            }

            document.getElementById("content").innerHTML = frameString + "<hr/>" + handString + "<hr/>" + pointableString;
        });
    };
    return LeapDroneClient;
})();

window.onload = function () {
    var el = document.getElementById('content');
    var droneClient = new LeapDroneClient({ outputPanel: el }, { enableGestures: true });
    droneClient.start();
};
//# sourceMappingURL=app.js.map
