// write your code here!

function count_freq(str){
    var sorted = str.split("").sort(); //[aaaaabbcddd]
    console.log('---sorted',sorted);
    var data =[];
    var prev='';
    //aaaaaabbcddd
    for(var i=0;i<sorted.length;i++){
      if(prev!== sorted[i]) { // '' !== a  -->true
          var obj = {}; //{charecter:s, count:3}
          obj.charecter = sorted[i];
          obj.count = 1;
          data.push(obj);
          prev = obj.charecter;
      } else{
          data[data.length-1].count++;
      }
    }
   return data;
}
// [{charecter:a, count:5},{charecter:b,count:2},{charecter:c, count:1},{charecter: d, count:3}];
//console.log('--ANSWER--',count_freq('ffefgthyjjjssss'));

var form = d3.select('form');
console.log('--------', form);
form.on('submit', function(){
    d3.event.preventDefault();
    var input = d3.select('input');
    var text = input.property('value');

    console.log('----entered text', text);

    var letters = d3.select('#letters')
                    .selectAll('.letter')
                    .data(count_freq(text), function(d){
                        return d.charecter;
                    });
    letters
        .classed('new',false)
        .exit()
        .remove();

    letters
        .enter()
        .append("div")
        .classed("letter",true)
        .classed("new",true)
        .merge(letters)
        .style("width","20px")
        .style("line-height","20px")
        .style("margin-right","5px")
        .style("height", function(d){
            return d.count*20+ 'px';
        })
        .text(function(d){
            return d.charecter;
        });
    d3.select('#phrase')
        .text('Analysis of '+text);
        input.property('value','');

    d3.select("#count")
        .text('(Number of diff charecters'+ letters.enter().nodes().length + ")")
});

d3.select('#reset')
    .on('click',function(){
        d3.selectAll('.letter')
            .remove();
        d3.select('#phrase')
            .text("");
        d3.select('#count')
            .text("");

    });
