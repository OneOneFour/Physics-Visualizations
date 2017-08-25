
var a = 1, b = 1, c = 1;
//var zinteglimit = (10*c) -1
//var yinteglimit = (10* b) - 1
//var xinteglimit = (10* a)

var zz, yy;
var frames = [];
function main() {
  $("input[type=range]").each(function () {
    $(this).on('input', function(){
          $("#"+$(this).attr("id") + "Display").text(  $(this).val() + $("#"+$(this).attr("id")+"Display").attr("data-unit")  );
    });
  });
}
function integratorZYXelement(xinit, yinit,zinit,number, direction, element){ //direction = +/- 1 element = 1,2,3 for x,y,z
    zz = []
    yy = []
    xx = []
    if (element === 1){
        for (var j = 0 ; j < 8 ; j++) {  //This is to loop through 8 points of the cube
        zz.push(zinit[j] + direction*(0.1*number)); 
    }
    xx= xinit
    yy = yinit  
    }
    if (element === 2) {
       for (var j = 0 ; j < 8 ; j++) {  //This is to loop through 8 points of the cube
            ylim = yinit[j] + direction*(0.1*number)
            if (zinit[j] != 0) {
                zlim = c*(0.7 - (ylim/b))
            } else {
                zlim = 0 
            }
            yy.push(ylim)
            zz.push(zlim)
        } 
    xx = xinit
    }
    if (element === 3){
        for (var j = 0; j <6 ; j++){
        xlim = xinit[j] + direction*(0.1*number)
        if (yinit[j] != 0) {
                ylim = b*(1 - (xlim/a))
            } else {
                ylim = 0 
            }
        if (zinit[j] != 0) {
                zlim = 1 - c*((ylim/b)+(xlim/a))
            } else {
                zlim = 0 
            }
            xx.push(xlim)
            yy.push(ylim)
            zz.push(zlim)
           
                }
                newcube = {
                type: "mesh3d",
                x: xx,
                y: yy,
                z: zz,
                i: [3,0,0,1,3,3],
                j: [5,1,3,3,0,2],
                k: [4,2,1,4,2,5],
                opacity: 0.5,
                colorscale: [
                [0, 'rgb(0,0,0)'],
                [1, 'rgb(0,0,0)']
            ],
        opacity: 1.0,
        showscale: false}
        return newcube
    }

    
    newcube = {
        type: "mesh3d",
        x: xx ,
        y: yy,
        z: zz,
        i: [7, 0, 0, 0, 4, 4, 6, 6, 4, 0, 3, 2],
        j: [3, 4, 1, 2, 5, 6, 5, 2, 0, 1, 6, 3],
        k: [0, 7, 2, 3, 6, 7, 1, 1, 5, 5, 7, 6],
        opacity: 1.0,
        colorscale: [
          [0, 'rgb(0,0,0)'],
          [1, 'rgb(0,0,0)'] ],
        intensity: [0, 0.1, 0.2, 0.3, 0.5, 0.6, 0.8, 1],
        showscale: false
    }
    return newcube

}
function integratorZYXtotal(xinit, yinit,zinit,number,direction, element){
    xx = []
    yy = []
    zz = []
    if (element ===1){
        for (var j = 0 ; j < 8 ; j++) {  //This is to loop through 8 points of the cube
            if (zinit[j] != 0.4 && direction === 1){
                zz.push(zinit[j] +(0.1*number))        
            } else if (zinit[j] === 0.4 && direction === 1){
                zz.push(0.0)
            } else if (zinit[j] != 0.5 && direction === -1) {
                zz.push(zinit[j] - (0.1*number))        
            } else {
                zz.push(0.5)
            }
        } 
        xx = xinit
        yy = yinit
    }
    if (element ===2) {    
        for (var j = 0 ; j < 8 ; j++) {  //This is to loop through 8 points of the cube
            if (yinit[j] != 0.3 && direction === -1) {
                ylim = yinit[j] - (0.1*number)
            } else if (yinit[j] === 0.3 && direction === -1){
                ylim = 0.2 
            } else if (yinit[j] != 0.2 && direction ===1) {
                ylim = yinit[j] + (0.1*number)
            } else {
                ylim = 0.0
            }
            if (zinit[j] != 0) {
                zlim = c*(0.7 - (ylim/b))
            } else {
                zlim = 0 
            }
            yy.push(ylim)
            zz.push(zlim)
        }
        xx = xinit
        
    }
    if (element ===3) {
     for (var j = 0; j <6 ; j++){
        if (xinit[j] != 0.4 && direction === -1){
            xlim = xinit[j] - (0.1*number)
            
        } else if (xinit[j] === 0.4 && direction === -1) {
            xlim = 0.3
        } else if (xinit[j] != 0.3 && direction === 1) {
            xlim = xinit[j] + (0.1*number)
        } else {
            xlim = 0.0
        }
        
        if (yinit[j] != 0) {
                ylim = b*(1 - (xlim/a))
            } else {
                ylim = 0 
            }
        if (zinit[j] != 0) {
                zlim = 1 - c*((ylim/b)+(xlim/a))
            } else {
                zlim = 0 
            }
            xx.push(xlim)
            yy.push(ylim)
            zz.push(zlim)
    }
            newcube = {
                type: "mesh3d",
                x: xx,
                y: yy,
                z: zz,
                i: [3,0,0,1,3,3],
                j: [5,1,3,3,0,2],
                k: [4,2,1,4,2,5],
                opacity: 1.0,
            colorscale: [
            [0, 'rgb(0,62,116)'],
            [1, 'rgb(0,62,116)']
            ],
                showscale: false            
                }
    return newcube
   
    }

        newcube = {
        type: "mesh3d",
        x: xx ,
        y: yy,
        z: zz,
        i: [7, 0, 0, 0, 4, 4, 6, 6, 4, 0, 3, 2],
        j: [3, 4, 1, 2, 5, 6, 5, 2, 0, 1, 6, 3],
        k: [0, 7, 2, 3, 6, 7, 1, 1, 5, 5, 7, 6],
        opacity: 0.8,
        colorscale: [
          [0, 'rgb(0,62,116)'],
          [1, 'rgb(0,62,116)']
        ],

        showscale: false, }
    return newcube
}
function ZYXintegrator() {
    var xxinit = [0.3, 0.3, 0.4, 0.4, 0.3, 0.3, 0.4, 0.4];
    var yyinit = [0.2, 0.3, 0.3, 0.2, 0.2, 0.3, 0.3, 0.2];
    var zzinit = [0.4, 0.4, 0.4, 0.4, 0.5, 0.5, 0.5, 0.5];
    var xxinit2 = [0.4,0.4, 0.3, 0.3, 0.4, 0.4, 0.3, 0.3];
    var yyinit2 = [0.2,0.3, 0.3, 0.2, 0.2, 0.3, 0.3, 0.2];
    var zzinit2 = [0.0,0.0, 0.0, 0.0, 0.4, 0.3, 0.4, 0.5];
    var xxinit3 = [0.3, 0.3, 0.3, 0.4, 0.4, 0.4];
    var yyinit3 = [0.0, 0.0, 0.7, 0.0, 0.0, 0.6];
    var zzinit3 =  [0.0, 0.6, 0.0, 0.0, 0.7, 0.0];
    frames = []
    for (var i = 0; i < 5; ++i) {
          frames.push({
            "data": [integratorZYXtotal(xxinit,yyinit,zzinit,i, -1,1),
                     integratorZYXelement(xxinit,yyinit,zzinit,i,-1,1)],
            "name": i})
      }
    for (var i = 0; i < 2; ++i) {
              frames.push({
            "data": [integratorZYXtotal(xxinit,yyinit,zzinit,i,1),
                     integratorZYXelement(xxinit,yyinit,zzinit,i,1)],
            "name": i + 5})

    }
    for (var i = 0; i < 3; ++i) {
          frames.push({
            "data": [integratorZYXtotal(xxinit2,yyinit2,zzinit2,i, -1,2),
                integratorZYXelement(xxinit2,yyinit2,zzinit2,i, -1,2)],
            "name": i + 7
        })
      }
    for (var i = 0; i < 3; ++i) {
        var Yintotal = integratorZYXtotal(xxinit2,yyinit2,zzinit2,i,1,2)
        var Yinelem = integratorZYXelement(xxinit2,yyinit2,zzinit2,i,1,2)
          frames.push({
            "data": [Yintotal,
                Yinelem],
            "name": i + 10
        })
      }
    for (var i = 0; i < 4; ++i) {
          frames.push({
            "data": [integratorZYXtotal(xxinit3,yyinit3,zzinit3,i, -1,3),
                    integratorZYXelement(xxinit3,yyinit3,zzinit3,i, -1,3)],
            "name": i + 13
        })
      }
    for (var i = 0; i < 7; ++i) {
          frames.push({
            "data": [integratorZYXtotal(xxinit3,yyinit3,zzinit3,i,1,3),
                    integratorZYXelement(xxinit3,yyinit3,zzinit3,i,1,3)],
            "name": i + 17
        })
      }
    return frames
}

function integratorXYZelement(xinit, yinit,zinit,number, direction, element){ //direction = +/- 1
    xx = []
    yy = []
    zz = []
    if (element ===1){
        for (var j = 0 ; j < 8 ; j++) {  //This is to loop through 8 points of the cube
        xx.push(xinit[j] + direction*(0.1*number)); 

    }
    yy = yinit
    zz = zinit   
    }
    if (element ===2) {
         for (var j = 0 ; j < 8 ; j++) {  //This is to loop through 8 points of the cube
            ylim = yinit[j] + direction*(0.1*number)
            if (xinit[j] != 0) {
                xlim = a*(0.6 - (ylim/b))
            } else {
                xlim = 0 
            }
            yy.push(ylim)
            xx.push(xlim)
        }
    zz = zinit
    }
    
    if (element === 3) {
        for (var j = 0; j <6 ; j++){
        zlim = zinit[j] + direction*(0.1*number)
        if (yinit[j] != 0) {
                ylim = b*(1 - (zlim/c))
            } else {
                ylim = 0 
            }
        if (xinit[j] != 0) {
                xlim = 1 - a*((ylim/b)+(zlim/c))
            } else {
                xlim = 0 
            }
            xx.push(xlim)
            yy.push(ylim)
            zz.push(zlim)
    }
            newcube = {
                type: "mesh3d",
                x: xx,
                y: yy,
                z: zz,
                i: [3,0,0,3,4,4,5,5],
                j: [4,1,1,1,1,2,2,0],
                k: [5,2,3,4,2,5,0,3],
                opacity: 0.5,
                colorscale: [
                [0, 'rgb(0,0,0)'],
                [1, 'rgb(0,0,0)']
            ],
        opacity: 1.0,
        showscale: false            
                }
    return newcube    
    }
    newcube = {
        type: "mesh3d",
        x: xx ,
        y: yinit,
        z: zinit,
        i: [7, 0, 0, 0, 4, 4, 6, 6, 4, 0, 3, 2],
        j: [3, 4, 1, 2, 5, 6, 5, 2, 0, 1, 6, 3],
        k: [0, 7, 2, 3, 6, 7, 1, 1, 5, 5, 7, 6],
        opacity: 1.0,
        colorscale: [
          [0, 'rgb(0,0,0)'],
          [1, 'rgb(0,0,0)'] ],
        intensity: [0, 0.1, 0.2, 0.3, 0.5, 0.6, 0.8, 1],
        showscale: false
    }
    return newcube
}
function integratorXYZtotal(xinit, yinit,zinit,number,direction, element){
    xx = []
    yy = []
    zz = []
    if (element ===1){
        for (var j = 0 ; j < 8 ; j++) {  //This is to loop through 8 points of the cube
            if (xinit[j] != 0.3 && direction === 1){
                xx.push(xinit[j] +(0.1*number))        
            } else if (xinit[j] === 0.3 && direction === 1){
                xx.push(0.0)
            } else if (xinit[j] != 0.4 && direction === -1) {
                xx.push(xinit[j] - (0.1*number))        
            } else {
                xx.push(0.4)
            }
        } 
        yy = yinit
        zz = zinit
    }
    if (element === 2) { 
        for (var j = 0 ; j < 8 ; j++) {  //This is to loop through 8 points of the cube
            if (yinit[j] != 0.3 && direction === -1) {
                ylim = yinit[j] - (0.1*number)
            } else if (yinit[j] === 0.3 && direction === -1){
                ylim = 0.2 
            } else if (yinit[j] != 0.2 && direction ===1) {
                ylim = yinit[j] + (0.1*number)
            } else {
                ylim = 0.0
            }
            if (xinit[j] != 0) {
                xlim = c*(0.6 - (ylim/b))
            } else {
                xlim = 0 
            }
            yy.push(ylim)
            xx.push(xlim)
        }
     zz = zinit   
    }
    if (element === 3) { 
        for (var j = 0; j <6 ; j++){
        if (zinit[j] != 0.5 && direction === -1){
            zlim = zinit[j] - (0.1*number)
            
        } else if (zinit[j] === 0.5 && direction === -1) {
            zlim = 0.5
        } else if (zinit[j] != 0.4 && direction === 1) {
            zlim = zinit[j] + (0.1*number)
        } else {
            zlim = 0.0
        }
        
        if (yinit[j] != 0) {
                ylim = b*(1 - (zlim/c))
            } else {
                ylim = 0 
            }
        if (xinit[j] != 0) {
                xlim = 1 - a*((ylim/b)+(zlim/c))
            } else {
                xlim = 0 
            }
            xx.push(xlim)
            yy.push(ylim)
            zz.push(zlim)
    }
            newcube = {
                type: "mesh3d",
                x: xx,
                y: yy,
                z: zz,
                i: [3,0,0,1,3,3],
                j: [5,1,3,3,0,2],
                k: [4,2,1,4,2,5],
                opacity: 1.0,
            colorscale: [
            [0, 'rgb(0,62,116)'],
            [1, 'rgb(0,62,116)']
            ],
                showscale: false            
                }
    return newcube
        
    }
        newcube = {
        type: "mesh3d",
        x: xx ,
        y: yy,
        z: zz,
        i: [7, 0, 0, 0, 4, 4, 6, 6, 4, 0, 3, 2],
        j: [3, 4, 1, 2, 5, 6, 5, 2, 0, 1, 6, 3],
        k: [0, 7, 2, 3, 6, 7, 1, 1, 5, 5, 7, 6],
        opacity: 0.8,
        colorscale: [
          [0, 'rgb(0,62,116)'],
          [1, 'rgb(0,62,116)']
        ],

        showscale: false, }
    return newcube
}
function YintegratorXYZtotal(xinit, yinit, zinit, number, direction = 1){
    yy = []
    xx = []
    for (var j = 0 ; j < 8 ; j++) {  //This is to loop through 8 points of the cube
            if (yinit[j] != 0.3 && direction === -1) {
                ylim = yinit[j] - (0.1*number)
            } else if (yinit[j] === 0.3 && direction === -1){
                ylim = 0.2 
            } else if (yinit[j] != 0.2 && direction ===1) {
                ylim = yinit[j] + (0.1*number)
            } else {
                ylim = 0.0
            }
            if (xinit[j] != 0) {
                xlim = c*(0.6 - (ylim/b))
            } else {
                xlim = 0 
            }
            yy.push(ylim)
            xx.push(xlim)
        }
    newcube = {
        type: "mesh3d",
        x: xx,
        y: yy,
        z: zinit,
        i: [0, 3, 0, 4, 4, 7, 3, 7, 1, 5, 4, 4],
        j: [3, 2, 1, 1, 5, 5, 7, 6, 2, 2, 3, 7],
        k: [1, 1, 4, 5, 7, 6, 2, 2, 5, 6, 0, 3],
        intensity: [0, 0.14285714285714285, 0.2857142857142857, 0.42857142857142855, 0.5714285714285714, 0.7142857142857143, 0.8571428571428571, 1],
        opacity: 0.8,
        colorscale: [
          [0, 'rgb(0,62,116)'],
          [1, 'rgb(0,62,116)']
        ],

        opacity: 1.0,
        showscale: false,}
    return newcube
}
function ZintegratorXYZtotal(xinit, yinit, zinit, number, direction = 1){
    xx = []
    yy = []
    zz = []
    for (var j = 0; j <6 ; j++){
        if (zinit[j] != 0.5 && direction === -1){
            zlim = zinit[j] - (0.1*number)
            
        } else if (zinit[j] === 0.5 && direction === -1) {
            zlim = 0.5
        } else if (zinit[j] != 0.4 && direction === 1) {
            zlim = zinit[j] + (0.1*number)
        } else {
            zlim = 0.0
        }
        
        if (yinit[j] != 0) {
                ylim = b*(1 - (zlim/c))
            } else {
                ylim = 0 
            }
        if (xinit[j] != 0) {
                xlim = 1 - a*((ylim/b)+(zlim/c))
            } else {
                xlim = 0 
            }
            xx.push(xlim)
            yy.push(ylim)
            zz.push(zlim)
    }
            newcube = {
                type: "mesh3d",
                x: xx,
                y: yy,
                z: zz,
                i: [3,0,0,1,3,3],
                j: [5,1,3,3,0,2],
                k: [4,2,1,4,2,5],
                opacity: 1.0,
            colorscale: [
            [0, 'rgb(0,62,116)'],
            [1, 'rgb(0,62,116)']
            ],
                showscale: false            
                }
    return newcube

}

function XYZintegrator(){
    var xxinit = [0.3, 0.3, 0.4, 0.4, 0.3, 0.3, 0.4, 0.4];
    var yyinit = [0.2, 0.3, 0.3, 0.2, 0.2, 0.3, 0.3, 0.2];
    var zzinit = [0.4, 0.4, 0.4, 0.4, 0.5, 0.5, 0.5, 0.5];
    var xxinit2 = [0.4,0.4, 0.0, 0.0, 0.4, 0.4, 0.0, 0.0];
    var yyinit2 = [0.2,0.3, 0.3, 0.2, 0.2, 0.3, 0.3, 0.2];
    var zzinit2 = [0.4, 0.4, 0.4, 0.4, 0.5, 0.5, 0.5, 0.5];
    var xxinit3 = [0.6, 0.0, 0.0, 0.5, 0.0, 0.0];
    var yyinit3 = [0.0, 0.6, 0.0, 0.0, 0.5, 0.0];
    var zzinit3 =  [0.4, 0.4, 0.4, 0.5, 0.5, 0.5];
    frames = []
    for (var i = 0; i < 4; ++i) {
          frames.push({
            "data": [integratorXYZtotal(xxinit,yyinit,zzinit,i, -1,1),
                     integratorXYZelement(xxinit,yyinit,zzinit,i,-1,1)],
            "name": i})
      }
    for (var i = 0; i < 2; ++i) {
          frames.push({
            "data": [YintegratorXYZtotal(xxinit2,yyinit2,zzinit2,i, -1),
                     integratorXYZelement(xxinit2,yyinit2,zzinit2,i, -1,2)],
            "name": i + 4
        })
      }
    for (var i = 0; i < 4; ++i) {
          frames.push({
            "data": [YintegratorXYZtotal(xxinit2,yyinit2,zzinit2,i,1),
                    integratorXYZelement(xxinit2,yyinit2,zzinit2,i,1,2)],
            "name": i + 6
        })
       }
    for (var i = 0; i < 5; ++i) {
          frames.push({
            "data": [integratorXYZtotal(xxinit3,yyinit3,zzinit3,i, -1,3),
                integratorXYZelement(xxinit3,yyinit3,zzinit3,i, -1,3)],
            "name": i + 10
        })
      }
    for (var i = 0; i < 6; ++i) {
          frames.push({
            "data": [integratorXYZtotal(xxinit3,yyinit3,zzinit3,i,1,3),
                integratorXYZelement(xxinit3,yyinit3,zzinit3,i,1,3)],
            "name": i + 16
        })
      }
    return frames
    
}

function runFunctionRun(func) {
    var data = [];

    frames = func()
    data.push(frames[0].data[0]);
    data.push(frames[0].data[1]);
    data.push(tetrahedron);

    var steps=[]

    for (var i = 0; i < (frames.length); ++i) {
        steps.push({
            "method": "animate",
            "args": [
                        [i],
                        {
                            "mode": "immediate",
                            "transition": {"duration": 300,},
                            "frame": {"duration": 300, "redraw": false}
                        }
                    ]
        })
    }
    var sliders= [{
        "active": 0,
        "pad": {"t":10},
        "steps": steps
      }];
    var layout = {
    "width": 700, "height": 600,
    "margin": {l:0, r:0, t:0, b:0},
    "hovermode": "closest",
    "updatemenus": [
      {
        "x": 0.0, "y": 1,
        "xanchor": "left", "yanchor": "top",
        "showactive": false,
        "type": "buttons",
        "pad": {"t": 87, "r": 10},
        "buttons": [
          {
            "method": "animate",
            "args": [null, {"fromcurrent": true, "transition": {"duration": 200, "easing": "quadratic-in-out"}, "frame": {"duration": 200, "redraw":false}}],
            "label": "Play"
          },
          {
            "method": "animate",
            "args":[[null], {"mode": "immediate", "transition": {"duration": 0}, "frame": {"duration": 0, "redraw": false}}],
            "label": "Pause"
          }
        ]
      }
    ],
    "showlegend": false,
    "sliders": sliders,
      scene: {
    xaxis: {range: [-1, 1]},
    yaxis: {range: [-1, 1]},
    zaxis: {range: [-1, 1]}
    }

  }

    Plotly.newPlot('graph', {data:data, frames: frames, layout: layout});
}


var tetrahedron = {
    type: "mesh3d",
    x: [0, 0, 0, 1],
    y: [0, 0, 1, 0],
    z: [0, 1, 0, 0],
    i: [0, 0, 0, 1],
    j: [1, 2, 3, 2],
    k: [2, 3, 1, 3],
    intensity: [0, 0.33, 0.66, 1],
    colorscale: [
      [0, 'rgb(255,255,255)'],
      [1, 'rgb(255,255,255)']
    ],
    opacity: 0.5,
    showscale : false
  }
var volumeElement = {
    type: "mesh3d",
    x: [0.0, 0.0, 0.1, 0.1, 0.0, 0.0, 0.1, 0.1] ,
    y: [0., 0.1, 0.1, 0., 0., 0.1, 0.1, 0.],
    z: [0., 0., 0., 0., 0.1, 0.1, 0.1, 0.1],
    i: [7, 0, 0, 0, 4, 4, 6, 6, 4, 0, 3, 2],
    j: [3, 4, 1, 2, 5, 6, 5, 2, 0, 1, 6, 3],
    k: [0, 7, 2, 3, 6, 7, 1, 1, 5, 5, 7, 6],
    intensity: [0, 0.14285714285714285, 0.2857142857142857, 0.42857142857142855, 0.5714285714285714, 0.7142857142857143, 0.8571428571428571, 1],
    opacity: 0.3,
    colorscale: [
          [0, 'rgb(255,255,255)'],
          [0.5, 'rgb(0,133,202)'],
          [1, 'rgb(0,62,116)']
        ],

    showscale: false
}
runFunctionRun(XYZintegrator)
$(document).ready(main);

