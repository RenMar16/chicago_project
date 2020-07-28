function getPlot(id) {
    var getData = $.get('/API/Chi_Death_Data');
        getData.done(function(results){
            console.log(results); 
           // console.log(chi_data)

            //filtered results
            var fresults = results.filter(results => results.CauseofDeath != "All Causes" && 
              results.CauseofDeath != "All causes in males" && 
                results.CauseofDeath != "All causes in females" && results.CommunityAreaName != "Chicago" &&
                 results.CauseofDeath != "Cancer (all sites)");
            console.log(fresults);

            //filtered and grouped by community area results
            var new_deaths9 = _.map(_.groupBy(fresults, 'CommunityAreaName'), 
              function(el, key) {
                return {
                    key: key,
                    values: _.map(el, function(item) {
                        return [
                          item.CauseofDeath, 
                          item.CumulativeDeaths20062010, 
                          item.AverageAnnualYearsofPotentialLifeLost, 
                          item.YPLLRateRANK, 
                          item.AdjustedRateRank, 
                          item.CumulativeDeathsRank,
                          item.AverageAnnualDeaths];
                    })
                };
            });
            
            console.log(new_deaths9);

            var fresultsname = new_deaths9.filter(results => results.key === id)[0];
        console.log(fresultsname);

        
    //var com_area_name12 = fresultsname.map(results => results.key);
    //console.log(com_area_name12);
    
    var cu_deaths12 = fresultsname.values.map(results => results[1]);
    console.log(cu_deaths12);

        
    var death_cause12 = fresultsname.values.map(results => results[0]);
    console.log(death_cause12);

    var YPLL12 = fresultsname.values.map(results => results[2]);
    console.log(YPLL12);

    var YPLL12_s = YPLL12.map(s => s/2);
    console.log(YPLL12_s);

    var ADJRR = fresultsname.values.map(results => results[4]);
    console.log(ADJRR);

    var YPLLrank12 = fresultsname.values.map(results => results[3]);
    console.log(YPLLrank12);

    var CDR12 = fresultsname.values.map(results => results[5]);
    console.log(CDR12);

    var AAD = fresultsname.values.map(results => results[6]);
    console.log(AAD);
    
    var colors = ["#B58900", "#6610f2", "#6f42c1","#e83e8c","#fd7e14",
                    "#CB4B16","#2AA198","#20c997","#268BD2","#D33682","#839496","#073642","#B58900",
                    "#839496","#2AA198","#268BD2","#CB4B16","#D33682","#073642"];


    var labels = ["Alzheimers disease","Assault (homicide)","Breast cancer in females","Colorectal cancer",
                "Coronary heart disease","Diabetes-related","Firearm-related","Injury, unintentional","Kidney disease","Liver disease and cirrhosis",
                "Lung cancer","Prostate cancer in males","Stroke","Suicide"]
    
    //bar chart
            var trace = {
                x: labels,
                y: cu_deaths12,
                type:"bar",
                //orientation: "h",
                marker: {
                    color: colors,
                    opacity: 0.75
                }
            };
        
            var data = [trace];

            var layout =  {
                title: 'Cumulative Deaths',
                yaxis: {
                    automargin: true,
                    showgrid: false,
                    title:{
                      text: "Cumulative Deaths"
                    }
                  },
                xaxis: {
                    automargin: true,
                    tickangle: 30,
                    showgrid: false,
                    title:{
                      text: "Cause of Death"
                    }
                  },
                  paper_bgcolor: 'rgba(0,0,0,0)',
                  plot_bgcolor: 'rgba(0,0,0,0)',
                                 
                font: {
                  size: 16,
                  color: '#FFFFFF',
                  opacity: 0.75
                }
                
              };
        
            Plotly.newPlot("bar", data, layout);

    //bubble chart
        var trace1 = {
          labels: labels,
          name: labels,
            x: labels,
            y: cu_deaths12,
            mode: "markers",
            marker: {
                size: YPLL12_s,
                color: colors
                     },
            text: labels
             };

             var layout1 =  {
                title: 'Cumulative Deaths vs Years of Potential Life Lost ',
                height: 800,
                width: 1200,

                yaxis: {
                  showgrid: false,
                  title:{
                    text: "Cumulative Deaths"
                  },
                    automargin: true,
                  },
                xaxis: {
                  showgrid: false,
                    automargin: true,
                    tickmode: 'linear',
                    tick0: 0.2,
                    dtick: 1,

                    tickangle: 30
                  },
                  showlegend: false,
                  legend: {
                    x: 1,
                    xanchor: 'right',
                    y: 0.5,
                    labels: labels
                  },
                  paper_bgcolor: 'rgba(0,0,0,0)',
                  plot_bgcolor: 'rgba(0,0,0,0)',
                  font: {
                    size: 16,
                    color: '#FFFFFF',
                    opacity: 0.75
                  }
                
              };
    
        var data1 = [trace1];
        Plotly.newPlot("bubble", data1,layout1); 

//Line Graph
    var ctx = document.getElementById('myChart').getContext('2d');

    var myChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: "YPLL Rate Rank",
          data: YPLLrank12,
          backgroundColor: "#e83e8c",
          borderColor: "#e83e8c",
          borderWidth: 1,
          fill: false
        }, {
          label: "ADJ Rate Rank",
          data: ADJRR,
          backgroundColor: "#fd7e14",
          borderColor: "#fd7e14",
          borderWidth: 1,
          fill: false
        }, {
          label: "Cumulative Deaths Rank",
          data: CDR12,
          backgroundColor: "#20c997",
          borderColor: "#20c997",
          borderWidth: 1,
          fill: false
        },
        {
          label: "Average Annual Deaths",
          data: AAD,
          backgroundColor: "#268BD2",
          borderColor: "#268BD2",
          borderWidth: 1,
          fill: false
        }]},
        options: {
          scales: {
              yAxes: [{
                  ticks: {
                      beginAtZero: true
                  }
              }]
          }
      }
  });

})};

        ////////////////////////////////////////////////////////////////////////




  
url = "https://data.cityofchicago.org/resource/kn9c-c2s2.json";


  function getInfo(id) {
    d3.json(url, function(response) {
        var metadata = response;
        var result = metadata.filter(meta => meta.community_area_name === id)[0];
        Object.entries(result).forEach((key) => { 
          console.log(result);
        str = JSON.stringify(result);
        console.log(str);
        str = str.replace(/_/g, " ");
        console.log(str);
        resultupdated = JSON.parse(str);
        console.log(resultupdated);
        });


        var demographicInfo = d3.select("#sample-metadata");
        demographicInfo.html("");
     Object.entries(resultupdated).forEach((key) => {   
      //Object.results(resultupdated).forEach((key) => {   

       console.log(key);
       // demographicInfo.append("h15").text(key[0].toUpperCase() + ": " +  key[1] + "dgdfgf" + '\xa0\xa0\xa0\xa0\xa0\xa0\xa0'  + "testing   ");
       //key.forEach((key2) => {
            demographicInfo.append("h15").html(
            `${key[0].toUpperCase() + ": " + key[1]}<br>
              `);
          });
});
};

        ////////////////////////////////////////////////////////////////////////
    
    
    
        function optionChanged(id) {
            getPlot(id);
            getInfo(id);
            }
    

        function init() {
            var dropdown = d3.select("#selDataset");
            var getData = $.get('/API/Chi_Death_Data');
            getData.done(function(results){
               
                    //dropdown.append("option").text(CommunityAreaName);

//console.log(results); 
        //console.log(chi_data)
        
        //filtered results
        var fresults = results.filter(results => results.CauseofDeath != "All Causes" && results.CauseofDeath != "All causes in males" && 
        results.CauseofDeath != "All causes in females" && results.CommunityAreaName != "Chicago");
    //console.log(fresults);

            //filtered and grouped by community arae name
            var fgresults = _.groupBy(fresults, s => s.CommunityAreaName);
            //console.log(fgresults);
            
    var new_deaths3 = _.map(_.groupBy(fresults, 'CommunityAreaName'), function(el, key) {
        return {
            key: key,
            values: _.map(el, function(item) {
                return [item.CauseofDeath, item.CumulativeDeaths20062010];
            })}});
            console.log(new_deaths3);

    //var com_area_name3 = fresults.map(results => results.CommunityAreaName);
    var com_area_name7 = new_deaths3.map(results => results.key);
    console.log(com_area_name7);

                com_area_name7.forEach((function(name) {
                dropdown.append("option").text(name).property("value");
                }));
                   getPlot(com_area_name7[0]);
                   getInfo(com_area_name7[0]);
   
              })};
        
    init();