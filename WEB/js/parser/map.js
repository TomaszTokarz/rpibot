var Map = function() {

    var _map = function(input, minValueInput, maxValueInput, minValueOutput, maxValueOutput) {
        return (input - minValueInput) * (maxValueOutput - minValueOutput) / (maxValueInput - minValueInput) + minValueOutput;
    };

    return {
        getThrottle: function(input) {
            var output = {};
            output.direction = input > 0 ? 1 : -1;

            input = Math.abs(input);

            var minValueInput = 90;
            var maxValueInput = 0;
            var minValueOutput = 0;
            var maxValueOutput = 1;

            output.value = output.direction * _map(input, minValueInput, maxValueInput, minValueOutput, maxValueOutput);

            return output;
        },

        getTurning: function(input) {
            var output = {};
            output.direction = input > 0 ? 1 : -1;

            input = Math.abs(input);

            var minValueInput = input > 90 ? 180 : 0;
            var maxValueInput = 90;
            var minValueOutput = 0;
            var maxValueOutput = 1;

            output.value = output.direction * _map(input, minValueInput, maxValueInput, minValueOutput, maxValueOutput);

            return output;
        }
    }
}