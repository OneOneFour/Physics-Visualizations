// Defining variables (need to update later anyway so importing from e.g. json is meaningless)
// Wave characteristics:
var nb_waves = parseInt($("#slider_waves").val());
var v = parseFloat($("#velocityPhase").val());
var k0 = 1; //define k0
var kend = 1.2; //define
var k_array = [];
var omega_nondisp = [];
var omega_disp = [];

// x and t coordinates
var n = 801;
var y_i = [], y_r = [], y_t = [];
var x = numeric.linspace(-50, 50, n);
var t = 0.0;
var dt = 0.02;
var is_paused = true;
var y_range = 1;
var omega_input = false;
var funct;

//--------------------------------------------INTERACTS--------------------------------------------

// k0
$("#k0_input").on('keyup',function () {
    if(event.keyCode == 13) {
        // Check it is a number
        if (isNaN(parseFloat($('#k0_input').val()))) {
            $('#error_k0').text('Invalid input: k0 needs to be a number');
        }
        else {
            k0 = parseFloat($('#k0_input').val());
            onReset();
            $('#k0').text(k0);
            $('#k0_input').val('');
            $('#error_k0').text('');
        }
    }
});

// kend
$("#kend_input").on('keyup',function () {
    if(event.keyCode == 13) {
        // Check it is a number
        if (isNaN(parseFloat($('#kend_input').val()))) {
            $('#error_kend').text('Invalid input: kend needs to be a number');
        }
        else {
            kend = parseFloat($('#kend_input').val());
            onReset();
            $('#kend').text(kend);
            $('#kend_input').val('');
            $('#error_kend').text('');
        }

    }
});

// Dispersion relation
$("#function").on('keyup', function () {
    if(event.keyCode == 13) {
        try {
            //            // All the characters allowed are in the square brackets (apart from ^)
            if (/[^0-9ksqrt().*/+-^]/.test($('#function').val())) {
                throw new Error;
            }
            funct = $('#function').val();
            if ($('#function').val().includes('sqrt')) {
                funct = $('#function').val().replace('sqrt', 'Math.sqrt');
            }
            if ($('#function').val().includes('^')) {
                for (var i = 0; i < nb_waves; i++) {
                    if ($('#function').val().includes('k')) {
                        funct = funct.replace(/k/g, k_array[i]);
                        omega_disp[i] = calculator.parse(funct);
                    }
                }
            }
            else {
                for (var i = 0; i < nb_waves; i++) {
                    k = k_array[i];
                    omega_disp[i] = eval(funct);
                }
            }
            $('#dispersionRelation').text($('#function').val());
            $('#function').val("");
            $('#error_omega').text("");
            omega_input = true;
            onReset();
        }
        catch (err) {
            $('#error_omega').text('Invalid equation');
        }
    }

})

// Slider waves
$('#slider_waves').on('input', function () {
    nb_waves = parseFloat($("#slider_waves").val());
    $("#waves_display").text(" " + nb_waves);
    onReset();
    update_y_range();
    if (is_paused === true) {
        Plotly.relayout('graph', {
            "yaxis.range": [-y_range, y_range],
        }
        )
    }
});

// Slider phase velocity
$('#velocityPhase').on('input', function () {
    v = parseFloat($("#velocityPhase").val());
    $("#phaseVelocityDisplay").text(" " + v + " m/s");
    onReset();
});

//--------------------------------------------FUNCTIONS--------------------------------------------

function initial_data(){
    k_array = numeric.linspace(k0, kend, nb_waves);
    omega_nondisp = numeric.linspace(k0*v, kend*v, nb_waves);
    if (omega_input == false) {
         // Default: non-dispersive
        omega_disp = omega_nondisp.slice();
    }
    else {
        if ($('#function').val().includes('^')) {
                for (var i = 0; i < nb_waves; i++) {
                    if ($('#function').val().includes('k')) {
                        funct = funct.replace(/k/g, k_array[i]);
                        omega_disp[i] = calculator.parse(funct);
                    }
                }
            }
            else {
                for (var i = 0; i < nb_waves; i++) {
                    k = k_array[i];
                    omega_disp[i] = eval(funct);
                }
            }
    }
    for (var i_ = 0; i_ <= n; i_++) {
        if (x[i_] < 0) {
            y_i[i_] = 0;
            y_r[i_] = 0;
            for (var j = 0; j < nb_waves; j++) {
                y_i[i_] += Math.sin(k_array[j] * x[i_] - omega_nondisp[j] * t);
                y_r[i_] += Math.sin(k_array[j] * x[i_] - omega_nondisp[j] * t);
            }
        }
        else if (x[i_] >= 0){
            y_t[i_] = 0;
            for (var l = 0; l < nb_waves; l++) {
                y_t[i_] += Math.sin(k_array[l] * x[i_] - omega_disp[l] * t);
            }
        }
    }
}

function onReset() {
    is_paused = true;
    t = 0;
    initial_data();

    Plotly.animate('graph',
            {data: [{y: y_i}, {y: y_r}, {y: y_t}]},
            {transition: {duration: 0}, frame: {duration: 0, redraw: false}}
    );
    document.getElementById('run_button').value = (is_paused) ? "Play" : "Pause";
}

function update_y_range() {
    if (nb_waves < 4) {
        y_range = 4
    }
    else {
        y_range = (nb_waves - (nb_waves % 5)) + 5
    }
}

//--------------------------------------------PLOTTING--------------------------------------------

// Data
initial_data();

// Initial plot
var incident = {
    x: x,
    y: y_i,
    name: "incident",
    line: {width: 2, color: '#960078', simplify: false}
};

var reflected = {
    x: x,
    y: y_r,
    name: "reflected",
    line: {width: 2, color: '#E40043', simplify: false}
};

var transmitted = {
    x: x,
    y: y_t,
    xaxis: 'x2',
    yaxis: 'y2',
    name: "transmitted",
    line: {width: 2, color: '#00ACD7', simplify: false}
};

var boundary = {
    x: [0, 0],
    y: [-105, 105],  // more efficient than updating it when axis change
    mode: "lines",
    name: "boundary",
    line: {width: 3, color: 'black', simplify: false}
};

var xline = {
    x: [-15, 15],
    y: [0, 0],
    mode: "lines",
    showlegend: false,
    line: {width: 2, color: '#003E74', simplify: false}
};
var layout =
    {
        autosize: false,
        width: 700,
        height: 400,
        margin: {
            l: 60,
            r: 35,
            b: 50,
            t: 40,
            pad: 4
        },
        //plot_bgcolor: '#EBEEEE',
        xaxis: {
            range: [-50, 0],
        },
        yaxis: {
            autorange: false,
            range: [-4, 4],
            domain: [0.6, 1],
        },
        xaxis2: {
            range: [0, 50],
            anchor: 'y2',
        },
        yaxis2: {
            autorange: false,
            range: [-4, 4],
            domain: [0, 0.4],
        },
        legend: {
            orientation: 'h',
            x: -0.05,
            y: 1.2,
            fontsize: 25
        },
        font: {
            family: 'Lato',
            size: 16,
            color: '#003E74',
            weight: 900
        }
    };

// Plot graph with interactivity
Plotly.plot('graph', [incident, reflected, transmitted, boundary, xline], layout);

//--------------------------------------------ANIMATION--------------------------------------------

// Data update function for animation
var t_start = t;

function compute() {
    t += dt;
    // need to find a way to define time limit
    if (t < t_start + 50) {
        for (var i = 0; i < n; i++) {
            if (x[i] < 0) {
                y_i[i] = 0;
                y_r[i] = 0;
                for (var j = 0; j < nb_waves; j++) {
                    y_i[i] += Math.sin(k_array[j] * x[i] - omega_nondisp[j] * t);
                    y_r[i] += Math.sin(k_array[j] * x[i] - omega_nondisp[j] * t);
                }
            }
            else if (x[i] >= 0) {
                y_t[i] = 0;
                for (var j_ = 0; j_ < nb_waves; j_++) {
                    y_t[i] += Math.sin(k_array[j_] * x[i] - omega_disp[j_] * t);
                }
            }
        }
    }
}

// Looping function that updates plot
function update() {

    if (is_paused === false) {

        compute();

        Plotly.animate('graph',
                {data: [{y: y_i}, {y: y_r}, {y: y_t}]},
                {transition: {duration: 0}, frame: {duration: 0, redraw: false}}
                // vastly speeds up animation but won't update any non-animated properties
        );
        requestAnimationFrame(update);
    }
}

function onStart() {
    is_paused = !is_paused;
    document.getElementById('run_button').value = (is_paused) ? "Play" : "Pause";
    requestAnimationFrame(update);
}

// ToDo: tooltips for input boxes
// ToDo: Change Initial Wave
// ToDo: Python?
// ToDo: Numeric (Clean Up)
// ToDo: Speed Up
// ToDo: Wave at Interface (if possible) -> (v1, v2, endpoint and moving window, border height change with plot)
// Maybe at beginning: need to specify v (ratio of w and k) and how w (/k cause they are
// proportional) changes with the added sine wave

// http://www.phikwadraat.nl/
// http://physics.usask.ca/~hirose/ep225/animation/dispersion/anim-dispersion.html
// https://en.wikipedia.org/wiki/Dispersion_relation
